/**
 * stats.js — Anima los contadores numéricos de la
 * sección "Sobre Ruth" cuando entran al viewport.
 * Usa IntersectionObserver para detectar el momento
 * y easing easeOutCubic para la animación.
 */

(function () {
  'use strict';

  const statsContainer = document.getElementById('statsContainer');
  if (!statsContainer) return;

  const statNumbers = statsContainer.querySelectorAll('.stat-number');

  // ── Función de animación del counter ─────────
  /**
   * Anima un número del 0 al target en `duration` ms.
   * @param {HTMLElement} el      - Elemento con el número
   * @param {number}      target  - Valor final
   * @param {string}      suffix  - Sufijo a mostrar ('+ años', '+', '%', etc.)
   * @param {number}      duration - Duración en ms
   */
  function animateCounter(el, target, suffix, duration = 1800) {
    const startTime = performance.now();

    // Easing ease-out cubic
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const current  = Math.round(eased * target);

      // Para el caso "2 + años", mostramos el número sin el sufijo durante la animación
      el.textContent = current + (progress >= 1 ? suffix : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ── IntersectionObserver ──────────────────────
  let animationStarted = false; // Ejecutar solo una vez

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;

          statNumbers.forEach((el) => {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            animateCounter(el, target, suffix);
          });

          // Dejar de observar tras la animación
          observer.unobserve(statsContainer);
        }
      });
    },
    { threshold: 0.4 } // Empieza cuando el 40% del container es visible
  );

  observer.observe(statsContainer);

})();
