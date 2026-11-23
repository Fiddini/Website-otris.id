// Tanya Wijoyo - Chatbot THE JEMBATAN + OTRIS CONSTITUTION SERIES
// v2-final-sync-2026-11-20 - Knowledge dari 4 file final: Jembatan ID v2 (262 hal), Jembatan EN (152 hal), Constitution IND (231 hal), Master 20 Buku (638+639 hal)
// Amanah Trust House (Wakaf, URT-01, P&P, Pemecah Batu, Wijoyo Kusumo) dijaga, tidak dikarang.

let KNOWLEDGE = [];
let META = null;

async function loadKnowledge() {
  try {
    const res = await fetch('wijoyo-knowledge.json');
    if (!res.ok) return false;
    const data = await res.json();
    KNOWLEDGE = data.knowledge || [];
    META = data.meta || null;
    return true;
  } catch (e) {
    console.warn('Knowledge gagal dimuat, pakai fallback', e);
    return false;
  }
}

function normalize(s) {
  return (s||'').toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\u00C0-\u024F\u1E00-\u1EFF ]/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}

function tokenize(s) {
  return normalize(s).split(' ').filter(w => w.length > 2);
}

// Skor: keyword exact + judul + bab + token overlap
function scoreEntry(entry, qNorm, qTokens) {
  let score = 0;
  const hay = normalize(entry.judul + ' ' + entry.bab + ' ' + entry.keywords.join(' ') + ' ' + entry.jawaban_publik);
  const hayTokens = new Set(tokenize(hay));
  // keyword match - bobot tinggi
  for (const kw of entry.keywords) {
    const kwn = normalize(kw);
    if (kwn && qNorm.includes(kwn)) score += 12;
    // token keyword
    for (const t of tokenize(kwn)) {
      if (qTokens.includes(t)) score += 2;
    }
  }
  // judul match
  const titleNorm = normalize(entry.judul);
  if (qNorm && titleNorm.includes(qNorm)) score += 20;
  for (const t of qTokens) {
    if (titleNorm.includes(t)) score += 4;
    if (hayTokens.has(t)) score += 1;
  }
  // frasa khusus - boost
  const specials = [
    ['core bodoh', 'core_bodoh_fresnel'], ['fresnel', 'core_bodoh_fresnel'], ['mercusuar', 'fresnel_mercusuar'],
    ['shelter', 'shelter_40kaki'], ['starlink', 'internet_satelit_starlink'], ['mqtt', 'perang_waktu_latency'],
    ['satusehat', 'dabo_menuju_indonesia_satusehat'], ['wakaf', 'wakaf'], ['trust house', 'trust_house'],
    ['urt', 'status_candidate_urt01'], ['urt-01', 'status_candidate_urt01'], ['p&p', 'pp_15_menit'],
    ['pemecah batu', 'pemecah_batu'], ['wijoyo kusumo', 'wijoyo_kusumo'], ['habib', 'habib_penjaga_pertama'],
    ['kesapa', 'bab1_indonesia_tidak_terlihat'], ['brankar', 'bab1_indonesia_tidak_terlihat'],
    ['70 juta', 'bab3_pertanyaan_melahirkan_otris'], ['keranjang sawit', 'bab3_pertanyaan_melahirkan_otris'],
    ['20-25', 'ekonomi_baru_sharing_jasa'], ['20 persen', 'ekonomi_baru_sharing_jasa'],
    ['three foundations', 'constitution_three_foundations'], ['lighthouse', 'constitution_three_foundations'],
    ['sacred assets', 'constitution_sacred_assets'], ['stewardship', 'constitution_stewardship'],
    ['90 hari', 'constitution_decisions'], ['supermajority', 'constitution_decisions'],
    ['lampu', 'fresnel_mercusuar'], ['ferry', 'prolog_ferry'], ['dabo', 'bab1_indonesia_tidak_terlihat'],
    ['dr j', 'bab2_musuh_sebenarnya'], ['hernia', 'bab2_musuh_sebenarnya'],
    ['katanya', 'narasi_mengalahkan_fakta'], ['narasi', 'narasi_mengalahkan_fakta'],
    ['asean', 'beyond_indonesia'], ['filipina', 'beyond_indonesia'],
    ['master', 'master_overview'], ['book ii', 'book2_engineering'], ['book iv', 'book4_architecture'],
    ['book v', 'book5_component'], ['local first', 'local_first_rumah'],
    ['dual-path', 'dual_path'], ['dual path', 'dual_path'], ['hvac', 'hvac_tekanan'],
    ['audit', 'constitution_values'], ['purpose', 'constitution_purpose'],
  ];
  for (const [phrase, id] of specials) {
    if (qNorm.includes(phrase) && entry.id === id) score += 30;
  }
  return score;
}

function findBest(query) {
  const qNorm = normalize(query);
  const qTokens = tokenize(query);
  if (!KNOWLEDGE.length) return null;
  let best = null, bestScore = 0;
  let scored = [];
  for (const e of KNOWLEDGE) {
    const s = scoreEntry(e, qNorm, qTokens);
    if (s > 0) scored.push({e, s});
  }
  scored.sort((a,b) => b.s - a.s);
  if (scored.length && scored[0].s >= 6) return scored[0].e;
  return null;
}

function findTop3(query) {
  const qNorm = normalize(query);
  const qTokens = tokenize(query);
  let scored = [];
  for (const e of KNOWLEDGE) {
    const s = scoreEntry(e, qNorm, qTokens);
    if (s > 0) scored.push({e, s});
  }
  scored.sort((a,b) => b.s - a.s);
  return scored.slice(0,3).map(x => x.e);
}

function fallbackAnswer(query) {
  const q = normalize(query);
  if (q.includes('halo') || q.includes('hai') || q.includes('selamat')) {
    return "Halo, saya Tanya Wijoyo. Tanya apa saja tentang THE JEMBATAN dan OTRIS - misalnya: Apa itu OTRIS? Mengapa Core harus bodoh? Apa itu Shelter 40 kaki? Apa itu Wakaf OTRIS? Atau: Status URT-01 bagaimana?";
  }
  if (q.includes('siapa') && q.includes('penulis')) {
    return "Penulis THE JEMBATAN dan THE OTRIS CONSTITUTION adalah Hanif Ahdi Fiddini, Founder OTRIS. Untuk nama amanah Wijoyo Kusumo, itu dijaga di Trust House - silakan tanya ke Trust House, saya tidak mengarang hubungan atau perannya di dalam buku.";
  }
  return "Saya tidak menemukan jawaban itu di dalam 4 buku final yang saya baca - THE JEMBATAN ID v2 (262 hal), THE JEMBATAN EN (152 hal), Konstitusi IND (231 hal), dan Master 20 Buku. Saya tidak mengarang. Coba tanya dengan kata kunci dari buku - misalnya: Core bodoh, Shelter 40 kaki, Starlink, Sharing jasa 20-25%, Three Foundations, Sacred Assets, Stewardship. Atau untuk detail dalam - kode, API, diagram, akad wakaf, URT-01, P&P 15 Menit, Pemecah Batu - silakan tanya ke Trust House.";
}

function renderAnswer(entry, query) {
  const answer = document.createDocumentFragment();
  const title = document.createElement('div');
  title.className = 'ans-title';
  title.textContent = entry.judul;
  const chapter = document.createElement('div');
  chapter.className = 'ans-bab';
  chapter.textContent = entry.bab;
  const response = document.createElement('p');
  response.textContent = entry.jawaban_publik;
  answer.append(title, chapter, response);

  if (entry.rujuk_trust_house) {
    const note = document.createElement('div');
    note.className = 'trust-note';
    note.textContent = 'Untuk detail dalam ini, silakan tanya ke Trust House - saya tidak mengarang detail yang tidak ada di buku publik.';
    answer.append(note);
  }

  const related = findTop3(query).filter(item => item.id !== entry.id).slice(0, 2);
  if (related.length) {
    const links = document.createElement('div');
    links.className = 'related';
    links.append('Terkait: ');
    for (const item of related) {
      const suggestion = document.createElement('button');
      suggestion.type = 'button';
      suggestion.className = 'chip';
      suggestion.textContent = item.judul;
      links.append(suggestion);
    }
    answer.append(links);
  }

  return answer;
}

const RUJUK_TRUST_HOUSE = "Itu detail arsitektur khusus kita buat jualan kamera / buat OTRIS. Untuk detailnya, silakan Minta di Trust House.";
const MINTA_DETAIL = [
  /\b(?:detail\w*|rinci\w*|teknis|technical|mendalam|lebih lanjut|lebih dalam|in depth|lengkap|semua|seluruh|keseluruhan|daftar|tiap topik|19 topik|all topics|all 19|full|entire)\b/,
  /\b(?:step by step|langkah\w*|tahapan|cara|how to|how does|implementasi|implementation|spesifikasi|specifications?|parameter|konfigurasi|configuration)\b/,
  /\b(?:kode|code|pseudocode|api|algoritm[ae]|algorithm|arsitektur internal|diagram|skema|pipeline|raw bytes|profile yaml|l[0-4])\b/,
  /\b(?:knowledge|json|dump|bocor\w*|salin\w*)\b/
];

const JAWABAN_PUBLIK = [
  {
    topik: /\bwater ?gate\b/,
    jawaban: "Water Gate itu teknik kita buat ngatur aliran video kamera biar stabil, nggak macet. Arsitektur khusus kita buat jualan kamera. Untuk detailnya, Minta di Trust House ya."
  },
  {
    topik: /\b(?:wakaf|dijual|jual (?:ilmu|system|sistem|hardware)|hardware (?:projek|proyek|project))\b/,
    jawaban: "Ilmu tidak dijual. System tidak dijual. Hardware projek boleh dijual."
  },
  {
    topik: /\b(?:pengelola|hadi wijoyo kusumo|hanif ahdi fiddini)\b/,
    jawaban: "Wakaf ini atas nama Hadi Wijoyo Kusumo. Pengelolanya Hanif Ahdi Fiddini."
  },
  {
    topik: /\b(?:trust house|wijoyo kusumo|wijoyo)\b/,
    jawaban: "Wijoyo Trust House adalah rumah wakaf dari OTRIS. Di sana ada Wakaf Rumah dan Pemecah Batu."
  },
  {
    topik: /\b(?:pemecah batu|stone breaker)\b/,
    jawaban: "Pemecah Batu membantu memecah pekerjaan besar menjadi bagian yang bisa diperiksa. Kalau buktinya belum cukup, hasilnya tetap belum diketahui."
  },
  {
    topik: /\b(?:satusehat|satu sehat|hl7|hl 7|fhir|pmk 24|permenkes(?: nomor)? 24)\b/,
    jawaban: "SATUSEHAT adalah platform pertukaran data kesehatan dari Kementerian Kesehatan. Platform ini memakai standar HL7 FHIR agar sistem bisa bertukar data dengan format yang seragam."
  },
  {
    topik: /\b(?:plug (?:and )?play|p p|pnp|15 menit)\b/,
    jawaban: "P&P 15 Menit adalah target pemasangan OTRIS untuk perangkat yang sudah siap. Waktunya bergantung pada kondisi dan kesiapan perangkat."
  },
  {
    topik: /\b(?:local first|lokal dulu|tanpa cloud)\b/,
    jawaban: "Local First berarti fungsi inti OTRIS tetap bisa berjalan di tempat saat cloud tidak tersedia."
  },
  {
    topik: /\b(?:prinsip|konstitusi|constitution|integration over replacement|vendor agnostic|canonical first|gateway first|event driven|audit first)\b/,
    jawaban: "OTRIS mengutamakan integrasi perangkat yang sudah ada. Sistem dirancang supaya bisa bekerja lintas merek dan hasilnya bisa diperiksa."
  },
  {
    topik: /\bclinical wall\b/,
    jawaban: "Clinical Wall adalah tampilan OTRIS yang membantu tenaga klinis melihat informasi di satu tempat."
  },
  {
    topik: /\b(?:core|inti otris)\b/,
    jawaban: "OTRIS Core adalah bagian inti yang mengolah informasi untuk komponen OTRIS lainnya."
  },
  {
    topik: /\bgateway\b/,
    jawaban: "Gateway membantu perangkat medis terhubung dan berbagi informasi dengan OTRIS."
  },
  {
    topik: /\bedge\b/,
    jawaban: "OTRIS Edge bekerja dekat perangkat, di lokasi tempat informasi berasal."
  },
  {
    topik: /\botris\b/,
    jawaban: "OTRIS menghubungkan perangkat medis yang sudah ada, informasi, dan tenaga ahli. ICU adalah pintu masuk. Manusia adalah tujuannya."
  }
];

function jawabWijoyo(tanya){
  const pertanyaan = tanya.toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").replace(/[^a-z0-9]+/g, " ").trim();
  if(MINTA_DETAIL.some(pola => pola.test(pertanyaan))) return RUJUK_TRUST_HOUSE;
  return JAWABAN_PUBLIK.find(({ topik }) => topik.test(pertanyaan))?.jawaban
    ?? "Ambo bisa kasih gambaran singkat tentang OTRIS dan Wakaf Wijoyo. Untuk bahasan lain, silakan Minta di Trust House.";
}

function buatChatWijoyo() {
  if (document.getElementById('wijoyo-chat')) return;

  const widget = document.createElement('div');
  widget.id = 'wijoyo-chat';
  widget.innerHTML = `
    <button id="wijoyo-btn" type="button" aria-controls="wijoyo-box" aria-expanded="false">Tanya Wijoyo</button>
    <section id="wijoyo-box" role="dialog" aria-labelledby="wijoyo-title" hidden>
      <div class="wijoyo-header">
        <h2 id="wijoyo-title">WIJOYO TRUST HOUSE - Tanya Ambo</h2>
        <button id="wijoyo-close" type="button" aria-label="Tutup chat">×</button>
      </div>
      <div id="wijoyo-msg" role="log" aria-label="Percakapan">
        <p class="wijoyo-message">Halo, saya Tanya Ambo. Tanya apa pun tentang OTRIS, Wakaf, atau Trust House.</p>
      </div>
      <form class="wijoyo-form">
        <input id="wijoyo-input" type="text" aria-label="Pertanyaan" placeholder="Tanya apa pun..." autocomplete="off">
        <button id="wijoyo-kirim" type="submit">Kirim</button>
      </form>
    </section>`;
  document.body.append(widget);

  const button = widget.querySelector('#wijoyo-btn');
  const panel = widget.querySelector('#wijoyo-box');
  const close = widget.querySelector('#wijoyo-close');
  const messages = widget.querySelector('#wijoyo-msg');
  const input = widget.querySelector('#wijoyo-input');
  let knowledgePromise;

  function setOpen(open) {
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    (open ? input : button).focus();
  }

  function addMessage(content, fromUser = false) {
    const message = document.createElement('div');
    message.className = fromUser ? 'wijoyo-message user' : 'wijoyo-message';
    message.append(content);
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
  }

  async function send() {
    const query = input.value.trim();
    if (!query) return;

    addMessage(query, true);
    input.value = '';
    input.focus();

    knowledgePromise ??= loadKnowledge();
    if (await knowledgePromise && KNOWLEDGE.length) {
      const entry = findBest(query);
      addMessage(entry ? renderAnswer(entry, query) : fallbackAnswer(query));
    } else {
      addMessage(jawabWijoyo(query));
    }
  }

  button.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false));
  widget.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) setOpen(false);
  });
  widget.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    send();
  });
  messages.addEventListener('click', event => {
    if (!event.target.matches('.chip')) return;
    input.value = event.target.textContent;
    send();
  });
}

document.addEventListener('DOMContentLoaded', buatChatWijoyo);
