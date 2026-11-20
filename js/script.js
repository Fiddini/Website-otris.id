
// VS Code friendly: no framework, plain JS
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links - all text/links are real <a>, so clickable
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if(id.length>1){
        const el = document.querySelector(id);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
      }
    });
  });
  // Active nav on scroll
  const sections = [...document.querySelectorAll('section[id]')];
  const links = [...document.querySelectorAll('nav.main a')];
  window.addEventListener('scroll', () => {
    let cur = 'home';
    sections.forEach(s => { if(window.scrollY >= s.offsetTop-120) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#'+cur));
  });
});
