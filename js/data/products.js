/**
 * products.js — Datos de los productos de DonaPetit
 * Cada categoría tiene un array de objetos con:
 *   { id, name, desc, img, badge }
 * badge es opcional. Si no se define, no se muestra.
 *
 * Las rutas de imagen son relativas al index.html
 */

const PRODUCTS = {

  /* ─────────────────────────────────────
     🍩 MINI DONAS
  ───────────────────────────────────── */
  donas: [
    {
      id: 'dona-1',
      name: 'Mini Dona Glaseada',
      desc: 'Donas esponjosas decoradas con glasé de colores y Granas de Colores.',
      img: 'MiniDonasWaffles/pro6.jpg',
      badge: '⭐ Más pedido',
    },
    {
      id: 'dona-2',
      name: 'Donas Glaseadas en Palitos',
      desc: 'Donas dobles glaseadas en palitos, perfectas para mesas de dulces y eventos.',
      img: 'MiniDonasWaffles/pro8.jpg',
      badge: '❤️ Favorito',
    },
    {
      id: 'dona-3',
      name: 'Donas Palitos',
      desc: 'Donas decoradas en palitos simples con coco, grana y chocolate.',
      img: 'MiniDonasWaffles/pro10.jpg',
      badge: '✨ Premium',
    },
    {
      id: 'dona-4',
      name: 'Donas Decoradas en Palitos',
      desc: 'Donas decoradas con glasé de colores y Granas de Colores.',
      img: 'MiniDonasWaffles/pro11.jpg',
    },
    {
      id: 'dona-5',
      name: 'Mini Donas Decoradas',
      desc: 'Donas decoradas en Vaso con glasé de colores y Granas de Colores.',
      img: 'MiniDonasWaffles/pro14.jpg',
    },
    {
      id: 'dona-6',
      name: 'Donas Rellenas',
      desc: 'Donas rellenas de dulce de leche, simples y Decoradas.',
      img: 'MiniDonasWaffles/pro16.jpg',
      badge: '✨Destacada',
    },
    {
      id: 'dona-7',
      name: 'Donas Glaseadas con Granas',
      desc: 'Donas glaseadas con grana de colores.',
      img: 'MiniDonasWaffles/deco1.jpg',
    },
    {
      id: 'dona-8',
      name: 'Caja de Donas Surtidas',
      desc: 'Mix surtidas, rellenas y decoradas. La sorpresa perfecta.',
      img: 'MiniDonasWaffles/deco2.jpg',
      badge: '❤️ Favorito',
    },
    {
      id: 'dona-9',
      name: 'Mix de 3 Donas en Palitos',
      desc: 'Decoradas con glasé de colores y Granas de Colores.',
      img: 'MiniDonasWaffles/deco3.jpg',
    },
    {
      id: 'dona-10',
      name: 'Donas Animadas',
      desc: 'Donas decoradas con motivos de personajes animados.',
      img: 'MiniDonasWaffles/Pro23.jpg',
      badge: '✨🐷Animadas',
    },
  ],

  /* ─────────────────────────────────────
     🧇 WAFFLES
  ───────────────────────────────────── */
  waffles: [
    {
      id: 'waffle-1',
      name: 'Waffle Clásico',
      desc: 'Simples para preparar a tu gusto.',
      img: 'MiniDonasWaffles/Waffles/Waffles1.jpg',
      badge: '⭐ Más pedido',
    },
    {
      id: 'waffle-2',
      name: 'Waffle con Helado',
      desc: 'Waffles con helado y toppings a elección.',
      img: 'MiniDonasWaffles/Waffles/WafflesDeco1.jpg',
      badge: 'Ilustartivo',
    },
    {
      id: 'waffle-3',
      name: 'Waffle con Chips de Chocolate',
      desc: 'Waffles con chips de chocolate y toppings a elección.',
      img: 'MiniDonasWaffles/Waffles/WafflesDeco2.jpg',
      badge: '🎉Ilustartivo',
    },
    {
      id: 'waffle-4',
      name: 'Mini Waffles simples',
      desc: 'Porciones individuales perfectas para mesas de dulces y eventos.',
      img: 'MiniDonasWaffles/Waffles/pro1.jpg',
      badge: '✨Clasico',
    },
  ],

  /* ─────────────────────────────────────
     🍫 CHOCOLATES
  ───────────────────────────────────── */
  chocolates: [
    {
      id: 'choco-1',
      name: 'Bombones de Corazón',
      desc: 'Rellenos artesanales. Ideales para regalar con amor.',
      img: 'ProductoChocolates/BomboncitosCorazon.jpg',
      badge: '❤️ Favorito',
    },
    {
      id: 'choco-2',
      name: 'Letras & Frases',
      desc: 'Palabras y frases personalizadas hechas en chocolate. Regalo único.',
      img: 'ProductoChocolates/FraceChocolate.jpg',
      badge: '⭐ Más pedido',
    },
    {
      id: 'choco-3',
      name: 'Ramo de 12 Rosas de Chocolate',
      desc: 'El regalo más romántico. 12 Rosas de chocolate blanco y negro.',
      img: 'ProductoChocolates/Ramos12Rosas.jpg',
      badge: '✨ Premium',
    },
    {
      id: 'choco-4',
      name: 'Caja de Regalo',
      desc: 'Mix de chocolates artesanales en caja temática presentada a tu gusto.',
      img: 'ProductoChocolates/CajaRegalo.jpg',
      badge: '✨ Destacado',
    },
    {
      id: 'choco-5',
      name: 'Zapato de Chocolate',
      desc: 'Zapato de chocolate con Decoración.',
      img: 'ProductoChocolates/ZapatoChocolate.jpg',
      badge: '✨ Nuevo',
    },
    {
      id: 'choco-6',
      name: 'Chupetín de Chocolate',
      desc: 'Figuras en palito, perfectas para souvenirs y mesas de dulces.',
      img: 'ProductoChocolates/Chupetin.jpg',
    },
    {
      id: 'choco-7',
      name: 'Bananita Bañada',
      desc: 'Clásico artesanal bañado en chocolate negro o blanco. Irresistible.',
      img: 'ProductoChocolates/BananitaChocolate.jpg',
      badge: '⭐ Más pedido',
    },
    {
      id: 'choco-8',
      name: 'Caja de Herramientas',
      desc: 'Regalo original para papá o el trabajador de la familia. ¡Lo va a amar!',
      img: 'ProductoChocolates/CajaHerramiena.jpg',
      badge: '🆕 Nuevo',
    },
    {
      id: 'choco-9',
      name: 'Botella Sorpresa',
      desc: 'Figura de botella de chocolate. Para momentos especiales.',
      img: 'ProductoChocolates/BotellaChocolate.jpg',
    },
    {
      id: 'choco-10',
      name: 'Copa Mundial',
      desc: 'Réplica de la Copa del Mundo en chocolate. Para los amantes del fútbol.',
      img: 'ProductoChocolates/CopaMundo2.jpg',
    },
    {
      id: 'choco-11',
      name: 'Figura de Conejito',
      desc: 'Perfecto para Pascua y cumpleaños infantiles. Hecho a mano con amor.',
      img: 'ProductoChocolates/conejito.jpg',
      badge: '❤️ Favorito',
    },
    {
      id: 'choco-12',
      name: 'Velita de Chocolate',
      desc: 'Figura de vela de cumpleaños en chocolate. Sorprendé con creatividad.',
      img: 'ProductoChocolates/VelaChocolate.jpg',
    },
  ],
};

/* Número de WhatsApp de DonaPetit (sin + ni espacios) */
const WHATSAPP_NUMBER = '5492284714673';

/**
 * Genera el link de WhatsApp con mensaje predefinido para un producto
 * @param {string} productName - Nombre del producto
 * @returns {string} URL de WhatsApp
 */
function getWhatsAppLink(productName) {
  const msg = encodeURIComponent(
    `Hola Ruth! Vi tu catálogo y me interesa: *${productName}* 🍩 ¿Podés darme más información, precios etc.?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}
