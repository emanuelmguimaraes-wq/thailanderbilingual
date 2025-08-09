document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const btnEN = document.getElementById('langEN');
  const btnPT = document.getElementById('langPT');

  // Back to top show/hide
  const onScroll = () => {
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Lightbox
  document.querySelectorAll('.menu-page img, .hero img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      if (typeof lightbox.showModal === 'function') lightbox.showModal();
      else lightbox.setAttribute('open','');
    });
  });
  const closeLb = () => lightbox.close();
  lightboxClose.addEventListener('click', closeLb);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.open) closeLb(); });

  // Year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // PWA registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js?v=rows2').catch(() => {});
  }

  // --- Language switcher ---
  const I18N = {
    en: {
      tab_reco: 'Recommendations',
      tab_starters: 'Starters',
      tab_mains: 'Mains',
      tab_desserts: 'Desserts',
      h2_reco: 'Recommendations',
      h2_starters: 'Starters',
      h2_mains: 'Mains',
      h2_desserts: 'Desserts',
      footer_viewonly: 'View-only menu',
      suffix: ''
    },
    pt: {
      tab_reco: 'Recomendações',
      tab_starters: 'Entradas',
      tab_mains: 'Pratos principais',
      tab_desserts: 'Sobremesas',
      h2_reco: 'Recomendações',
      h2_starters: 'Entradas',
      h2_mains: 'Pratos principais',
      h2_desserts: 'Sobremesas',
      footer_viewonly: 'Menu para consulta',
      suffix: '-pt'
    }
  };

  const applyLang = (lang) => {
    const dict = I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('img[data-img]').forEach(img => {
      const base = img.getAttribute('data-img');
      img.src = `./images/${base}${dict.suffix}.png`;
    });
    // button states
    btnEN.classList.toggle('active', lang === 'en');
    btnPT.classList.toggle('active', lang === 'pt');
    btnEN.setAttribute('aria-pressed', String(lang === 'en'));
    btnPT.setAttribute('aria-pressed', String(lang === 'pt'));
    localStorage.setItem('menu_lang', lang);
  };

  const current = localStorage.getItem('menu_lang') || 'en';
  applyLang(current);

  btnEN.addEventListener('click', () => applyLang('en'));
  btnPT.addEventListener('click', () => applyLang('pt'));
});
