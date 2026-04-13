/**
 * gallery.js — Renderiza la galería masonry y maneja
 * el filtrado por categoría usando IntersectionObserver
 * para los reveals y el lightbox nativo (en lightbox.js).
 * Lee los datos desde GALLERY_ITEMS (js/data/gallery.js)
 */

(function () {
  'use strict';

  const galeriaGrid  = document.getElementById('galeriaGrid');
  const filterBtns   = document.querySelectorAll('.filter-btn');

  // Estado actual del filtro
  let currentFilter = 'all';
  // Items actuales del DOM (para el lightbox)
  let visibleItems  = [];

  // ── Renderizado ──────────────────────────────
  /**
   * Crea el HTML de un item de galería
   * @param {Object} item - Objeto del item
   * @param {number} index - Índice para delay de animación
   * @returns {string} HTML del item
   */
  function createGalleryItem(item, index) {
    return `
      <div
        class="galeria-item"
        data-id="${item.id}"
        data-category="${item.category}"
        data-index="${index}"
        role="listitem"
        tabindex="0"
        aria-label="Ver imagen: ${item.name}"
        style="animation-delay: ${index * 0.05}s"
      >
        <img
          src="${item.img}"
          alt="${item.name} — DonaPetit"
          class="galeria-item-img"
          loading="lazy"
        />
        <div class="galeria-item-overlay" aria-hidden="true">
          <span class="galeria-item-name">${item.name}</span>
        </div>
      </div>
    `;
  }

  // Renderizar todos los items
  galeriaGrid.innerHTML = GALLERY_ITEMS.map(createGalleryItem).join('');

  // ── Filtrado ──────────────────────────────────
  /**
   * Filtra los items por categoría.
   * "all" muestra todos.
   * @param {string} filter - 'all' | 'donas' | 'waffles' | 'chocolates'
   */
  function applyFilter(filter) {
    currentFilter = filter;
    visibleItems  = [];

    const items = galeriaGrid.querySelectorAll('.galeria-item');

    items.forEach((item, i) => {
      const cat     = item.dataset.category;
      const matches = filter === 'all' || cat === filter;

      if (matches) {
        item.classList.remove('hidden', 'filtered-out');
        // Animar entrada escalonada
        item.style.transitionDelay = `${i * 0.04}s`;
        visibleItems.push(item);
      } else {
        item.classList.add('filtered-out');
        item.style.transitionDelay = '0s';
      }
    });

    // Actualizar índices para lightbox
    visibleItems.forEach((el, i) => {
      el.dataset.visibleIndex = i;
    });
  }

  // Botones de filtro
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // ── Apertura del Lightbox ─────────────────────
  /**
   * Delega el click en cualquier item de la galería
   * al módulo lightbox (lightbox.js).
   */
  galeriaGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.galeria-item');
    if (!item) return;

    const visibleIndex = parseInt(item.dataset.visibleIndex ?? item.dataset.index, 10);
    // Obtener array de items visibles para el lightbox
    const images = visibleItems.map(el => ({
      src:  el.querySelector('.galeria-item-img').src,
      name: el.querySelector('.galeria-item-name').textContent,
    }));

    // Disparar evento personalizado para el lightbox
    document.dispatchEvent(new CustomEvent('openLightbox', {
      detail: { images, index: visibleIndex },
    }));
  });

  // Soporte de teclado en los items
  galeriaGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const item = e.target.closest('.galeria-item');
      if (item) item.click();
    }
  });

  // Inicializar con "todos"
  applyFilter('all');

  // ── IntersectionObserver para reveals ─────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  // Observar items de galería
  galeriaGrid.querySelectorAll('.galeria-item').forEach(el => {
    el.classList.add('js-reveal-up');
    revealObserver.observe(el);
  });

})();
