/**
 * navbar.js — Lógica de la barra de navegación.
 * Maneja:
 *   - Efecto scroll: transparente → sólido
 *   - Menú hamburguesa en mobile
 *   - Cierre del menú al hacer click en un link
 *   - Active link según la sección visible
 */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');

  // Logo Bubble
  const navLogo = document.getElementById('navLogo');
  const logoBubble = document.getElementById('logoBubble');
  const bubbleText = logoBubble ? logoBubble.querySelector('.nav-logo-text') : null;

  const brandPhrases = [
    "Diseñando tus antojos en donas, waffles y chocolate.",
    "El arte de endulzar tus días en todas sus formas.",
    "Un universo de sabores en formatos irresistibles.",
    "Pequeños bocados, grandes momentos de dulzura.",
    "Magia en miniatura: donas, waffles y chocolates hechos con amor.",
    "Donde el chocolate toma forma y el sabor se hace miniatura.",
    "Dulzura con diseño.",
    "Mini delicias, máximo sabor.",
    "Tu dosis diaria de formas dulces."
  ];
  let currentPhraseIndex = 0;

  // ── Estado del scroll ──────────────────────────
  let lastScrollY = 0;
  let ticking = false;

  /**
   * Aplica estado "scrolled" al navbar cuando
   * el usuario baja más de 60px
   */
  function updateNavbar() {
    const scrollY = window.scrollY;
    const isScrolled = scrollY > 60;

    if (isScrolled !== navbar.classList.contains('scrolled')) {
      navbar.classList.toggle('scrolled', isScrolled);
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  // Usar requestAnimationFrame para performance
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  // Inicializar al cargar
  updateNavbar();

  // ── Menú Hamburguesa ───────────────────────────
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));

    // Bloquear scroll del body mientras el menú está abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cerrar menú al hacer click en un link
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  let bubbleTimeout;

  // ── Burbuja del Logo ───────────────────────────
  if (navLogo && logoBubble) {
    navLogo.addEventListener('click', (e) => {
      // Importante: evitamos que se dispare el scroll suave de main.js
      e.stopImmediatePropagation();
      e.preventDefault();

      // Solo funciona si el navbar ya está en modo "scrolled" (logo visible)
      if (!navbar.classList.contains('scrolled')) return;

      // Limpiar timeout anterior si existe
      if (bubbleTimeout) clearTimeout(bubbleTimeout);

      const isVisible = logoBubble.classList.toggle('visible');

      if (isVisible) {
        // Cambiar a la siguiente frase
        currentPhraseIndex = (currentPhraseIndex + 1) % brandPhrases.length;
        if (bubbleText) {
          bubbleText.textContent = brandPhrases[currentPhraseIndex];
        }

        // Auto-cerrar después de 15 segundos
        bubbleTimeout = setTimeout(() => {
          logoBubble.classList.remove('visible');
        }, 10000);
      }
    });
  }

  // Cerrar burbuja al hacer click fuera de él
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    // Cerrar burbuja también si se clickea fuera
    if (logoBubble && logoBubble.classList.contains('visible') && !navLogo.contains(e.target)) {
      logoBubble.classList.remove('visible');
    }
  });

  // ── Active link por sección visible ───────────
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          allNavLinks.forEach(link => {
            const hrefAttr = link.getAttribute('href');
            if (hrefAttr) {
              const href = hrefAttr.replace('#', '');
              link.classList.toggle('active', href === sectionId);
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
  );

  sections.forEach(section => sectionObserver.observe(section));

})();
