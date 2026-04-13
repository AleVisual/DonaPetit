/**
 * lightbox.js — Viewer fullscreen de imágenes de galería.
 * Completamente nativo (sin librerías externas).
 * Escucha el evento personalizado 'openLightbox' emitido
 * por gallery.js con los datos de las imágenes.
 * Soporta: teclado, clic fuera, swipe touch.
 */

(function () {
  'use strict';

  // ── Referencias al DOM ──────────────────────
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxCapt  = document.getElementById('lightboxCaption');
  const closeBtn      = document.getElementById('lightboxClose');
  const prevBtn       = document.getElementById('lightboxPrev');
  const nextBtn       = document.getElementById('lightboxNext');

  // ── Estado ───────────────────────────────────
  let images        = [];   // Array { src, name }
  let currentIndex  = 0;
  let touchStartX   = 0;    // Para swipe touch

  // ── Abrir lightbox ────────────────────────────
  /**
   * Abre el lightbox con las imágenes dadas
   * @param {Array} imgs  - [ { src, name }, ... ]
   * @param {number} idx  - Índice inicial
   */
  function openLightbox(imgs, idx) {
    images       = imgs;
    currentIndex = idx;
    showImage(currentIndex);

    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Foco accesible en el botón de cierre
    closeBtn.focus();
  }

  // ── Cerrar ────────────────────────────────────
  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  // ── Mostrar imagen por índice ─────────────────
  function showImage(idx) {
    if (!images.length) return;
    // Clamp circular
    currentIndex = (idx + images.length) % images.length;
    const img = images[currentIndex];

    // Animación: fade out/in
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.96)';

    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.name + ' — DonaPetit';
      lightboxCapt.textContent = img.name;
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }, 150);

    lightboxImg.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
  }

  function showNext() { showImage(currentIndex + 1); }
  function showPrev() { showImage(currentIndex - 1); }

  // ── Eventos del lightbox ──────────────────────

  // Botones de control
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Clic en el overlay (fuera del contenido) cierra el lightbox
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (lightbox.hasAttribute('hidden')) return;
    switch (e.key) {
      case 'Escape':    closeLightbox(); break;
      case 'ArrowRight': showNext();    break;
      case 'ArrowLeft':  showPrev();    break;
    }
  });

  // Touch swipe para mobile
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? showNext() : showPrev();
    }
  }, { passive: true });

  // ── Escuchar evento del gallery.js ───────────
  document.addEventListener('openLightbox', (e) => {
    const { images: imgs, index } = e.detail;
    openLightbox(imgs, index);
  });

})();
