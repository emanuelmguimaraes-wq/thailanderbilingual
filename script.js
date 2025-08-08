document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const langBtn = document.getElementById('langToggle');

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
  document.getElementById('year').textContent = new Date().getFullYear();

  // PWA registration (relative path)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js?v=lang1').catch(() => {});
  }

  // --- Language toggle (EN/PT) ---
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
      btn: 'PT',
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
      btn: 'EN',
      suffix: '-pt'
    }
  };

  const applyLang = (lang) => {
    const dict = I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    // swap images
    document.querySelectorAll('img[data-img]').forEach(img => {
      const base = img.getAttribute('data-img'); // e.g., "03"
      const suffix = dict.suffix; // '' for EN, '-pt' for PT
      img.src = `./images/${base}${suffix}.png`;
    });
    // update button label
    langBtn.textContent = dict.btn;
    // store
    localStorage.setItem('menu_lang', lang);
  };

  const current = localStorage.getItem('menu_lang') || 'en';
  applyLang(current);

  langBtn.addEventListener('click', () => {
    const next = (localStorage.getItem('menu_lang') || 'en') === 'en' ? 'pt' : 'en';
    applyLang(next);
  });
});
