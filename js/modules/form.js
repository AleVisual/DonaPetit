/**
 * form.js — Maneja el formulario de contacto.
 * Al enviar, construye un mensaje de WhatsApp
 * con los datos del formulario y lo abre en una
 * nueva pestaña. También muestra un toast de éxito.
 */

(function () {
  'use strict';

  const form     = document.getElementById('contactoForm');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (!form) return;

  // ── Toast helper ──────────────────────────────
  /**
   * Muestra un mensaje toast temporal
   * @param {string} message  - Texto a mostrar
   * @param {number} duration - Duración en ms
   */
  function showToast(message, duration = 3500) {
    // Crear toast si no existe
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // ── Validación simple ─────────────────────────
  /**
   * Valida los campos requeridos del formulario
   * @returns {boolean}
   */
  function validateForm() {
    const nombre   = form.elements['nombre'].value.trim();
    const whatsapp = form.elements['whatsapp'].value.trim();

    if (!nombre) {
      showToast('📝 Por favor ingresá tu nombre');
      form.elements['nombre'].focus();
      return false;
    }
    if (!whatsapp) {
      showToast('📱 Ingresá tu número de WhatsApp');
      form.elements['whatsapp'].focus();
      return false;
    }
    return true;
  }

  // ── Submit handler ─────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Recoger datos
    const nombre   = form.elements['nombre'].value.trim();
    const wa       = form.elements['whatsapp'].value.trim();
    const producto = form.elements['producto'].value || 'no especificado';
    const mensaje  = form.elements['mensaje'].value.trim();

    // Construir mensaje de WhatsApp
    let msgLines = [
      `Hola Ruth! 👋 Soy *${nombre}*`,
      `📱 Mi WhatsApp: ${wa}`,
      `🛒 Me interesa: *${producto}*`,
    ];
    if (mensaje) {
      msgLines.push(`💬 ${mensaje}`);
    }
    msgLines.push('¿Podés darme más información? ¡Gracias! 🍩');

    const fullMsg  = encodeURIComponent(msgLines.join('\n'));
    const waURL    = `https://wa.me/${WHATSAPP_NUMBER}?text=${fullMsg}`;

    // Cambiar el botón temporalmente
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Redirigiendo a WhatsApp...</span>';
    submitBtn.disabled  = true;

    // Abrir WhatsApp
    setTimeout(() => {
      window.open(waURL, '_blank', 'noopener,noreferrer');
      showToast('✅ ¡Listo! Te redirigimos a WhatsApp 🍩');

      // Restaurar botón y resetear formulario
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled  = false;
    }, 500);
  });

  // ── Efecto de foco en inputs ───────────────────
  // Visual feedback adicional al escribir
  const inputs = form.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });

})();
