/**
 * main.js — Script principal de DonaPetit
 * Orquesta:
 *   1. Lenis smooth scroll
 *   2. GSAP + ScrollTrigger para animaciones de scroll
 *   3. IntersectionObserver para reveals genéricos (fallback si GSAP no carga)
 *   4. Animaciones del Hero
 *
 * Depende de:
 *   - GSAP (cdnjs)
 *   - ScrollTrigger (plugin de GSAP)
 *   - Lenis (studio-freight)
 */

/* ─────────────────────────────────────────────────
   DETECCIÓN DE DISPOSITIVO
   ───────────────────────────────────────────────── */
const isTouchDevice = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  ('ontouchstart' in window) ||
  navigator.maxTouchPoints > 0;

/* ─────────────────────────────────────────────────
   1. LENIS — Scroll suave (solo desktop)
   En mobile/touch Lenis interfiere con el scroll
   táctil nativo aunque 'smoothTouch' esté en false.
   ───────────────────────────────────────────────── */
let lenis = null;

function initLenis() {
  // No iniciar Lenis en dispositivos táctiles
  if (isTouchDevice()) {
    console.info('DonaPetit: Dispositivo táctil detectado — usando scroll nativo.');
    return;
  }

  // Verificar que Lenis esté disponible (CDN cargado)
  if (typeof Lenis === 'undefined') {
    console.warn('DonaPetit: Lenis no cargado, usando scroll nativo.');
    return;
  }

  lenis = new Lenis({
    lerp: 0.12,
    wheelMultiplier: 1.4,
    smoothWheel: true,
    smoothTouch: false,
  });

  // Conectar Lenis con GSAP ticker para sincronización perfecta
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
  } else {
    // Fallback con requestAnimationFrame si GSAP no está
    function rafLoop(time) {
      lenis.raf(time);
      requestAnimationFrame(rafLoop);
    }
    requestAnimationFrame(rafLoop);
  }

  // Permitir que ScrollTrigger de GSAP conozca el scroll de Lenis
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
}

/* ─────────────────────────────────────────────────
   2. GSAP — Animaciones de scroll
   ───────────────────────────────────────────────── */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('DonaPetit: GSAP no disponible, usando CSS fallback.');
    return;
  }

  // Registrar plugin
  gsap.registerPlugin(ScrollTrigger);

  // ── HERO: Entrada con GSAP ──────────────────
  const heroTagline = document.querySelector('.js-hero-tagline');
  const heroBtn    = document.querySelector('.js-hero-btn');

  if (heroTagline && heroBtn) {
    const heroTl = gsap.timeline({ delay: 0.4 });

    heroTl
      .fromTo(heroTagline,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
      )
      .fromTo(heroBtn,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );
  }

  // ── SECCIÓN PROCESO: Texto aparece con scroll ─
  const procesoTitle = document.querySelector('.js-proceso-title');
  const procesoLabel = document.querySelector('.js-proceso-label');
  const procesoText  = document.querySelector('.js-proceso-text');

  if (procesoTitle) {
    gsap.fromTo(procesoLabel,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: {
          trigger: '.proceso',
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(procesoTitle,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.proceso',
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        delay: 0.15,
      }
    );

    gsap.fromTo(procesoText,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.proceso',
          start: 'top 55%',
          toggleActions: 'play none none none',
        },
        delay: 0.35,
      }
    );
  }

  // ── CARDS DE PRODUCTOS: Stagger reveal ────────
  // (Se activa cada vez que cambia el tab)
  function animateProductCards() {
    const activePanel = document.querySelector('.productos-grid:not([hidden])');
    if (!activePanel) return;

    const cards = activePanel.querySelectorAll('.producto-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    );
  }

  // Escuchar el evento de cambio de tab
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(animateProductCards, 80); // pequeño delay para que el panel sea visible
    });
  });
  // Animación inicial del panel de donas
  setTimeout(animateProductCards, 400);

  // ── NAVBAR: link activo con underline paralax ─
  // (ya manejado por navbar.js con IntersectionObserver)
}

/* ─────────────────────────────────────────────────
   3. IntersectionObserver GENÉRICO
   Para todos los elementos con clases js-reveal-*
   (Funciona con o sin GSAP como sistema de fallback)
   ───────────────────────────────────────────────── */
function initRevealObserver() {
  const revealEls = document.querySelectorAll(
    '.js-reveal-up, .js-reveal-left, .js-reveal-right'
  );

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Una sola vez
        }
      });
    },
    {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.08,
    }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────
   4. SMOOTH SCROLL para links de nav internos
   ───────────────────────────────────────────────── */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href    = link.getAttribute('href');
      const target  = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      if (lenis) {
        lenis.scrollTo(target, { offset: -70, duration: 1.4 }); // offset = navbar height (70px)
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ─────────────────────────────────────────────────
   5. LAZY LOAD FALLBACK
   Algunos navegadores antiguos no soportan loading="lazy"
   ───────────────────────────────────────────────── */
function initLazyFallback() {
  if ('loading' in HTMLImageElement.prototype) return; // Soporte nativo

  const images = document.querySelectorAll('img[loading="lazy"]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        io.unobserve(img);
      }
    });
  });
  images.forEach(img => io.observe(img));
}

/* ─────────────────────────────────────────────────
   6. BOTÓN VOLVER ARRIBA (Back to Top)
   Aparece después de hacer scroll de 600px
   ───────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id            = 'backToTop';
  btn.className     = 'back-to-top';
  btn.setAttribute('aria-label', 'Volver arriba');
  btn.innerHTML     = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;

  document.body.appendChild(btn);

  // Mostrar/ocultar con el scroll
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  // Evento click: Scroll suave al inicio
  btn.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ─────────────────────────────────────────────────
   INICIALIZACIÓN — Esperar a que el DOM esté listo
   ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Orden importa: Lenis primero para sincronizar con GSAP ticker
  initLenis();
  initGSAP();
  initRevealObserver();
  initSmoothLinks();
  initLazyFallback();
  initBackToTop();
  initMobileVideoOptimize();

  // Marcar el body como listo (por si algún CSS lo usa)
  document.body.classList.add('js-ready');
});

/* ─────────────────────────────────────────────────
   7. OPTIMIZACIÓN DE VIDEOS EN MOBILE
   En mobile se pausan los videos de fondo para
   reducir consumo de CPU/batería y mejorar el scroll.
   ───────────────────────────────────────────────── */
function initMobileVideoOptimize() {
  if (!isTouchDevice()) return;

  // Seleccionar videos de fondo (hero y proceso) — NO el modal
  const bgVideos = document.querySelectorAll('.hero-video, .proceso-video');

  bgVideos.forEach(video => {
    // Quitar autoplay y pausar
    video.removeAttribute('autoplay');
    video.pause();
    // Evitar que cargue datos innecesarios
    video.setAttribute('preload', 'none');
    // Mostrar poster como imagen estática
    video.load();
  });
}

/* ==============================================
   PROTECCIÓN BÁSICA DE CONTENIDO
   Evita clic derecho y arrastre en imágenes/videos
   ============================================== */
const initContentProtection = () => {
  // Desactivar clic derecho en imágenes y videos
  document.addEventListener('contextmenu', (e) => {
    const isProtected = e.target.tagName === 'IMG' || 
                        e.target.tagName === 'VIDEO' || 
                        e.target.closest('.video-wrapper') ||
                        e.target.closest('.producto-card') ||
                        e.target.closest('.galeria-item');
    
    if (isProtected) {
      e.preventDefault();
      return false;
    }
  }, false);

  // Desactivar arrastre de imágenes
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  }, false);
};

// Activar protección
initContentProtection();

/* ==============================================
   ADVERTENCIA DE CONSOLA (Deterrent)
   ============================================== */
console.log(
  "%c¡ALTO AHÍ! 🍩", 
  "color: #C2185B; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0px rgba(0,0,0,0.1); font-family: sans-serif;"
);
console.log(
  "%cEsta sección es solo para desarrolladores. El contenido visual, las fotos de los productos y el diseño de DonaPetit están totalmente protegidos por derechos de autor.",
  "color: #4E2B1E; font-size: 16px; font-style: italic; line-height: 1.5; font-family: sans-serif;"
);
console.log(
  "%cSi intentas robar nuestras fotos, una dona se pondrá triste... ¡Cerrá esta ventana y mejor pedite unas donas de verdad! 😉",
  "color: #7A5C4A; font-size: 14px; font-weight: 500; font-family: sans-serif;"
);
