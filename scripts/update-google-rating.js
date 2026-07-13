// Atualiza a nota e a quantidade de avaliações do Google (badge do hero e
// seção de depoimentos) automaticamente, usando a Google Places API.
// Roda agendado pelo GitHub Actions (.github/workflows/update-google-rating.yml).
//
// Precisa de dois secrets no GitHub:
// - GOOGLE_PLACES_API_KEY: chave de API do Google Cloud com a "Places API" ativada.
// - GOOGLE_PLACE_ID: o Place ID do escritório no Google Maps.

const SB_BASE = 'https://wmzfehnczvdraeninzcf.supabase.co/rest/v1';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtemZlaG5jenZkcmFlbmluemNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMjUwNjcsImV4cCI6MjA5NzkwMTA2N30.Z5kUqetdkEsidfZMV_zVhck2S0vV5tFcB24nqp5vJBY';
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

function sbHeaders(extra = {}) {
  return { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, ...extra };
}

async function fetchGoogleRating() {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(PLACE_ID)}&fields=rating,user_ratings_total&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK') {
    throw new Error(`Places API respondeu status "${data.status}": ${data.error_message || 'sem detalhes'}`);
  }
  const { rating, user_ratings_total } = data.result;
  if (typeof rating !== 'number' || typeof user_ratings_total !== 'number') {
    throw new Error('Resposta da Places API não trouxe rating/user_ratings_total.');
  }
  return { score: rating.toFixed(1).replace('.', ','), count: user_ratings_total };
}

async function updateSiteConfig(google) {
  const getRes = await fetch(`${SB_BASE}/site_config?id=eq.1&select=data`, { headers: sbHeaders() });
  const rows = await getRes.json();
  const current = rows[0]?.data || {};

  if (current.google?.score === google.score && current.google?.count === google.count) {
    console.log(`Nota já está atualizada (${google.score} · ${google.count} avaliações) — nada a fazer.`);
    return;
  }

  const updated = { ...current, google };
  const patchRes = await fetch(`${SB_BASE}/site_config?id=eq.1`, {
    method: 'PATCH',
    headers: sbHeaders({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify({ data: updated }),
  });
  if (!patchRes.ok) throw new Error(`Falha ao salvar no Supabase: ${patchRes.status} ${await patchRes.text()}`);
  console.log(`Nota atualizada: ${current.google?.score || '?'} · ${current.google?.count ?? '?'} avaliações -> ${google.score} · ${google.count} avaliações`);
}

async function main() {
  if (!GOOGLE_API_KEY || !PLACE_ID) {
    console.log('GOOGLE_PLACES_API_KEY ou GOOGLE_PLACE_ID não configurados — pulando (configure os secrets no GitHub).');
    return;
  }
  const google = await fetchGoogleRating();
  await updateSiteConfig(google);
}

main().catch(e => {
  console.error('Erro ao atualizar nota do Google:', e);
  process.exit(1);
});
