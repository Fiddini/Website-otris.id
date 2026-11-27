/* Tanya Wijoyo — local knowledge widget adapted from the Founder’s widget. */
(() => {
  'use strict';

  const loader = document.currentScript;
  if (!loader || document.querySelector('tanya-wijoyo')) return;
  const base = new URL('.', loader.src);
  const filesOnly = location.protocol === 'file:';

  function localURL(path) {
    const url = new URL(path, base);
    if (filesOnly ? url.protocol !== 'file:' : url.origin !== location.origin) {
      throw new Error('Tanya Wijoyo requires local or same-origin assets');
    }
    return url.href;
  }

  function loadScript(path) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = localURL(path);
      if (loader.nonce) script.nonce = loader.nonce;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Tanya Wijoyo could not load a local asset'));
      document.head.append(script);
    });
  }

  async function jsonFile(path) {
    const response = await fetch(localURL(path), {
      credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer',
    });
    if (!response.ok) throw new Error('Tanya Wijoyo could not read local knowledge');
    return response.json();
  }

  const copy = {
    id: {
      open: 'Tanya Wijoyo', local: 'Pencarian pengetahuan lokal', resize: 'Perbesar panel',
      shrink: 'Perkecil panel', full: 'Layar penuh', close: 'Tutup panel',
      messages: 'Percakapan', clear: 'Bersihkan percakapan', manage: 'Kelola pengetahuan',
      ask: 'Tanya apa pun...', send: 'Kirim', greeting: 'Tanya tentang Trust House, wakaf, atau pengetahuan yang tersedia.',
      unknown: 'Belum ada jawaban dari sumber lokal untuk pertanyaan ini.',
      clarify: 'Bisa jelaskan topik atau bagian yang ingin Anda ketahui?',
      copy: 'Salin jawaban', copied: 'Jawaban disalin.', copyError: 'Penyalinan gagal. Anda dapat memilih teks jawaban.',
      sources: 'Sumber', manager: 'Kelola pengetahuan', scope: 'Perubahan disimpan di browser ini.',
      categoryFilter: 'Kategori', all: 'Semua kategori', entry: 'Entri', new: 'Entri baru',
      title: 'Judul', category: 'Kategori', lang: 'Kode bahasa (contoh id atau en)', keywords: 'Kata kunci, pisahkan dengan koma',
      content: 'Isi jawaban', extra: 'Blok dan sumber (JSON, opsional)', save: 'Simpan entri', load: 'Impor JSON',
      export: 'Ekspor JSON', saved: 'Entri tersimpan.', imported: 'Entri diimpor.',
      badEntry: 'Periksa judul, isi, serta format blok dan sumber.',
      badImport: 'Impor gagal. Pastikan file mengikuti format knowledge JSON.',
      memory: 'Penyimpanan browser tidak tersedia. Perubahan berlaku selama halaman ini terbuka.',
      unavailable: 'Pengetahuan lokal belum dapat dimuat.',
    },
    en: {
      open: 'Tanya Wijoyo', local: 'Local knowledge search', resize: 'Expand panel',
      shrink: 'Reduce panel', full: 'Full screen', close: 'Close panel',
      messages: 'Conversation', clear: 'Clear conversation', manage: 'Manage knowledge',
      ask: 'Ask anything...', send: 'Send', greeting: 'Ask about Trust House, the waqf, or the knowledge available here.',
      unknown: 'No answer was found in the local sources for this question.',
      clarify: 'Could you specify the topic or what you would like to know?',
      copy: 'Copy answer', copied: 'Answer copied.', copyError: 'Copy failed. You can select the answer text.',
      sources: 'Sources', manager: 'Manage knowledge', scope: 'Changes are saved in this browser.',
      categoryFilter: 'Category', all: 'All categories', entry: 'Entry', new: 'New entry',
      title: 'Title', category: 'Category', lang: 'Language code (such as id or en)', keywords: 'Keywords, separated by commas',
      content: 'Answer content', extra: 'Blocks and sources (optional JSON)', save: 'Save entry', load: 'Import JSON',
      export: 'Export JSON', saved: 'Entry saved.', imported: 'Entries imported.',
      badEntry: 'Check the title, content, and the blocks and sources format.',
      badImport: 'Import failed. Check that the file uses the knowledge JSON format.',
      memory: 'Browser storage is unavailable. Changes apply while this page is open.',
      unavailable: 'Local knowledge could not be loaded.',
    },
  };

  async function start() {
    await Promise.all([loadScript('knowledge-engine.js'), loadScript(loader.dataset.config || 'widget-config.js')]);
    if (document.querySelector('tanya-wijoyo')) return;
    const engine = window.TanyaWijoyoEngine;
    const config = window.TanyaWijoyoConfig;
    const host = document.createElement('tanya-wijoyo');
    host.hidden = true;
    document.body.append(host);
    const shadow = host.attachShadow({ mode: 'open' });
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    const pageStyle = document.querySelector('link[data-tanya-wijoyo-style]');
    stylesheet.href = pageStyle ? localURL(pageStyle.href) : localURL('tanya-wijoyo-widget.css');
    stylesheet.onload = () => { host.hidden = false; };
    stylesheet.onerror = () => { host.remove(); };
    shadow.append(stylesheet);

    const shell = document.createElement('div');
    shell.className = 'tw';
    for (const color of ['navy','ivory','gold']) {
      const value = config.colors?.[color];
      if (/^#[a-f0-9]{6}$/i.test(value)) shell.style.setProperty('--tw-' + color, value);
    }
    shell.innerHTML = `
      <button class="tw-launch" type="button" aria-controls="tw-panel" aria-expanded="false" data-text="open"></button>
      <section class="tw-panel" id="tw-panel" aria-labelledby="tw-title" data-size="normal" hidden>
        <header class="tw-head">
          <div class="tw-identity">
            <p>WIJOYO TRUST HOUSE</p>
            <h2 id="tw-title">Tanya Ambo</h2>
          </div>
          <div class="tw-window-controls">
            <button class="tw-icon" type="button" data-action="shrink" data-hint="shrink">−</button>
            <button class="tw-icon" type="button" data-action="resize" data-hint="resize">+</button>
            <button class="tw-icon" type="button" data-action="full" data-hint="full" aria-pressed="false">⛶</button>
            <button class="tw-icon" type="button" data-action="close" data-hint="close">×</button>
          </div>
        </header>
        <div class="tw-toolbar">
          <span data-text="local"></span>
          <div>
            <button class="tw-quiet" type="button" data-action="manage" data-text="manage"></button>
            <button class="tw-quiet" type="button" data-action="clear" data-text="clear"></button>
          </div>
        </div>
        <div class="tw-log" id="tw-log" role="log" aria-live="polite" data-hint="messages" tabindex="0"></div>
        <form class="tw-form">
          <input class="tw-question" type="text" data-hint="ask" autocomplete="off" required>
          <button class="tw-send" type="submit" data-text="send"></button>
        </form>
        <p class="tw-sr tw-copy-status" role="status"></p>
      </section>
      <dialog class="tw-manager" aria-labelledby="tw-manager-title">
        <form method="dialog" class="tw-manager-head">
          <h2 id="tw-manager-title" data-text="manager"></h2>
          <button class="tw-icon" type="submit" data-hint="close">×</button>
        </form>
        <div class="tw-manager-body">
          <p class="tw-muted" data-text="scope"></p>
          <div class="tw-library-actions">
            <label><span data-text="categoryFilter"></span><select id="tw-category-filter"></select></label>
            <label><span data-text="entry"></span><select id="tw-record"></select></label>
          </div>
          <form class="tw-editor">
            <label><span data-text="title"></span><input name="title" required></label>
            <div class="tw-library-actions">
              <label><span data-text="category"></span><input name="category"></label>
              <label><span data-text="lang"></span><input name="lang"></label>
            </div>
            <label><span data-text="keywords"></span><input name="keywords"></label>
            <label><span data-text="content"></span><textarea name="content" rows="4"></textarea></label>
            <details><summary data-text="extra"></summary><textarea name="extra" rows="5" data-hint="extra"></textarea></details>
            <button class="tw-send" type="submit" data-text="save"></button>
          </form>
          <div class="tw-library-tools">
            <input type="file" class="tw-file" accept=".json,application/json" hidden>
            <button class="tw-button" type="button" data-action="import" data-text="load"></button>
            <button class="tw-button" type="button" data-action="export" data-text="export"></button>
          </div>
          <p class="tw-manager-status" role="status"></p>
        </div>
      </dialog>`;
    shadow.append(shell);

    const $ = selector => shell.querySelector(selector);
    const panel = $('.tw-panel');
    const launcher = $('.tw-launch');
    const thread = $('.tw-log');
    const input = $('.tw-question');
    const manager = $('.tw-manager');
    const editor = $('.tw-editor');
    const filters = $('#tw-category-filter');
    const selector = $('#tw-record');
    const upload = $('.tw-file');
    const action = name => $(`[data-action="${name}"]`);
    const storageKey = 'TanyaWijoyo:' + config.storageKey + ':' + base.pathname;
    const editable = config.allowKnowledgeEditing !== false && !loader.hasAttribute('data-readonly');
    action('manage').hidden = !editable || typeof manager.showModal !== 'function';

    function language() {
      const code = config.language !== 'auto' && config.language ? config.language : document.documentElement.lang;
      return (code || 'id').toLowerCase().split('-')[0];
    }

    const tr = (key, locale = language()) => (copy[locale] || copy.en)[key];
    let seeds = [];
    let changes = new Map();
    let entries = [];
    let index = [];
    let previousSize = 'normal';
    let hasConversation = false;
    let conversationVersion = 0;

    function rebuildIndex() {
      const merged = new Map(seeds.map(entry => [entry.id, entry]));
      changes.forEach((entry, id) => merged.set(id, entry));
      entries = [...merged.values()];
      index = engine.buildIndex(entries);
    }

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) changes = new Map(engine.parseKnowledge(JSON.parse(saved)).map(entry => [entry.id, entry]));
    } catch {
      // A blocked storage API or invalid local data does not block search.
    }

    async function readSeed() {
      if (!filesOnly) {
        try {
          return await jsonFile(config.knowledge);
        } catch (error) {
          if (config.knowledge !== 'knowledge.json') throw error;
        }
      }
      await loadScript(config.offlineKnowledge);
      return window.TanyaWijoyoSeed;
    }

    const ready = (async () => {
      try {
        seeds = engine.parseKnowledge(await readSeed(), config.seedSource, 'id');
      } catch {
        // A host collection can still be used if the seed is unavailable.
      }
      if (loader.dataset.legacyKnowledge && !filesOnly) {
        try {
          const legacy = await jsonFile(loader.dataset.legacyKnowledge);
          seeds.push(...engine.legacyKnowledge(legacy, 'otris.id · Koleksi publik'));
        } catch {
          // The portable base remains available even if a host collection is missing.
        }
      }
      rebuildIndex();
    })();

    function localize() {
      shell.querySelectorAll('[data-text]').forEach(node => { node.textContent = tr(node.dataset.text); });
      shell.querySelectorAll('[data-hint]').forEach(node => {
        const text = tr(node.dataset.hint);
        node.setAttribute('aria-label', text);
        if (node instanceof HTMLButtonElement) node.title = text;
      });
      input.placeholder = tr('ask');
      if (!hasConversation) resetThread();
    }

    function appendText(parent, tag, value) {
      const node = document.createElement(tag);
      node.textContent = value;
      parent.append(node);
      return node;
    }

    function resetThread() {
      conversationVersion++;
      thread.replaceChildren();
      const message = appendText(thread, 'p', tr('greeting'));
      message.className = 'tw-greeting';
      hasConversation = false;
      $('.tw-copy-status').textContent = '';
    }

    function setOpen(open) {
      panel.hidden = !open;
      launcher.hidden = open;
      launcher.setAttribute('aria-expanded', String(open));
      (open ? input : launcher).focus();
    }

    function setSize(size) {
      panel.dataset.size = size;
      action('full').setAttribute('aria-pressed', String(size === 'full'));
    }

    function changeFull() {
      if (panel.dataset.size === 'full') setSize(previousSize);
      else {
        previousSize = panel.dataset.size;
        setSize('full');
      }
    }

    function renderBlock(parent, block) {
      if (block.type === 'paragraph') appendText(parent, 'p', block.text);
      if (block.type === 'code') {
        const pre = document.createElement('pre');
        appendText(pre, 'code', block.text);
        parent.append(pre);
      }
      if (block.type === 'list') {
        const list = document.createElement(block.ordered ? 'ol' : 'ul');
        block.items.forEach(item => appendText(list, 'li', item));
        parent.append(list);
      }
      if (block.type === 'table') {
        const frame = document.createElement('div');
        frame.className = 'tw-table';
        frame.tabIndex = 0;
        const table = document.createElement('table');
        if (block.headers.length) {
          const head = table.createTHead().insertRow();
          block.headers.forEach(value => { appendText(head, 'th', value).scope = 'col'; });
        }
        const body = table.createTBody();
        block.rows.forEach(row => {
          const tr = body.insertRow();
          row.forEach(value => appendText(tr, 'td', value));
        });
        frame.append(table);
        parent.append(frame);
      }
    }

    function renderSources(parent, sources, label) {
      if (!sources.length) return;
      const footer = document.createElement('footer');
      appendText(footer, 'strong', label);
      const list = document.createElement('ul');
      sources.forEach(source => {
        const row = document.createElement('li');
        try {
          const url = source.url && new URL(source.url, location.href);
          if (url && ['https:', 'http:'].includes(url.protocol)) {
            const link = appendText(row, 'a', source.label || source.url);
            link.href = url.href;
            link.rel = 'noopener noreferrer';
            link.target = '_blank';
          } else appendText(row, 'span', source.label || source.url);
        } catch {
          appendText(row, 'span', source.label || source.url);
        }
        list.append(row);
      });
      footer.append(list);
      parent.append(footer);
    }

    async function clipboard(value) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch {
        const selection = document.createElement('textarea');
        selection.value = value;
        selection.className = 'tw-sr';
        shadow.append(selection);
        selection.select();
        let copied = false;
        try { copied = document.execCommand('copy'); } catch { /* No clipboard API. */ }
        selection.remove();
        return copied;
      }
    }

    function addCopy(message, value) {
      const button = appendText(message, 'button', tr('copy'));
      button.type = 'button';
      button.className = 'tw-quiet tw-copy';
      button.dataset.text = 'copy';
      button.onclick = async () => {
        $('.tw-copy-status').textContent = tr(await clipboard(value) ? 'copied' : 'copyError');
        button.focus();
      };
    }

    function answer(result) {
      const message = document.createElement('article');
      message.className = 'tw-message';
      message.lang = result.language || language();
      if (result.status === 'answer') {
        if (result.entries.length === 1 && result.entries[0].lang) message.lang = result.entries[0].lang;
        const sections = result.entries.map(entry => {
          const start = message.childElementCount;
          appendText(message, 'h3', entry.title);
          if (entry.content) appendText(message, 'p', entry.content);
          entry.blocks.forEach(block => renderBlock(message, block));
          const label = tr('sources', (entry.lang || message.lang).split('-')[0]);
          renderSources(message, entry.sources, label);
          if (entry.lang && entry.lang !== message.lang) {
            Array.from(message.children).slice(start).forEach(element => { element.lang = entry.lang; });
          }
          const sources = entry.sources.map(source => [source.label, source.url].filter(Boolean).join(' '));
          return [entry.title, entry.content, ...entry.blocks.map(engine.blockText),
            ...(sources.length ? [label + '\n' + sources.join('\n')] : [])].filter(Boolean).join('\n\n');
        });
        addCopy(message, sections.join('\n\n'));
      } else {
        if (result.status === 'unknown') appendText(message, 'h3', 'UNKNOWN');
        appendText(message, 'p', tr(result.status, message.lang));
        if (result.entries.length) {
          const list = document.createElement('ul');
          result.entries.forEach(entry => appendText(list, 'li', entry.title));
          message.append(list);
        }
      }
      thread.append(message);
      thread.scrollTop += message.getBoundingClientRect().top - thread.getBoundingClientRect().top - 12;
    }

    function fillEditor() {
      const record = entries.find(entry => entry.id === selector.value);
      for (const key of ['title','category','lang','content']) editor.elements[key].value = record?.[key] || '';
      editor.elements.keywords.value = record?.keywords.join(', ') || '';
      editor.elements.extra.value = record ? JSON.stringify({ blocks: record.blocks, sources: record.sources }, null, 2) : '';
    }

    function option(parent, value, label) {
      parent.add(new Option(label, value));
    }

    function refreshLibrary(category = filters.value, entryId = selector.value) {
      filters.replaceChildren();
      option(filters, '', tr('all'));
      [...new Set(entries.map(entry => entry.category).filter(Boolean))].sort().forEach(name => option(filters, name, name));
      filters.value = [...filters.options].some(item => item.value === category) ? category : '';
      selector.replaceChildren();
      option(selector, '', tr('new'));
      entries.filter(entry => !filters.value || filters.value === entry.category)
        .forEach(entry => option(selector, entry.id, entry.title + (entry.lang ? ' · ' + entry.lang : '')));
      selector.value = [...selector.options].some(item => item.value === entryId) ? entryId : '';
      fillEditor();
    }

    function saveChanges(updated, message) {
      updated.forEach(entry => changes.set(entry.id, entry));
      rebuildIndex();
      try {
        localStorage.setItem(storageKey, JSON.stringify([...changes.values()]));
        $('.tw-manager-status').textContent = tr(message);
      } catch {
        $('.tw-manager-status').textContent = tr('memory');
      }
    }

    $('.tw-form').addEventListener('submit', async event => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      const version = conversationVersion;
      hasConversation = true;
      const message = appendText(thread, 'p', question);
      message.className = 'tw-message tw-user';
      input.value = '';
      const send = $('.tw-form button');
      send.disabled = true;
      await ready;
      if (version === conversationVersion) {
        answer(index.length ? engine.findAnswer(index, question, language()) : { status: 'unavailable', entries: [] });
      }
      send.disabled = false;
      input.focus();
    });

    launcher.onclick = () => setOpen(true);
    action('close').onclick = () => setOpen(false);
    action('resize').onclick = () => setSize(panel.dataset.size === 'compact' ? 'normal' : 'expanded');
    action('shrink').onclick = () => setSize(panel.dataset.size === 'normal' ? 'compact' : 'normal');
    action('full').onclick = changeFull;
    action('clear').onclick = () => { resetThread(); input.focus(); };
    panel.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (panel.dataset.size === 'full') changeFull();
        else setOpen(false);
      }
    });

    if (editable) {
      action('manage').onclick = async () => {
        await ready;
        refreshLibrary();
        manager.showModal();
      };
      filters.onchange = () => refreshLibrary(filters.value, '');
      selector.onchange = fillEditor;
      editor.onsubmit = event => {
        event.preventDefault();
        try {
          const fields = editor.elements;
          const extra = fields.extra.value.trim() ? JSON.parse(fields.extra.value) : {};
          const record = engine.normalizeEntry({
            id: selector.value, title: fields.title.value, content: fields.content.value,
            category: fields.category.value, lang: fields.lang.value, keywords: fields.keywords.value.split(',').map(keyword => keyword.trim()),
            blocks: extra.blocks, sources: extra.sources,
          });
          saveChanges([record], 'saved');
          refreshLibrary(filters.value ? record.category : '', record.id);
        } catch {
          $('.tw-manager-status').textContent = tr('badEntry');
        }
      };
      action('import').onclick = () => upload.click();
      upload.onchange = async () => {
        if (!upload.files.length) return;
        try {
          const incoming = engine.parseKnowledge(JSON.parse(await upload.files[0].text()));
          saveChanges(incoming, 'imported');
          refreshLibrary();
        } catch {
          $('.tw-manager-status').textContent = tr('badImport');
        } finally {
          upload.value = '';
        }
      };
      action('export').onclick = () => {
        const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const download = document.createElement('a');
        download.href = url;
        download.download = 'knowledge.json';
        manager.append(download);
        download.click();
        download.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      };
    }

    localize();
    new MutationObserver(localize).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  start().catch(error => console.error(error.message));
})();
