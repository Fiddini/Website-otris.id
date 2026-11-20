
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const root = document.documentElement;
  const links = new Map([...header.querySelectorAll('nav.main a')].map(link => [link.hash, link]));
  const targets = [...document.querySelectorAll('main [id]')].filter(target => links.has(`#${target.id}`));

  function updateActiveLink() {
    const scrollPadding = parseFloat(getComputedStyle(root).scrollPaddingTop);
    const atPageEnd = window.scrollY + window.innerHeight >= root.scrollHeight - 1;
    const target = atPageEnd
      ? targets[targets.length - 1]
      : targets.findLast(section => section.getBoundingClientRect().top <= scrollPadding + 1) || targets[0];
    const activeLink = links.get(`#${target.id}`);

    for (const link of links.values()) {
      link.classList.toggle('active', link === activeLink);
      if (link === activeLink) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }

  function updateHeaderHeight() {
    root.style.setProperty('--header-height', `${header.offsetHeight}px`);
    updateActiveLink();
  }

  updateHeaderHeight();
  new ResizeObserver(updateHeaderHeight).observe(header);
  window.addEventListener('scroll', updateActiveLink, { passive: true });
});
