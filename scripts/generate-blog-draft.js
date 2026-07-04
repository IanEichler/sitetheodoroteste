// Gera um rascunho de artigo do blog usando a API do ChatGPT (OpenAI).
// Roda agendado pelo GitHub Actions (.github/workflows/generate-blog-draft.yml).
//
// Regras importantes:
// - NUNCA publica sozinho. Todo artigo gerado entra como status='draft'
//   e só aparece na aba "Rascunhos" do admin, esperando revisão humana.
// - Respeita o intervalo configurado no admin (DATA.blogAutoDays) e o
//   liga/desliga (DATA.blogAutoEnabled) antes de gerar qualquer coisa.
// - Não inventa "notícias" específicas nem cita leis/números de processo
//   que não seja capaz de garantir — escreve conteúdo educativo genérico,
//   no mesmo estilo dos artigos-semente já publicados.

const SB_BASE = 'https://wmzfehnczvdraeninzcf.supabase.co/rest/v1';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtemZlaG5jenZkcmFlbmluemNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMjUwNjcsImV4cCI6MjA5NzkwMTA2N30.Z5kUqetdkEsidfZMV_zVhck2S0vV5tFcB24nqp5vJBY';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = 'gpt-4o-mini';

const AREAS = ['previdenciario', 'trabalhista', 'civil', 'familia', 'consumidor'];
const AREA_LABELS = {
  previdenciario: 'Direito Previdenciário (INSS, aposentadoria, benefícios)',
  trabalhista: 'Direito do Trabalho (CLT, rescisão, verbas trabalhistas)',
  civil: 'Direito Civil (contratos, responsabilidade civil, indenizações)',
  familia: 'Direito de Família (pensão, guarda, divórcio, inventário)',
  consumidor: 'Direito do Consumidor (CDC, negativação, produtos e serviços)',
};

function sbHeaders(extra = {}) {
  return { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, ...extra };
}

function slugify(text) {
  return (text || '')
    .toString().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function getBlogConfig() {
  const res = await fetch(`${SB_BASE}/site_config?id=eq.1&select=data`, { headers: sbHeaders() });
  const rows = await res.json();
  const data = rows[0]?.data || {};
  return {
    enabled: data.blogAutoEnabled !== false,
    days: data.blogAutoDays !== undefined && data.blogAutoDays !== null ? data.blogAutoDays : 3,
  };
}

async function getLastPostDate() {
  const res = await fetch(`${SB_BASE}/blog_posts?select=created_at&order=created_at.desc&limit=1`, { headers: sbHeaders() });
  const rows = await res.json();
  return rows[0]?.created_at ? new Date(rows[0].created_at) : null;
}

async function pickArea() {
  const counts = {};
  for (const area of AREAS) {
    const res = await fetch(`${SB_BASE}/blog_posts?select=id&area=eq.${area}`, { headers: sbHeaders({ Prefer: 'count=exact' }) });
    const contentRange = res.headers.get('content-range') || '0';
    counts[area] = parseInt(contentRange.split('/')[1]) || 0;
  }
  return AREAS.reduce((min, a) => (counts[a] < counts[min] ? a : min), AREAS[0]);
}

async function existingSlugs() {
  const res = await fetch(`${SB_BASE}/blog_posts?select=slug`, { headers: sbHeaders() });
  const rows = await res.json();
  return new Set(rows.map(r => r.slug));
}

async function generateArticle(area) {
  const prompt = `Escreva um artigo de blog jurídico em português do Brasil, para o site de um escritório de advocacia em Rondonópolis - MT, sobre um tema de ${AREA_LABELS[area]}.

Regras importantes:
- Escolha um tema específico e útil dentro dessa área (dúvida comum de cliente), diferente de temas óbvios já muito batidos.
- Tom educativo e acessível, sem juridiquês desnecessário, como o de um blog de escritório de advocacia explicando direitos ao público leigo.
- NÃO invente números de leis, artigos específicos, jurisprudência, dados estatísticos ou "notícias recentes" que você não tenha certeza absoluta de que estão corretos. Prefira explicações conceituais e gerais a citar número exato de lei/artigo.
- Não cite fontes ou notícias específicas — é um artigo informativo atemporal, não uma matéria jornalística.
- Entre 4 e 6 parágrafos, cada um separado por uma linha em branco.
- Não assine o artigo nem mencione o nome do escritório dentro do texto.

Responda em JSON com este formato exato:
{"title": "...", "excerpt": "resumo de 1-2 frases", "content": "texto completo com parágrafos separados por \\n\\n"}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + OPENAI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: 'Você é um redator jurídico cuidadoso, que prioriza precisão e clareza sobre floreio. Responda sempre em JSON válido.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI API respondeu ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const parsed = JSON.parse(data.choices[0].message.content);
  if (!parsed.title || !parsed.content) throw new Error('Resposta da IA não trouxe title/content.');
  return parsed;
}

async function insertDraft(area, article) {
  const slugs = await existingSlugs();
  let slug = slugify(article.title);
  if (slugs.has(slug)) slug = `${slug}-${Date.now().toString().slice(-5)}`;

  const res = await fetch(`${SB_BASE}/blog_posts`, {
    method: 'POST',
    headers: sbHeaders({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify({
      title: article.title,
      slug,
      excerpt: article.excerpt || '',
      content: article.content,
      area,
      status: 'draft', // NUNCA publica sozinho
    }),
  });
  if (!res.ok) throw new Error(`Falha ao salvar rascunho: ${res.status} ${await res.text()}`);
  console.log(`Rascunho criado: "${article.title}" (área: ${area}, slug: ${slug})`);
}

async function main() {
  if (!OPENAI_API_KEY) {
    console.log('OPENAI_API_KEY não configurada — pulando (configure o secret no GitHub).');
    return;
  }

  const config = await getBlogConfig();
  if (!config.enabled) {
    console.log('Sugestão automática desativada no admin — pulando.');
    return;
  }

  const lastDate = await getLastPostDate();
  if (lastDate) {
    const daysSince = (Date.now() - lastDate.getTime()) / 86400000;
    if (daysSince < config.days) {
      console.log(`Só ${daysSince.toFixed(1)} dias desde o último artigo (precisa de ${config.days}) — pulando.`);
      return;
    }
  }

  const area = await pickArea();
  console.log('Gerando rascunho para a área:', area);
  const article = await generateArticle(area);
  await insertDraft(area, article);
}

main().catch(e => {
  console.error('Erro ao gerar rascunho:', e);
  process.exit(1);
});
