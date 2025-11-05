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