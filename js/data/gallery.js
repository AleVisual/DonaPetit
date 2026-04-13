/**
 * gallery.js — Datos de la galería de DonaPetit
 * Cada item de galería tiene:
 *   { id, img, name, category }
 * category: 'donas' | 'waffles' | 'chocolates'
 *
 * Las rutas son relativas al index.html
 */

const GALLERY_ITEMS = [
  // ── Donas ──
  { id: 'g-dona-1', img: 'MiniDonasWaffles/pro6.jpg', name: 'Mini Donas Glaseadas', category: 'donas' },
  { id: 'g-dona-2', img: 'MiniDonasWaffles/pro8.jpg', name: 'Donas Temáticas', category: 'donas' },
  { id: 'g-dona-3', img: 'MiniDonasWaffles/pro10.jpg', name: 'Donas Premium', category: 'donas' },
  { id: 'g-dona-4', img: 'MiniDonasWaffles/pro11.jpg', name: 'Diseños con Fondant', category: 'donas' },
  { id: 'g-dona-5', img: 'MiniDonasWaffles/pro14.jpg', name: 'Mini Donas Dulces', category: 'donas' },
  { id: 'g-dona-6', img: 'MiniDonasWaffles/pro16.jpg', name: 'Donas de Temporada', category: 'donas' },
  { id: 'g-dona-7', img: 'MiniDonasWaffles/deco1.jpg', name: 'Arte en Donas', category: 'donas' },
  { id: 'g-dona-8', img: 'MiniDonasWaffles/deco2.jpg', name: 'Caja Surtida', category: 'donas' },
  { id: 'g-dona-9', img: 'MiniDonasWaffles/deco3.jpg', name: 'Donas Floreadas', category: 'donas' },
  { id: 'g-dona-10', img: 'MiniDonasWaffles/Pro20.jpg', name: 'Colores Vibrantes', category: 'donas' },
  { id: 'g-dona-11', img: 'MiniDonasWaffles/Pro22.jpg', name: 'Donas para Eventos', category: 'donas' },
  { id: 'g-dona-12', img: 'MiniDonasWaffles/Pro23.jpg', name: 'Donas Animadas', category: 'donas' },
  { id: 'g-dona-13', img: 'MiniDonasWaffles/Pro24.jpg', name: 'Variedad de Sabores', category: 'donas' },
  { id: 'g-dona-14', img: 'MiniDonasWaffles/pro15.jpg', name: 'Pedidos Especiales', category: 'donas' },
  { id: 'g-dona-15', img: 'MiniDonasWaffles/pro17.jpg', name: 'Mesa de Dulces', category: 'donas' },
  { id: 'g-dona-16', img: 'MiniDonasWaffles/Pro25.jpg', name: 'Donas Decoradas', category: 'donas' },

  // ── Waffles ──
  { id: 'g-waffle-1', img: 'MiniDonasWaffles/Waffles/Waffles1.jpg', name: 'Waffle Clásico', category: 'waffles' },
  { id: 'g-waffle-2', img: 'MiniDonasWaffles/Waffles/WafflesDeco1.jpg', name: 'Waffle con Frutas', category: 'waffles' },
  { id: 'g-waffle-3', img: 'MiniDonasWaffles/Waffles/WafflesDeco2.jpg', name: 'Waffle con Chips de Chocolate', category: 'waffles' },
  { id: 'g-waffle-4', img: 'MiniDonasWaffles/Waffles/pro1.jpg', name: 'Mini Waffles', category: 'waffles' },

  // ── Chocolates ──
  { id: 'g-choco-1', img: 'ProductoChocolates/Ramos12Rosas.jpg', name: 'Ramo de 12 Rosas', category: 'chocolates' },
  { id: 'g-choco-2', img: 'ProductoChocolates/RamosRosas.jpg', name: 'Ramo de Rosas', category: 'chocolates' },
  { id: 'g-choco-3', img: 'ProductoChocolates/ChocoFraces.jpg', name: 'Frases en Chocolate', category: 'chocolates' },
  { id: 'g-choco-4', img: 'ProductoChocolates/FracesRellenas.jpg', name: 'Letras Rellenas', category: 'chocolates' },
  { id: 'g-choco-5', img: 'ProductoChocolates/CajadeRosaChocolate.jpg', name: 'Caja de Rosas', category: 'chocolates' },
  { id: 'g-choco-6', img: 'ProductoChocolates/JoysticChocolate.jpg', name: 'Joystick de Chocolate', category: 'chocolates' },
  { id: 'g-choco-7', img: 'ProductoChocolates/EscudoBocaRiver.jpg', name: 'Escudo Boca / River', category: 'chocolates' },
  { id: 'g-choco-8', img: 'ProductoChocolates/Botin2.jpg', name: 'Botín de Fútbol', category: 'chocolates' },
  { id: 'g-choco-9', img: 'ProductoChocolates/CajaHerramiena.jpg', name: 'Caja de Herramientas', category: 'chocolates' },
  { id: 'g-choco-10', img: 'ProductoChocolates/BananitaChocolate.jpg', name: 'Bananita Bañada', category: 'chocolates' },
  { id: 'g-choco-11', img: 'ProductoChocolates/BotellaChocolate.jpg', name: 'Botella de Chocolate', category: 'chocolates' },
  { id: 'g-choco-12', img: 'ProductoChocolates/CopaMundial.jpg', name: 'Copa del Mundo', category: 'chocolates' },
  { id: 'g-choco-13', img: 'ProductoChocolates/conejito.jpg', name: 'Conejito de Pascua', category: 'chocolates' },
  { id: 'g-choco-14', img: 'ProductoChocolates/VelaChocolate.jpg', name: 'Vela de Cumpleaños', category: 'chocolates' },
  { id: 'g-choco-15', img: 'ProductoChocolates/ZapatoChocolate.jpg', name: 'Zapato de Chocolate', category: 'chocolates' },
  { id: 'g-choco-16', img: 'ProductoChocolates/BomboncitosCorazon.jpg', name: 'Bombones Corazón', category: 'chocolates' },
  { id: 'g-choco-17', img: 'ProductoChocolates/Tabletas de Chocolates.jpg', name: 'Tabletas de Chocolate', category: 'chocolates' },
  { id: 'g-choco-18', img: 'ProductoChocolates/PelotasVarias.jpg', name: 'Pelotas de Deporte', category: 'chocolates' },
  { id: 'g-choco-19', img: 'ProductoChocolates/CajadeChocolate.jpg', name: 'Caja Variada', category: 'chocolates' },
  { id: 'g-choco-20', img: 'ProductoChocolates/CorazonChocolate.jpg', name: 'Corazón Gigante', category: 'chocolates' },
  { id: 'g-choco-21', img: 'ProductoChocolates/Mate.jpg', name: 'Mate de Chocolate', category: 'chocolates' },
  { id: 'g-choco-22', img: 'ProductoChocolates/OrioBañada.jpg', name: 'Oreo Bañada', category: 'chocolates' },
  { id: 'g-choco-23', img: 'ProductoChocolates/Rosa.jpg', name: 'Rosa Individual', category: 'chocolates' },
  { id: 'g-choco-24', img: 'ProductoChocolates/FelizCumple.jpg', name: 'Letras Feliz Cumple', category: 'chocolates' },
  { id: 'g-choco-25', img: 'ProductoChocolates/MedallonMentita.jpg', name: 'Medallones de Menta', category: 'chocolates' },
  { id: 'g-choco-26', img: 'ProductoChocolates/VelaColor.jpg', name: 'Vela Decorada', category: 'chocolates' },
  { id: 'g-choco-27', img: 'ProductoChocolates/BarraRellena.jpg', name: 'Barra Rellena', category: 'chocolates' },
];
