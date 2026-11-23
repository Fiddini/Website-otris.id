// Tanya Wijoyo answers from the public THE JEMBATAN and OTRIS Constitution knowledge.
(() => {
  let i18n;
  const translate = key => i18n.translate('chat.' + key);
  const ignoredWords = new Set((
    'apa itu adalah apakah dengan dalam bagaimana yang dan untuk dari ke di ini saya kami ' +
    'what which where who why how is are was the a an and or of for to from about does do can could you me ' +
    'que quel quels quelle quelles est sont comment pourquoi le la les un une des du de en et ou pour par sur aux au'
  ).split(/\s+/));
  const topicAliases = {
    core_bodoh_fresnel: ['core bodoh', 'core stay simple', 'core simple', 'core reste t il simple'],
    fresnel_mercusuar: ['mercusuar', 'lampu', 'lentille de fresnel'],
    shelter_40kaki: ['shelter', '40 pieds', '40 kaki'],
    internet_satelit_starlink: ['starlink'],
    perang_waktu_latency: ['mqtt', 'latency', 'latence'],
    dabo_menuju_indonesia_satusehat: ['satusehat'],
    wakaf: ['wakaf', 'waqf'],
    trust_house: ['trust house'],
    status_candidate_urt01: ['urt', 'urt 01'],
    pp_15_menit: ['p p', 'plug and play', '15 menit', '15 minutes'],
    pemecah_batu: ['pemecah batu', 'stone breaker'],
    wijoyo_kusumo: ['wijoyo kusumo'],
    habib_penjaga_pertama: ['habib'],
    bab1_indonesia_tidak_terlihat: ['kesapa', 'brankar'],
    bab3_pertanyaan_melahirkan_otris: ['70 juta', '70 millions', 'keranjang sawit'],
    ekonomi_baru_sharing_jasa: ['20 25', '20 persen'],
    constitution_three_foundations: ['three foundations', 'trois fondements', 'lighthouse'],
    constitution_sacred_assets: ['sacred assets', 'actifs a preserver'],
    constitution_stewardship: ['stewardship', 'garde de l amanah'],
    constitution_decisions: ['90 hari', '90 days', '90 day', '90 jours', 'supermajority', 'majorite qualifiee'],
    prolog_ferry: ['ferry', 'dabo'],
    bab2_musuh_sebenarnya: ['dr j', 'hernia', 'hernie'],
    narasi_mengalahkan_fakta: ['katanya', 'narasi'],
    beyond_indonesia: ['asean', 'filipina', 'philippines'],
    master_overview: ['master constitution'],
    dual_path: ['dual path'],
    hvac_tekanan: ['hvac', 'pression positive'],
    constitution_values: ['values we refuse', 'nilai konstitusi'],
    constitution_purpose: ['purpose of otris', 'raison d etre d otris'],
  };

  const secretRequest = /\b(?:secret|rahasia|confidentiel\w*|privat\w*|naskah internal|internal (?:script|source)|script interne)\b/;
  const unverifiedPerformance = /\b(?:approved hardware|hardware approved|materiel approuve|hardware disetujui|perangkat keras disetujui|150\s*ms|150 millisecond\w*)\b/;
  const edge = /\bedge\b/;
  const performance = /\b(?:kinerja|performa|performances?|latensi|latency|latence|kecepatan|speed|vitesse|benchmarks?)\b/;
  const verification = /\b(?:bukti|terbukti|dibuktikan|diuji|terukur|proof|evidence|proven|verif\w*|tested|measured|preuves?|prouv\w*|testes?|mesur\w*)\b/;
  const latencyMeasurement = /\b\d+\s*(?:ms|milidetik|millisecond(?:e?s?)?)\b/;
  const plugTiming = /\b(?:15 minutes live|15 menit live|en service en 15 minutes)\b/;
  const hello = /^(?:halo|hai|hello|hi|bonjour|salut|selamat pagi|selamat siang|selamat malam)(?: (?:ambo|wijoyo))?$/;
  const author = /\b(?:siapa (?:yang menulis|penulis)|who (?:wrote|is the author)|qui a ecrit|qui est l auteur)\b/;
  const publicAnswers = [
    [/\bwater gate\b/, 'publicWaterGate'],
    [/\b(?:wakaf|waqf|dijual|jual ilmu|sell knowledge|vendre le savoir)\b/, 'publicWaqf'],
    [/\b(?:pengelola|hadi wijoyo kusumo|hanif ahdi fiddini|administrator|gestionnaire)\b/, 'publicSteward'],
    [/\b(?:trust house|wijoyo kusumo|wijoyo)\b/, 'publicHouse'],
    [/\b(?:pemecah batu|stone breaker)\b/, 'publicStone'],
    [/\b(?:satusehat|satu sehat|hl7|hl 7|fhir|pmk 24)\b/, 'publicFhir'],
    [/\b(?:plug (?:and )?play|plug play|p p|pnp|15 menit|15 minutes)\b/, 'publicPlug'],
    [/\b(?:local first|lokal dulu|sans cloud|tanpa cloud)\b/, 'publicLocal'],
    [/\b(?:prinsip|konstitusi|constitution|integration over replacement|vendor agnostic)\b/, 'publicPrinciple'],
    [/\bclinical wall\b/, 'publicWall'],
    [/\bcore\b/, 'publicCore'],
    [/\bgateway\b/, 'publicGateway'],
    [/\bedge\b/, 'publicEdge'],
    [/\botris\b/, 'publicOtris'],
  ];

  let knowledgeRequest;

  async function loadKnowledge() {
    try {
      const response = await fetch('wijoyo-knowledge.json');
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data.knowledge) ? data.knowledge : [];
    } catch {
      return [];
    }
  }

  function normalize(text) {
    return text.toLowerCase().normalize('NFKD')
      .replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function words(text) {
    return new Set(text.split(' ').filter(word => word.length > 1 && !ignoredWords.has(word)));
  }

  function includesPhrase(text, phrase) {
    return (' ' + text + ' ').includes(' ' + phrase + ' ');
  }

  function fieldsFor(entry, language) {
    return language === 'id' ? entry : entry.translations?.[language];
  }

  function rankEntries(query, entries, language) {
    const tokens = words(query);
    if (!tokens.size) return [];

    return entries.map(entry => {
      const local = fieldsFor(entry, language);
      const title = normalize(local?.judul ?? entry.judul);
      const titleWords = words(title);
      const description = words(normalize(local?.jawaban_publik ?? entry.jawaban_publik));
      const keywords = entry.keywords.map(normalize).filter(Boolean);
      let score = title === query ? 48 : 0;

      for (const keyword of keywords) {
        if (includesPhrase(query, keyword)) score += keyword.includes(' ') ? 14 : 8;
      }
      for (const token of tokens) {
        if (titleWords.has(token)) score += 5;
        if (description.has(token)) score += 1;
      }
      if (title && includesPhrase(query, title)) score += 12;
      if (topicAliases[entry.id]?.some(alias => includesPhrase(query, alias))) score += 30;

      return { entry, score };
    }).filter(({ score }) => score >= 6)
      .sort((left, right) => right.score - left.score)
      .map(({ entry }) => entry);
  }

  function renderEntry(entry, local, related, language) {
    const answer = document.createDocumentFragment();
    for (const [tag, className, value] of [
      ['div', 'ans-title', local.judul],
      ['div', 'ans-bab', local.bab],
      ['p', '', local.jawaban_publik],
    ]) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      node.textContent = value;
      answer.append(node);
    }
    if (entry.rujuk_trust_house) {
      const note = document.createElement('p');
      note.className = 'trust-note';
      note.textContent = translate('trustNote');
      answer.append(note);
    }
    const suggestions = related.map(candidate => fieldsFor(candidate, language)).filter(Boolean).slice(0, 2);
    if (suggestions.length) {
      const links = document.createElement('div');
      links.className = 'related';
      links.append(translate('related') + ' ');
      for (const suggestion of suggestions) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'chip';
        button.textContent = suggestion.judul;
        links.append(button);
      }
      answer.append(links);
    }
    return answer;
  }

  function fallbackKey(query) {
    const match = publicAnswers.find(([pattern]) => pattern.test(query));
    return match ? match[1] : 'unknown';
  }

  function findAnswer(rawQuery, entries) {
    const query = normalize(rawQuery);
    if (secretRequest.test(query)) return { key: 'private' };
    const requestsEdgeEvidence = edge.test(query) &&
      (latencyMeasurement.test(query) || (performance.test(query) && verification.test(query)));
    if (unverifiedPerformance.test(query) || requestsEdgeEvidence) return { key: 'unknown' };
    if (plugTiming.test(query)) return { key: 'publicPlug' };
    if (hello.test(query)) return { key: 'greeting' };
    if (author.test(query)) return { key: 'author' };

    const [entry, ...related] = rankEntries(query, entries, i18n.language);
    return { entry, related, key: fallbackKey(query) };
  }

  function renderAnswer({ entry, related, key }) {
    const language = i18n.language;
    const local = entry && fieldsFor(entry, language);
    return local ? renderEntry(entry, local, related, language) : translate(key);
  }

  function initChat() {
    if (document.getElementById('wijoyo-chat')) return;
    const widget = document.createElement('div');
    widget.id = 'wijoyo-chat';
    widget.innerHTML = [
      '<button id="wijoyo-btn" type="button" aria-controls="wijoyo-box" aria-expanded="false" data-i18n="chat.button">Tanya Wijoyo</button>',
      '<section id="wijoyo-box" role="dialog" aria-labelledby="wijoyo-title" hidden>',
      '  <div class="wijoyo-header">',
      '    <h2 id="wijoyo-title" data-i18n="chat.title">WIJOYO TRUST HOUSE - Tanya Ambo</h2>',
      '    <button id="wijoyo-close" type="button" aria-label="Tutup chat" data-i18n-aria-label="chat.close">×</button>',
      '  </div>',
      '  <div id="wijoyo-msg" role="log" aria-label="Percakapan" data-i18n-aria-label="chat.conversation">',
      '    <p class="wijoyo-message" data-i18n="chat.greeting">Halo, saya Tanya Ambo. Tanya apa pun tentang OTRIS, Wakaf, atau Trust House.</p>',
      '  </div>',
      '  <form class="wijoyo-form">',
      '    <input id="wijoyo-input" type="text" aria-label="Pertanyaan" data-i18n-aria-label="chat.question" placeholder="Tanya apa pun..." data-i18n-placeholder="chat.placeholder" autocomplete="off">',
      '    <button id="wijoyo-kirim" type="submit" data-i18n="chat.send">Kirim</button>',
      '  </form>',
      '</section>',
    ].join('\n');
    document.body.append(widget);
    i18n.apply(widget);

    const button = widget.querySelector('#wijoyo-btn');
    const panel = widget.querySelector('#wijoyo-box');
    const close = widget.querySelector('#wijoyo-close');
    const messages = widget.querySelector('#wijoyo-msg');
    const input = widget.querySelector('#wijoyo-input');
    const answers = [];

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
      return message;
    }

    async function send() {
      const query = input.value.trim();
      if (!query) return;
      addMessage(query, true);
      const reply = addMessage('');
      reply.hidden = true;
      input.value = '';
      input.focus();

      knowledgeRequest ??= loadKnowledge();
      const answer = findAnswer(query, await knowledgeRequest);
      reply.replaceChildren(renderAnswer(answer));
      reply.hidden = false;
      answers.push({ reply, answer });
      messages.scrollTop = messages.scrollHeight;
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
    document.addEventListener('otris:languagechange', () => {
      for (const { reply, answer } of answers) {
        reply.replaceChildren(renderAnswer(answer));
      }
    });
  }

  // i18n.js is deferred while some pages load this script synchronously at the end of body.
  document.addEventListener('DOMContentLoaded', () => {
    i18n = window.otrisI18n;
    if (i18n) initChat();
  });
})();
