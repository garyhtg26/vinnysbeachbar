(function () {
    var loader = document.getElementById('vb-loader');
    if (!loader) return;
  
    var TOTAL_MS = 6500; // 6.5s total
    var FADE_MS  = 1200; // 1.2s fade-out
  
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { TOTAL_MS = 800; FADE_MS = 400; }
  
    var prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
  
    setTimeout(function () {
      loader.classList.add('hide');
      setTimeout(function () {
        document.documentElement.style.overflow = prevOverflow || '';
      }, FADE_MS);
    }, TOTAL_MS - FADE_MS);
  
    setTimeout(function () {
      if (!loader.classList.contains('hide')) {
        loader.classList.add('hide');
        setTimeout(function(){ document.documentElement.style.overflow = prevOverflow || ''; }, FADE_MS);
      }
    }, TOTAL_MS + 50);
  })();




(() => {
  const btn = document.getElementById('menuBtn');
  const wrap = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mmOverlay');
  const panel = document.getElementById('mmPanel');
  const closeBtn = wrap?.querySelector('[data-close]');

  if (!btn || !wrap || !overlay || !panel) return;

  const open = () => {
    wrap.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');   // kunci scroll body
    // tunggu frame supaya transition jalan
    requestAnimationFrame(() => {
      overlay.classList.add('opacity-100');           // fade-in overlay
      panel.classList.remove('translate-x-full');     // slide-in panel
    });
  };

  const close = () => {
    overlay.classList.remove('opacity-100');          // fade-out overlay
    panel.classList.add('translate-x-full');          // slide-out panel
    // setelah animasi selesai, sembunyikan
    const onEnd = (e) => {
      if (e.propertyName !== 'transform') return;
      wrap.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      panel.removeEventListener('transitionend', onEnd);
    };
    panel.addEventListener('transitionend', onEnd);
  };

  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  // ESC to close
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // hormati reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    overlay.classList.remove('transition-opacity');
    panel.classList.remove('transition-transform');
  }
})();