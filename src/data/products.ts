import { Product } from '@/types/product';

// Import product images
import tshirtBlack from '@/assets/products/tshirt-black.jpg';
import pantsNavy from '@/assets/products/pants-navy.jpg';
import dressNude from '@/assets/products/dress-nude.jpg';
import poloWhite from '@/assets/products/polo-white.jpg';
import blouseBlack from '@/assets/products/blouse-black.jpg';
import shortsBlack from '@/assets/products/shorts-black.jpg';
import jacketBlack from '@/assets/products/jacket-black.jpg';
import leggingBlack from '@/assets/products/legging-black.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Camiseta Training Pro',
    price: 159,
    rating: 4.8,
    reviewCount: 342,
    category: 'camisetas',
    gender: 'unissex',
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Branco', hex: '#ffffff' },
      { name: 'Cinza', hex: '#6b6b6b' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [tshirtBlack, tshirtBlack, tshirtBlack, tshirtBlack],
    badge: 'best-seller',
    description: 'Camiseta esportiva desenvolvida com tecnologia de regulação térmica. Ideal para treinos e corridas.',
    benefits: ['Regulação térmica', 'Secagem rápida', 'Anti-odor', 'Toque ultra-macio'],
    composition: '92% Poliamida, 8% Elastano',
  },
  {
    id: '2',
    name: 'Jogger Performance',
    price: 289,
    rating: 4.9,
    reviewCount: 186,
    category: 'joggers',
    gender: 'masculino',
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Cinza', hex: '#6b6b6b' },
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    images: [pantsNavy, pantsNavy, pantsNavy, pantsNavy],
    badge: 'novo',
    description: 'Calça jogger com corte atlético e tecido inteligente que se adapta ao movimento.',
    benefits: ['Stretch 4 direções', 'Punhos ajustáveis', 'Secagem rápida', 'Bolsos com zíper'],
    composition: '88% Poliamida, 12% Elastano',
  },
  {
    id: '3',
    name: 'Cropped Hoodie Sport',
    price: 249,
    rating: 4.7,
    reviewCount: 98,
    category: 'moletons',
    gender: 'feminino',
    colors: [
      { name: 'Cinza', hex: '#6b6b6b' },
      { name: 'Preto', hex: '#1a1a1a' },
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    images: [dressNude, dressNude, dressNude, dressNude],
    badge: 'essencial',
    description: 'Moletom cropped com capuz para treinos e uso casual. Estilo athleisure moderno.',
    benefits: ['Tecido macio', 'Capuz ajustável', 'Corte cropped', 'Fácil de combinar'],
    composition: '80% Algodão, 20% Poliéster',
  },
  {
    id: '4',
    name: 'Regata Training',
    price: 119,
    rating: 4.8,
    reviewCount: 267,
    category: 'regatas',
    gender: 'unissex',
    colors: [
      { name: 'Branco', hex: '#ffffff' },
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Cinza', hex: '#6b6b6b' },
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    images: [poloWhite, poloWhite, poloWhite, poloWhite],
    description: 'Regata esportiva leve e respirável para treinos intensos.',
    benefits: ['Ultra-respirável', 'Proteção UV', 'Leve', 'Secagem instantânea'],
    composition: '90% Poliéster, 10% Elastano',
  },
  {
    id: '5',
    name: 'Top Esportivo Support',
    price: 149,
    rating: 4.9,
    reviewCount: 421,
    category: 'tops',
    gender: 'feminino',
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Cinza', hex: '#6b6b6b' },
    ],
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    images: [blouseBlack, blouseBlack, blouseBlack, blouseBlack],
    badge: 'best-seller',
    description: 'Top esportivo com suporte médio para treinos de alta intensidade.',
    benefits: ['Suporte médio', 'Alças ajustáveis', 'Sem marcas', 'Ultra-confortável'],
    composition: '80% Poliamida, 20% Elastano',
  },
  {
    id: '6',
    name: 'Short Training Pro',
    price: 139,
    rating: 4.6,
    reviewCount: 156,
    category: 'shorts',
    gender: 'unissex',
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Cinza', hex: '#6b6b6b' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [shortsBlack, shortsBlack, shortsBlack, shortsBlack],
    badge: 'novo',
    description: 'Short desenvolvido para alta performance e máximo conforto durante treinos.',
    benefits: ['Leveza extrema', 'Ventilação', 'Liberdade de movimento', 'Bolso interno'],
    composition: '100% Poliéster reciclado',
  },
  {
    id: '7',
    name: 'Jaqueta Urban Shield',
    price: 459,
    rating: 4.8,
    reviewCount: 89,
    category: 'jaquetas',
    gender: 'unissex',
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Verde Militar', hex: '#3d4a3a' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [jacketBlack, jacketBlack, jacketBlack, jacketBlack],
    badge: 'essencial',
    description: 'Jaqueta impermeável com design minimalista e proteção urbana.',
    benefits: ['Impermeável', 'Corta-vento', 'Respirável', 'Compactável'],
    composition: '100% Poliéster com membrana impermeável',
  },
  {
    id: '8',
    name: 'Legging Sculpt',
    price: 219,
    rating: 4.9,
    reviewCount: 534,
    category: 'leggings',
    gender: 'feminino',
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Grafite', hex: '#3d3d3d' },
      { name: 'Vinho', hex: '#5c2c35' },
    ],
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    images: [leggingBlack, leggingBlack, leggingBlack, leggingBlack],
    badge: 'best-seller',
    description: 'Legging de alta compressão com efeito modelador e suporte total.',
    benefits: ['Alta compressão', 'Efeito sculpt', 'Cintura alta', 'Não transparece'],
    composition: '78% Poliamida, 22% Elastano',
  },
];

export const categories = [
  'camisetas',
  'joggers',
  'moletons',
  'regatas',
  'tops',
  'shorts',
  'jaquetas',
  'leggings',
];

export const priceRanges = [
  { label: 'Até R$ 150', value: '0-150' },
  { label: 'R$ 150 - R$ 250', value: '150-250' },
  { label: 'R$ 250 - R$ 400', value: '250-400' },
  { label: 'Acima de R$ 400', value: '400-plus' },
];

export const genders = [
  { label: 'Masculino', value: 'masculino' },
  { label: 'Feminino', value: 'feminino' },
  { label: 'Unissex', value: 'unissex' },
];

export const colorOptions = [
  { name: 'Preto', hex: '#1a1a1a' },
  { name: 'Branco', hex: '#ffffff' },
  { name: 'Cinza', hex: '#6b6b6b' },
  { name: 'Azul', hex: '#1a2744' },
  { name: 'Verde', hex: '#3d4a3a' },
  { name: 'Nude', hex: '#d4b5a0' },
];

export const sizeOptions = ['PP', 'P', 'M', 'G', 'GG', 'XGG', '38', '40', '42', '44', '46'];
