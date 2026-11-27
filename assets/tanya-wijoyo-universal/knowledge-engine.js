/* Pencarian deterministik yang meneruskan pencocokan kata kunci dari paket Founder. */
(() => {
  'use strict';

  const stopWords = new Set((
    'apa itu apakah yang dalam dan atau dengan dari untuk pada menjadi bagaimana mengapa siapa kapan di ke saya kami ambo ' +
    'boleh bisa tolong jelaskan penjelasan tentang detail lengkap informasi lebih lanjut sebutkan berikan ceritakan dong ya ' +
    'ingin mau tahu minta padaku mengenai secara rinci teknis konfigurasi pengaturan menggunakan saat juga serta lalu ' +
    'berapa definisi definisikan pengertian spesifikasi pemula ' +
    'what is are was were which where who why how the a an and or of for to from about does do can could you me ' +
    'please explain describe tell detail details information more give list i would like know technical configuration settings using also then definition specifications beginners ' +
    'que quel quels quelle quelles est sont comment pourquoi le la les un une des du de en et ou pour par sur aux au'
  ).trim().split(/\s+/));

  const onlyText = value => typeof value === 'string' ? value : '';
  function normalize(value) {
    return onlyText(value).normalize('NFKD').replace(/\p{M}+/gu, '').toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  }

  function normalizeTopic(value) {
    return normalize(value)
      .replace(/\b(?:p p|pnp|plug (?:and |n )?play)\b/g, 'plug play')
      .replace(/\b(?:menit|minutes)\b/g, 'minute')
      .replace(/\bwi fi\b/g, 'wifi')
      .replace(/\b(?:trash|tras|trus) house\b/g, 'trust house');
  }

  function words(value) {
    return value.split(' ').filter(word => word && !stopWords.has(word));
  }

  function phrase(text, part) {
    return Boolean(part) && (
      (' ' + text + ' ').includes(' ' + part + ' ') ||
      (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Thai}]/u.test(part) && text.includes(part))
    );
  }

  function sourcesFor(value) {
    if (!Array.isArray(value)) return [];
    return value.map(source => typeof source === 'string' ? { label: source, url: '' } :
      { label: onlyText(source?.label), url: onlyText(source?.url) }).filter(source => source.label || source.url);
  }

  function formatBlock(block) {
    switch (block?.type) {
      case 'paragraph':
      case 'code':
        return { type: block.type, text: onlyText(block.text), language: onlyText(block.language) };
      case 'list':
        return { type: 'list', items: Array.isArray(block.items) ? block.items.map(onlyText) : [], ordered: block.ordered === true };
      case 'table':
        return { type: 'table', headers: Array.isArray(block.headers) ? block.headers.map(onlyText) : [],
          rows: Array.isArray(block.rows) ? block.rows.filter(Array.isArray).map(row => row.map(onlyText)) : [] };
      default:
        throw new TypeError('Unknown knowledge block type');
    }
  }

  function blockText(block) {
    if (block.type === 'list') return block.items.join('\n');
    if (block.type === 'table') return [block.headers, ...block.rows].map(row => row.join('\t')).join('\n');
    return block.text;
  }

  function normalizeEntry(value, defaultSource = '') {
    const title = onlyText(value?.title).trim();
    const content = onlyText(value?.content);
    const blocks = Array.isArray(value?.blocks) ? value.blocks.map(formatBlock) : [];
    if (!title || !(content.trim() || blocks.some(block => blockText(block).trim()))) {
      throw new TypeError('Each entry needs a title and content or blocks');
    }

    const language = onlyText(value.lang).trim();
    const sources = sourcesFor(value.sources);
    const entry = {
      id: onlyText(value.id).trim() || `${language || 'und'}:${title.toLowerCase().normalize('NFC')}`,
      title, content, blocks, lang: language,
      category: onlyText(value.category).trim(),
      keywords: Array.isArray(value.keywords) ? value.keywords.filter(keyword => typeof keyword === 'string' && keyword.trim()) : [],
      sources: sources.length ? sources : sourcesFor(defaultSource ? [defaultSource] : []),
    };
    return entry;
  }

  function parseKnowledge(data, defaultSource = '', defaultLanguage = '') {
    const list = Array.isArray(data) ? data : data?.knowledge;
    if (!Array.isArray(list)) throw new TypeError('Expected a JSON array or a knowledge array');
    return list.map(entry => normalizeEntry({
      ...entry, lang: entry?.lang || (/^en-/.test(entry?.id) ? 'en' : defaultLanguage),
    }, defaultSource));
  }

  function legacyKnowledge(data, defaultSource) {
    if (!Array.isArray(data?.knowledge)) throw new TypeError('Invalid legacy knowledge');
    return data.knowledge.flatMap(entry => {
      const versions = { id: entry, ...entry.translations };
      return Object.entries(versions).filter(([, data]) => data?.judul && data?.jawaban_publik)
        .map(([lang, data]) => normalizeEntry({
          id: `otris:${entry.id}:${lang}`, title: data.judul, content: data.jawaban_publik,
          keywords: entry.keywords, category: data.bab, lang,
        }, defaultSource));
    });
  }

  function buildIndex(entries) {
    return entries.map(entry => {
      const heading = normalizeTopic(entry.title);
      const titleWords = words(heading);
      const keywords = [...new Set(entry.keywords.map(keyword => words(normalizeTopic(keyword)).join(' ')).filter(Boolean))];
      return {
        entry, title: titleWords.join(' '), titleWords, keywords,
        keyWords: new Set([...titleWords, ...keywords.flatMap(keyword => keyword.split(' '))]),
        bodyWords: new Set(words(normalizeTopic([entry.content, ...entry.blocks.map(blockText)].join(' ')))),
        technical: /\b(?:teknologi|technology|teknis|technical|spesifikasi|specifications)\b/.test(heading),
      };
    });
  }

  function questionLanguage(question, fallback) {
    if (/\b(?:apa|apakah|bagaimana|mengapa|siapa|berapa|jelaskan|tolong|sebutkan|tentang|secara|menit|dan|serta)\b/.test(question)) return 'id';
    if (/\b(?:what|how|why|who|explain|describe|tell|please|minutes)\b/.test(question)) return 'en';
    if (/\b(?:quel|quelle|comment|pourquoi|expliquez)\b/.test(question)) return 'fr';
    return fallback;
  }

  function rank(record, tokens, technical) {
    const query = tokens.join(' ');
    const titleHits = tokens.filter(token => phrase(record.title, token)).length;
    const keyHits = tokens.filter(token => record.keyWords.has(token)).length;
    const keyPhrase = record.keywords.reduce((longest, keyword) =>
      phrase(query, keyword) ? Math.max(longest, keyword.split(' ').length) : longest, 0);
    const exactTitle = record.title === query;
    const titleContainsQuery = phrase(record.title, query);
    const queryContainsTitle = record.titleWords.length > 1 && phrase(query, record.title);
    const anchored = titleHits > 0 || keyPhrase > 1 || record.keywords.includes(query);
    if (!anchored) return 0;
    if (keyHits < tokens.length) {
      if (Math.max(titleHits, keyPhrase) < 2 || keyHits < tokens.length / 2) return 0;
      if (!tokens.every(token => record.keyWords.has(token) || record.bodyWords.has(token))) return 0;
    }

    const extraTitleWords = Math.max(0, record.titleWords.length - tokens.length);
    return (exactTitle ? 42 : titleContainsQuery ? 25 : queryContainsTitle ? 18 : 0)
      + titleHits * 7 + keyHits * 4 + keyPhrase * 5 - extraTitleWords / 4
      + (technical && record.technical && Math.max(titleHits, keyPhrase) >= 2 ? 32 : 0);
  }

  // A single insertion, deletion, substitution or adjacent transposition.
  function near(first, second) {
    if (Math.abs(first.length - second.length) > 1) return false;
    const offset = first.split('').findIndex((letter, i) => letter !== second[i]);
    if (offset === -1) return first.length !== second.length;
    const a = first.slice(offset);
    const b = second.slice(offset);
    if (a.length < b.length) return a === b.slice(1);
    if (a.length > b.length) return a.slice(1) === b;
    return a.slice(1) === b.slice(1) || (a[0] === b[1] && a[1] === b[0] && a.slice(2) === b.slice(2));
  }

  function correctTypos(known, tokens) {
    const candidates = [...known].filter(word => /^\p{L}{3,}$/u.test(word));
    return tokens.map(token => {
      if (known.has(token) || !/^\p{L}{4,}$/u.test(token)) return token;
      const options = candidates.filter(word => near(token, word));
      return options.length === 1 ? options[0] : token;
    });
  }

  function bestMatch(records, tokens, technical) {
    const query = [...new Set(tokens)];
    function matches(candidate) {
      if (!candidate.length) return [];
      return records.map(record => ({ record, score: rank(record, candidate, technical) }))
        .filter(result => result.score > 0).sort((a, b) => b.score - a.score);
    }
    let ranked = matches(query);
    if (ranked.length) return ranked;
    const known = new Set(records.flatMap(record => [...record.keyWords]));
    const corrected = correctTypos(known, query);
    if (corrected.some((token, i) => token !== query[i])) ranked = matches([...new Set(corrected)]);
    if (ranked.length || corrected.length < 2) return ranked;
    // Resolve an ambiguous spelling only when another word anchors the same source.
    ranked = records.filter(record => corrected.some(token => record.keyWords.has(token)))
      .map(record => {
        const contextual = correctTypos(record.keyWords, corrected);
        return { record, score: rank(record, [...new Set(contextual)], technical) };
      }).filter(result => result.score > 0).sort((a, b) => b.score - a.score);
    return ranked;
  }

  function findAnswer(index, question, fallback) {
    const raw = normalize(question);
    const detected = questionLanguage(raw, '');
    const language = detected || fallback;
    const subject = normalizeTopic(question);
    const tokens = words(subject);
    const result = (status, entries = []) => ({ status, entries, language });
    if (!tokens.length || /^(?:this|that|halo|hai|hello|bonjour|help|bantu|test|tes)$/.test(tokens.join(' '))) {
      return result('clarify');
    }

    const local = index.filter(({ entry }) => !entry.lang || entry.lang.toLowerCase().split('-')[0] === language);
    const technical = /\b(?:detail|details|rinci|lengkap|teknis|technical|spesifikasi|specifications|konfigurasi|configuration|port|ports)\b/.test(raw);
    const topics = subject.split(/\b(?:dan|and|serta|versus|vs)\b/).map(words).filter(part => part.length);
    function retrieve(records) {
      const ranked = bestMatch(records, tokens, technical);
      if (topics.length > 1 && ranked[0]?.record.title !== [...new Set(tokens)].join(' ')) {
        const matches = topics.map(part => bestMatch(records, part, technical)[0]?.record.entry);
        if (matches.every(Boolean)) {
          const distinct = [...new Map(matches.map(entry => [entry.id, entry])).values()];
          if (distinct.length > 1) return result('answer', distinct);
        }
      }
      if (!ranked.length) return result('unknown');
      const ties = ranked.filter(candidate => candidate.score === ranked[0].score);
      const unique = new Map(ties.map(({ record }) => [record.title, record.entry]));
      if (unique.size > 1 && tokens.length === 1) return result('clarify', [...unique.values()]);
      return result('answer', [ranked[0].record.entry]);
    }
    const preferred = retrieve(local);
    return !detected && preferred.status === 'unknown' ? retrieve(index) : preferred;
  }

  window.TanyaWijoyoEngine = { normalizeEntry, parseKnowledge, legacyKnowledge, buildIndex, findAnswer, blockText };
})();
