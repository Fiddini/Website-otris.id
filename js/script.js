
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const root = document.documentElement;

  function updateHeaderHeight() {
    root.style.setProperty('--header-height', `${header.offsetHeight}px`);
  }

  updateHeaderHeight();
  new ResizeObserver(updateHeaderHeight).observe(header);

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
