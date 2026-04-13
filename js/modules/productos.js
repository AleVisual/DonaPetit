/**
 * productos.js — Renderiza las tarjetas de productos
 * en los tres paneles de tabs (donas, waffles, chocolates).
 * Lee los datos desde PRODUCTS (js/data/products.js)
 * y genera el HTML dinámicamente.
 */

(function () {
  'use strict';

  // ── Referencia a los paneles y tabs ───────────
  const panels = {
    donas:      document.getElementById('panel-donas'),
    waffles:    document.getElementById('panel-waffles'),
    chocolates: document.getElementById('panel-chocolates'),
  };

  const tabBtns = document.querySelectorAll('.tab-btn');

  // ── Renderizado ──────────────────────────────
  /**
   * Crea el HTML de una tarjeta de producto
   * @param {Object} product - Objeto del producto
   * @returns {string} HTML de la card
   */
  function createProductCard(product) {
    const badgeHTML = product.badge
      ? `<span class="producto-badge">${product.badge}</span>`
      : '';

    const waLink = getWhatsAppLink(product.name);

    return `
      <article class="producto-card js-reveal-up" aria-label="Producto: ${product.name}">
        <div class="producto-card-img-wrap">
          <img
            src="${product.img}"
            alt="${product.name} - DonaPetit"
            class="producto-card-img"
            loading="lazy"
          />
          ${badgeHTML}
        </div>
        <div class="producto-card-body">
          <h3 class="producto-card-name">${product.name}</h3>
          <p class="producto-card-desc">${product.desc}</p>
          <div class="producto-card-footer">
            <a
              href="${waLink}"
              class="btn btn-producto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pedir ${product.name} por WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Inyecta las cards en un panel
   * @param {HTMLElement} panelEl - Elemento del panel
   * @param {Array} products - Array de productos
   */
  function renderPanel(panelEl, products) {
    if (!panelEl) return;
    panelEl.innerHTML = products.map(createProductCard).join('');
  }

  // Renderizar todas las categorías
  renderPanel(panels.donas,      PRODUCTS.donas);
  renderPanel(panels.waffles,    PRODUCTS.waffles);
  renderPanel(panels.chocolates, PRODUCTS.chocolates);

  // ── Sistema de Tabs ───────────────────────────
  /**
   * Activa un tab y muestra el panel correspondiente
   * @param {string} category - 'donas' | 'waffles' | 'chocolates'
   */
  function activateTab(category) {
    // Actualizar botones
    tabBtns.forEach(btn => {
      const isActive = btn.dataset.category === category;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    // Mostrar/ocultar paneles con animación
    Object.entries(panels).forEach(([cat, panel]) => {
      if (!panel) return;
      if (cat === category) {
        panel.removeAttribute('hidden');
        // Trigger de animación: pequeño delay para que el browser la procese
        requestAnimationFrame(() => {
          panel.classList.add('panel-entering');
          // Remover clase tras la animación
          panel.addEventListener('animationend', () => {
            panel.classList.remove('panel-entering');
          }, { once: true });
        });
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  // Event listeners en los tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.category);
    });

    // Soporte de teclado para accesibilidad
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(btn.dataset.category);
      }
    });
  });

  // Inicializar con la primera pestaña
  activateTab('donas');

})();
