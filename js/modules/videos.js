/**
 * videos.js — Lógica para el modal de videos de DonaPetit.
 */

(function () {
  'use strict';

  const btnOpen      = document.getElementById('btnOpenVideos');
  const modal        = document.getElementById('videoModal');
  const btnClose     = document.getElementById('btnCloseVideos');
  const overlay      = document.getElementById('videoOverlay');
  const allVideos    = modal ? modal.querySelectorAll('video') : [];

  if (!btnOpen || !modal) return;

  /**
   * Abre el modal y pausa el scroll principal
   */
  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cierra el modal, pausa los videos y restaura el scroll
   */
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Pausar todos los videos al cerrar
    allVideos.forEach(v => {
      v.pause();
    });
  }

  // Eventos de apertura/cierre
  btnOpen.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (overlay)  overlay.addEventListener('click', closeModal);

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

})();
