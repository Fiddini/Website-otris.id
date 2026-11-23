
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;
  const root = document.documentElement;

  function updateHeaderHeight() {
    root.style.setProperty('--header-height', `${header.offsetHeight}px`);
  }

  updateHeaderHeight();
  new ResizeObserver(updateHeaderHeight).observe(header);

  const toggle = header.querySelector('.nav-toggle');
  const nav = header.querySelector('.main');

  if (toggle && nav) {
    function setMenuOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      if (!open) nav.querySelector('details[open]')?.removeAttribute('open');
    }

    toggle.hidden = false;
    toggle.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') === 'false'));
    window.matchMedia('(max-width: 820px)').addEventListener('change', () => setMenuOpen(false));

    document.addEventListener('click', event => {
      if (!header.contains(event.target)) {
        setMenuOpen(false);
        return;
      }

      const openGroup = nav.querySelector('details[open]');
      if (openGroup && !openGroup.contains(event.target)) openGroup.open = false;
    });

    header.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;

      const openGroup = nav.querySelector('details[open]');
      if (openGroup) {
        openGroup.open = false;
        openGroup.querySelector('summary').focus();
      } else if (toggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        toggle.focus();
      }
    });
  }

  const legacyLinks = [...header.querySelectorAll('a[data-legacy-fragment]')];
  if (!legacyLinks.length) return;

  function redirectLegacySection() {
    const fragment = window.location.hash.slice(1);
    const link = legacyLinks.find(anchor => anchor.dataset.legacyFragment === fragment);
    if (link) window.location.replace(link.href);
  }

  redirectLegacySection();
  window.addEventListener('hashchange', redirectLegacySection);
});
