/**
 * history.js — Maneja la rotación y el intercambio de imágenes
 * en la sección "Nuestra Historia".
 */

(function () {
  'use strict';

  const mainImg = document.getElementById('historiaImgMain');
  const secondaryWrap = document.getElementById('historiaImgSecondary');

  if (!mainImg || !secondaryWrap) return;

  const secondaryImg = secondaryWrap.querySelector('img');
  if (!secondaryImg) return;

  // Lista de imágenes disponibles para la rotación
  const historyImages = [
    { src: 'Presentación/dona2.jpg', alt: 'DonaPetit - Nuestras Donas' },
    { src: 'Presentación/waffle1.jpg', alt: 'DonaPetit - Waffles Artesanales' },
    { src: 'Presentación/ilustracion.png', alt: 'DonaPetit - Arte Dulce' },
    { src: 'Presentación/donassplash.jpg', alt: 'DonaPetit - Explosión de Sabor' }
  ];

  let currentIndex = 0;

  /**
   * Cambia las imágenes rotando a través de la lista historyImages.
   */
  function rotateHistoryImages() {
    // 1. Aplicar efecto de salida (fade + scale)
    mainImg.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    secondaryWrap.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    mainImg.style.opacity = '0';
    secondaryWrap.style.opacity = '0';
    secondaryWrap.style.transform = 'scale(0.8) rotate(10deg)';

    setTimeout(() => {
      // 2. Avanzar el índice
      currentIndex = (currentIndex + 1) % historyImages.length;
      const nextIndex = (currentIndex + 1) % historyImages.length;

      // 3. Asignar nuevos SRCs
      mainImg.src = historyImages[currentIndex].src;
      mainImg.alt = historyImages[currentIndex].alt;

      secondaryImg.src = historyImages[nextIndex].src;
      secondaryImg.alt = historyImages[nextIndex].alt;

      // 4. Aplicar efecto de entrada
      mainImg.style.opacity = '1';
      secondaryWrap.style.opacity = '1';
      secondaryWrap.style.transform = 'scale(1) rotate(0deg)';
    }, 600);
  }

  // Ejecutar el ciclo cada 10 segundos
  setInterval(rotateHistoryImages, 10000);

})();
