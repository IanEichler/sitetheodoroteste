// Script único para popular os 10 artigos iniciais do blog.
// Rode com: node scripts/seed-blog-posts.js
// (depois de criar a tabela blog_posts no Supabase)

const SB_URL = 'https://wmzfehnczvdraeninzcf.supabase.co/rest/v1/blog_posts';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtemZlaG5jenZkcmFlbmluemNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMjUwNjcsImV4cCI6MjA5NzkwMTA2N30.Z5kUqetdkEsidfZMV_zVhck2S0vV5tFcB24nqp5vJBY';

const now = () => new Date().toISOString();

const posts = [
  {
    slug: 'revisao-da-vida-toda-inss',
    title: 'Revisão da Vida Toda do INSS: o que é e quem tem direito',
    area: 'previdenciario',
    excerpt: 'Entenda como funciona a revisão da vida toda, quem pode pedir e por que ela pode aumentar o valor da sua aposentadoria.',
    content: `A "revisão da vida toda" é o nome popular dado a uma tese que permite recalcular o valor da aposentadoria considerando todo o histórico de contribuições do trabalhador, incluindo salários anteriores a julho de 1994 — período que, em muitos casos, ficava de fora do cálculo padrão do INSS.

Antes da reforma da Previdência de 1999, as regras de cálculo do benefício eram diferentes. Quando a nova regra entrou em vigor, ela passou a considerar apenas as contribuições feitas a partir de julho de 1994. O problema é que, para quem teve salários mais altos antes desse período, ignorar esses valores pode significar receber uma aposentadoria menor do que deveria.

A revisão da vida toda permite que o segurado peça ao INSS (ou à Justiça) para recalcular o benefício usando todo o histórico contributivo, e não apenas o período pós-1994 — desde que isso resulte em um valor mais vantajoso. Ou seja, é sempre feito o cálculo dos dois jeitos, e vale o que for melhor para o segurado.

Quem pode ter direito? Em geral, trabalhadores que se aposentaram pelas regras antigas (antes da reforma de 2019) e que tiveram bons salários antes de julho de 1994 — por exemplo, quem teve um cargo de destaque no início da carreira e depois passou a receber menos, ou quem contribuiu por conta própria com valores mais altos nesse período.

É importante frisar que cada caso precisa de uma análise específica: nem toda aposentadoria terá diferença favorável com a revisão, e o prazo para pedir (decadência) também precisa ser observado — em geral, de até 10 anos a partir da data de concessão do benefício.

Se você se aposentou há alguns anos e desconfia que seu benefício poderia ser maior, vale a pena fazer uma simulação com um advogado previdenciário antes de decidir se compensa entrar com o pedido.`,
  },
  {
    slug: 'auxilio-doenca-como-solicitar',
    title: 'Auxílio-doença: como solicitar e o que fazer se for negado',
    area: 'previdenciario',
    excerpt: 'Passo a passo para pedir o auxílio-doença ao INSS e as opções disponíveis quando o pedido é indeferido.',
    content: `O auxílio-doença (hoje chamado oficialmente de "auxílio por incapacidade temporária") é o benefício pago pelo INSS ao trabalhador que fica temporariamente incapaz de exercer sua atividade profissional por motivo de doença ou acidente, desde que tenha cumprido a carência exigida (em geral, 12 contribuições mensais, com exceções para acidentes e algumas doenças graves).

Para solicitar, o primeiro passo é agendar a perícia médica pelo aplicativo ou site "Meu INSS", ou pelo telefone 135. É necessário reunir documentos que comprovem a doença ou lesão: laudos médicos, exames, atestados e receituários, além dos documentos pessoais e comprovantes de contribuição.

Na perícia, um médico do INSS avalia se o segurado está realmente incapacitado para o trabalho e por quanto tempo. É nesse ponto que muitos pedidos acabam sendo negados — seja porque o perito considerou que não há incapacidade, seja por problemas na análise da carência ou da qualidade de segurado (se as contribuições estavam em dia).

Se o pedido for negado e o trabalhador (ou seu médico) discordar da decisão, existem caminhos possíveis: pedir reconsideração administrativa, apresentando novos documentos médicos, ou entrar com um recurso no próprio INSS. Quando essas vias se esgotam ou a demora é excessiva, também é possível buscar a via judicial, pedindo que um perito judicial (independente) reavalie o caso.

É importante não desistir apenas porque o primeiro pedido foi negado — é bastante comum que decisões do INSS sejam revertidas depois de uma análise mais aprofundada, com o apoio de um advogado especializado em Direito Previdenciário para reunir a documentação correta e conduzir o recurso ou a ação judicial.`,
  },
  {
    slug: 'rescisao-indireta-trabalhista',
    title: 'Rescisão indireta: quando o trabalhador pode "demitir" a empresa',
    area: 'trabalhista',
    excerpt: 'Saiba em quais situações o empregado pode pedir a rescisão indireta e receber os mesmos direitos de uma demissão sem justa causa.',
    content: `A rescisão indireta é uma modalidade de rompimento do contrato de trabalho em que é o empregado quem toma a iniciativa de encerrar o vínculo, por causa de uma falta grave cometida pelo empregador — funcionando, na prática, como uma "demissão da empresa" motivada pelo trabalhador.

A Consolidação das Leis do Trabalho (CLT) prevê diversas situações que podem justificar a rescisão indireta, entre elas: atraso reiterado no pagamento de salários, exigência de serviços além das forças do empregado ou proibidos por lei, tratamento com rigor excessivo, exposição a perigo manifesto de mal considerável, descumprimento das obrigações do contrato (como não recolher o FGTS) e assédio moral ou sexual no ambiente de trabalho.

Quando a rescisão indireta é reconhecida — seja por acordo, seja por decisão da Justiça do Trabalho — o trabalhador tem direito às mesmas verbas de uma demissão sem justa causa: aviso prévio, 13º salário e férias proporcionais, saldo de salário, multa de 40% sobre o FGTS e liberação do saldo do FGTS, além do direito de sacar o seguro-desemprego.

Na prática, a rescisão indireta costuma ser pleiteada por meio de uma ação trabalhista, já que raramente o empregador reconhece a falta espontaneamente. Por isso, é fundamental reunir provas da situação irregular antes de tomar a decisão de parar de trabalhar — como prints de mensagens, testemunhas, comprovantes de atraso de salário ou boletins de ocorrência, dependendo do caso.

Um erro comum é o trabalhador simplesmente abandonar o emprego sem buscar orientação jurídica antes, o que pode ser interpretado de forma equivocada pelo empregador. Por isso, antes de agir, vale conversar com um advogado trabalhista para entender se a situação realmente se enquadra em uma falta grave e qual a melhor forma de conduzir o processo.`,
  },
  {
    slug: 'horas-extras-como-calcular',
    title: 'Horas extras: como calcular e cobrar o que é devido',
    area: 'trabalhista',
    excerpt: 'Entenda a regra do adicional de horas extras, como comprovar a jornada e o que fazer quando a empresa não paga corretamente.',
    content: `A jornada de trabalho padrão no Brasil é de 8 horas diárias e 44 horas semanais, segundo a CLT. Quando o trabalhador é convocado a trabalhar além desse limite, tem direito a receber pelas horas extras trabalhadas, com um adicional mínimo de 50% sobre o valor da hora normal (podendo ser maior se previsto em acordo coletivo ou convenção da categoria).

O cálculo básico é simples: primeiro se descobre o valor da hora normal (dividindo o salário pela jornada mensal, geralmente 220 horas), depois se aplica o adicional sobre esse valor para cada hora extra trabalhada. Se o trabalhador tiver direito a um adicional maior — por exemplo, 100% para horas extras em domingos e feriados, dependendo da convenção coletiva — o cálculo muda proporcionalmente.

Um ponto importante é que as horas extras habituais (trabalhadas com frequência, não apenas eventualmente) também repercutem em outras verbas, como 13º salário, férias, FGTS e aviso prévio — o chamado "reflexo" das horas extras. Isso significa que, quando a empresa deixa de pagar horas extras corretamente por um longo período, o valor total devido ao final do contrato pode ser bem maior do que parece à primeira vista.

Para cobrar as horas extras, o ideal é ter algum tipo de registro da jornade efetivamente trabalhada: cartão de ponto, aplicativos de controle, e-mails com horários de envio, mensagens de WhatsApp de trabalho fora do horário, ou até testemunhas que possam confirmar a rotina. Empresas com mais de 20 empregados são obrigadas a manter controle de ponto, o que facilita a comprovação.

Se a empresa não paga as horas extras corretamente ou nem controla a jornada, o trabalhador pode reunir essas provas e buscar orientação com um advogado trabalhista para calcular o valor devido e, se necessário, ingressar com uma reclamação trabalhista.`,
  },
  {
    slug: 'indenizacao-danos-morais',
    title: 'Indenização por danos morais: quando você tem direito a receber',
    area: 'civil',
    excerpt: 'Veja em que situações cabe pedir indenização por dano moral e como funciona esse tipo de ação na Justiça.',
    content: `O dano moral é a violação de um direito da personalidade — como a honra, a imagem, a dignidade ou a tranquilidade psicológica de uma pessoa — que causa sofrimento, humilhação ou abalo emocional significativo. Diferente do dano material, que atinge o patrimônio, o dano moral atinge algo que não tem preço exato, mas que a lei reconhece como merecedor de reparação financeira.

Situações comuns que podem gerar direito à indenização incluem: inclusão indevida do nome em cadastros de inadimplentes (SPC/Serasa) sem que exista a dívida, cobrança vexatória ou constrangedora, cancelamento de voos sem assistência adequada, negativa indevida de cobertura por planos de saúde, exposição pública ofensiva (inclusive em redes sociais) e erros médicos ou de prestação de serviço que causem sofrimento além do transtorno comum do dia a dia.

É importante diferenciar o dano moral de um mero aborrecimento cotidiano — a Justiça brasileira entende que nem todo problema ou contratempo gera direito à indenização. O caso precisa demonstrar um abalo que ultrapasse o que se considera razoável suportar no dia a dia, como constrangimento público, sofrimento psicológico relevante ou violação clara de um direito.

O valor da indenização não é fixo: cabe ao juiz arbitrar um montante que seja proporcional à gravidade do dano, à capacidade financeira de quem causou o problema e ao caráter pedagógico da condenação (para desestimular que a situação se repita), sempre evitando o enriquecimento sem causa de quem recebe a indenização.

Se você passou por uma situação que considera ter ferido sua honra, imagem ou dignidade, o ideal é reunir provas do ocorrido (prints, protocolos de atendimento, boletins de ocorrência, testemunhas) e buscar orientação jurídica para avaliar se o caso realmente configura dano moral indenizável.`,
  },
  {
    slug: 'contratos-verbais-tem-validade',
    title: 'Contratos verbais têm validade? Entenda seus direitos',
    area: 'civil',
    excerpt: 'Descubra quando um acordo falado tem força legal, como prová-lo e em quais casos é preciso ter contrato escrito.',
    content: `É comum surgir a dúvida: "se eu combinei algo só verbalmente, isso vale legalmente?" A resposta, na maioria dos casos, é sim. O Código Civil brasileiro adota, como regra geral, a liberdade de forma para os contratos — ou seja, eles podem ser celebrados verbalmente, por escrito ou até por comportamento das partes (como quando alguém entrega um produto e o outro paga por ele, sem nenhum papel assinado).

O contrato verbal tem a mesma validade jurídica de um contrato escrito na maior parte das situações do dia a dia: prestação de serviços informais, empréstimos entre particulares, combinações de compra e venda, acordos de aluguel informal, entre outros. O que muda, na prática, é a dificuldade de comprovar o que foi combinado quando surge uma divergência.

Existem, porém, exceções importantes: a lei exige forma escrita (e às vezes até escritura pública registrada em cartório) para determinados negócios, como a compra e venda de imóveis acima de um certo valor, contratos de fiança, doações de bens imóveis e alguns contratos específicos previstos em lei. Nesses casos, um acordo apenas verbal não tem validade para produzir o efeito pretendido.

Quando o contrato é só verbal e surge uma disputa, a prova se torna o grande desafio: testemunhas que presenciaram o acordo, troca de mensagens (WhatsApp, e-mail) confirmando os termos, comprovantes de pagamento, notas fiscais, ou até o comportamento das partes ao longo do tempo (por exemplo, pagamentos mensais que comprovam um aluguel combinado verbalmente).

Por isso, mesmo quando a lei permite o contrato verbal, o mais seguro é sempre formalizar por escrito — ainda que de forma simples, como uma troca de mensagens detalhando o que foi combinado — para evitar dor de cabeça caso a outra parte não cumpra o que foi acertado.`,
  },
  {
    slug: 'pensao-alimenticia-como-calcular',
    title: 'Pensão alimentícia: como é calculado o valor e o que fazer se não for pago',
    area: 'familia',
    excerpt: 'Entenda os critérios usados para fixar a pensão alimentícia e as opções legais quando o valor não é pago.',
    content: `A pensão alimentícia é o valor pago por um dos pais (ou por outro parente obrigado, em certos casos) para custear as necessidades básicas de um filho ou de outra pessoa que dependa financeiramente dele — alimentação, moradia, saúde, educação e lazer, no sentido amplo da palavra "alimentos" usada pelo Direito de Família.

Não existe uma fórmula única prevista em lei para calcular o valor exato. A Justiça costuma se basear no chamado "binômio necessidade-possibilidade": de um lado, a necessidade de quem recebe (considerando idade, saúde, despesas escolares, entre outros fatores); de outro, a capacidade financeira de quem paga, sem que o valor comprometa sua própria subsistência.

Na prática, é comum que o valor seja fixado em um percentual da renda de quem paga (por exemplo, entre 15% e 30% dos rendimentos líquidos, variando conforme o número de filhos e outras circunstâncias) ou em um valor fixo em reais, especialmente quando quem paga não tem renda formal comprovada.

Quando a pensão não é paga, existem instrumentos legais específicos para cobrança: a execução de alimentos pode seguir pelo rito da prisão civil (para as três últimas parcelas em atraso, entre outras condições) ou pelo rito da penhora de bens e valores, incluindo bloqueio de contas bancárias e desconto direto em folha de pagamento. O não pagamento reiterado pode, inclusive, levar à prisão do devedor em regime fechado, especificamente para forçar o cumprimento da obrigação.

Além disso, é possível pedir a revisão do valor da pensão a qualquer momento, para mais ou para menos, sempre que houver mudança relevante na situação financeira de quem paga ou nas necessidades de quem recebe — por exemplo, perda de emprego, novo filho, ou início de um tratamento de saúde mais caro.`,
  },
  {
    slug: 'guarda-compartilhada-como-funciona',
    title: 'Guarda compartilhada: como funciona na prática',
    area: 'familia',
    excerpt: 'Entenda o que muda com a guarda compartilhada, como fica a rotina dos filhos e quando ela pode não ser aplicada.',
    content: `Desde 2014, a guarda compartilhada é a regra geral no Brasil sempre que ambos os pais estiverem aptos a exercer o poder familiar — ou seja, é o modelo aplicado por padrão pela Justiça, mesmo quando apenas um dos pais pede esse formato, salvo se houver motivo grave para não aplicá-la (como violência doméstica ou risco para a criança).

Ao contrário do que muita gente pensa, a guarda compartilhada não significa, necessariamente, que a criança precisa dividir seu tempo de forma igualitária (metade da semana com cada um). O que é compartilhado é a responsabilidade e as decisões importantes sobre a vida do filho — escola, saúde, atividades extracurriculares, viagens — que passam a ser tomadas em conjunto pelos dois pais, mesmo que a criança tenha uma residência principal fixada com apenas um deles.

A residência da criança pode ser fixada com um dos genitores (chamada de "guarda compartilhada com residência fixa"), com o outro tendo direito a visitas regulares e à participação nas decisões, ou, em situações mais raras e organizadas, pode haver uma divisão mais equilibrada do tempo físico entre as duas casas.

Um erro comum é achar que a guarda compartilhada elimina a pensão alimentícia — não é verdade. A obrigação de pagar pensão é independente do tipo de guarda e depende da capacidade financeira e das necessidades da criança, podendo existir mesmo quando os dois pais dividem o tempo de forma equilibrada.

Quando não há entendimento entre os pais sobre a rotina do filho, é comum que o Judiciário determine um plano de convivência detalhado, especificando dias, horários, feriados e férias, justamente para reduzir conflitos futuros. Em casos de desentendimento constante, contar com apoio jurídico ajuda a formalizar esse plano de forma clara e evitar novos litígios.`,
  },
  {
    slug: 'nome-negativado-indevidamente',
    title: 'Nome negativado indevidamente: seus direitos e como agir',
    area: 'consumidor',
    excerpt: 'Saiba o que fazer quando seu nome aparece no SPC/Serasa por uma dívida que você não reconhece ou já pagou.',
    content: `Encontrar o próprio nome no SPC ou na Serasa sem motivo aparente — seja por uma dívida já paga, uma cobrança de conta que nunca foi feita, ou até fraude usando seus dados — é uma situação mais comum do que parece, e o Código de Defesa do Consumidor oferece caminhos claros para resolver o problema.

O primeiro passo é confirmar a origem da negativação. É possível consultar gratuitamente os órgãos de proteção ao crédito (SPC, Serasa) para ver qual empresa fez a inclusão e o valor apontado como devido. A partir daí, entre em contato formal com a empresa, pedindo a comprovação da dívida — se ela não conseguir comprovar, ou se você já pagou e tem o comprovante, tem direito à retirada imediata do seu nome.

Se a empresa não resolver a situação de forma amigável, ou demorar excessivamente para corrigir o erro, cabe buscar a Justiça pedindo duas coisas ao mesmo tempo: a retirada do nome dos cadastros restritivos (muitas vezes de forma urgente, por liminar) e a indenização por dano moral, já que a negativação indevida costuma trazer prejuízos reais — negativa de crédito, constrangimento e restrição de compras.

Um ponto importante: mesmo quando existe uma dívida real e discutível (por exemplo, você contesta o valor cobrado), a empresa não pode simplesmente negativar seu nome sem cumprir certas formalidades, como notificação prévia informando sobre a inscrição — a falta dessa notificação também pode gerar direito à indenização, independente de a dívida existir ou não.

Guarde sempre comprovantes de pagamento, protocolos de atendimento e prints de conversas — esses documentos são essenciais tanto para resolver o problema administrativamente quanto para embasar uma eventual ação judicial, caso a empresa não regularize a situação.`,
  },
  {
    slug: 'produto-com-defeito-direitos',
    title: 'Produto com defeito: prazo e direitos de troca ou reembolso',
    area: 'consumidor',
    excerpt: 'Entenda os prazos legais de garantia, quando você pode exigir troca, conserto ou devolução do dinheiro.',
    content: `Quando um produto apresenta defeito, o Código de Defesa do Consumidor garante direitos claros — mas que costumam gerar dúvida na hora de exigi-los do vendedor ou fabricante. O primeiro conceito importante é a diferença entre vício aparente (que se percebe logo, como um produto que já vem quebrado) e vício oculto (que só aparece depois de um tempo de uso).

Para vícios aparentes ou de fácil constatação, o prazo para reclamar é de 30 dias para produtos não duráveis (como alimentos) e 90 dias para produtos duráveis (eletrônicos, eletrodomésticos, móveis), contados a partir da entrega do produto ou do momento em que o defeito se torna evidente. Já para vícios ocultos, esse prazo começa a contar apenas quando o problema aparece, mesmo que isso ocorra bem depois da compra.

Ao identificar o defeito dentro do prazo, você deve informar o vendedor ou fabricante, que tem até 30 dias para saná-lo (consertar o produto), salvo se as partes acordarem prazo diferente. Se o problema não for resolvido nesse período, o consumidor pode escolher entre três opções: a substituição do produto por outro igual e em perfeitas condições, a restituição imediata do valor pago (devidamente atualizado), ou o abatimento proporcional do preço.

Existem também os chamados vícios que comprometem a qualidade ou quantidade do produto de forma que o torne impróprio ou inadequado ao uso — nesse caso, dependendo da gravidade, o consumidor pode ter direito imediato à troca ou devolução do dinheiro, sem precisar esperar o prazo de 30 dias para conserto.

Além da garantia legal (que vale sempre, mesmo sem estar escrita em nenhum papel), muitos produtos oferecem garantia contratual adicional, dada voluntariamente pelo fabricante ou loja. Guarde sempre a nota fiscal e qualquer comunicação com a loja — são essenciais para exercer esses direitos, seja de forma amigável, seja por meio de uma reclamação formal ou ação judicial, se necessário.`,
  },
];

async function main() {
  for (const post of posts) {
    const payload = {
      ...post,
      status: 'published',
      published_at: now(),
    };
    const res = await fetch(SB_URL, {
      method: 'POST',
      headers: {
        apikey: SB_KEY,
        Authorization: 'Bearer ' + SB_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });
    console.log(post.slug, '->', res.status, res.ok ? 'OK' : await res.text());
  }
}

main();
