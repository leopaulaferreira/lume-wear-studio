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
    name: 'Camiseta Tech Essential',
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
    description: 'Camiseta desenvolvida com tecnologia de regulação térmica. Ideal para o dia a dia com máximo conforto.',
    benefits: ['Regulação térmica', 'Secagem rápida', 'Anti-odor', 'Toque ultra-macio'],
    composition: '92% Poliamida, 8% Elastano',
  },
  {
    id: '2',
    name: 'Calça Performance Slim',
    price: 289,
    rating: 4.9,
    reviewCount: 186,
    category: 'calcas',
    gender: 'masculino',
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Azul Marinho', hex: '#1a2744' },
    ],
    sizes: ['38', '40', '42', '44', '46'],
    images: [pantsNavy, pantsNavy, pantsNavy, pantsNavy],
    badge: 'novo',
    description: 'Calça com corte slim e tecido inteligente que se adapta ao movimento.',
    benefits: ['Stretch 4 direções', 'Não amassa', 'Secagem rápida', 'Bolsos seguros'],
    composition: '88% Poliamida, 12% Elastano',
  },
  {
    id: '3',
    name: 'Vestido Fluido Atemporal',
    price: 349,
    rating: 4.7,
    reviewCount: 98,
    category: 'vestidos',
    gender: 'feminino',
    colors: [
      { name: 'Nude', hex: '#d4b5a0' },
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Verde Oliva', hex: '#4a5240' },
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    images: [dressNude, dressNude, dressNude, dressNude],
    badge: 'essencial',
    description: 'Vestido com caimento fluido e elegância atemporal. Perfeito para qualquer ocasião.',
    benefits: ['Caimento perfeito', 'Tecido respirável', 'Não marca', 'Fácil de cuidar'],
    composition: '95% Viscose, 5% Elastano',
  },
  {
    id: '4',
    name: 'Polo Tech Premium',
    price: 199,
    rating: 4.8,
    reviewCount: 267,
    category: 'polos',
    gender: 'masculino',
    colors: [
      { name: 'Branco', hex: '#ffffff' },
      { name: 'Azul Claro', hex: '#a8c5d9' },
      { name: 'Preto', hex: '#1a1a1a' },
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    images: [poloWhite, poloWhite, poloWhite, poloWhite],
    description: 'Polo com tecnologia anti-transpirante e acabamento premium.',
    benefits: ['Anti-transpirante', 'Proteção UV', 'Resistente', 'Conforto térmico'],
    composition: '90% Poliéster, 10% Elastano',
  },
  {
    id: '5',
    name: 'Blusa Segunda Pele',
    price: 179,
    rating: 4.9,
    reviewCount: 421,
    category: 'blusas',
    gender: 'feminino',
    colors: [
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Nude', hex: '#d4b5a0' },
      { name: 'Branco', hex: '#ffffff' },
    ],
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    images: [blouseBlack, blouseBlack, blouseBlack, blouseBlack],
    badge: 'best-seller',
    description: 'Blusa com sensação de segunda pele. Invisível sob qualquer roupa.',
    benefits: ['Seamless', 'Modelagem perfeita', 'Sem marcas', 'Ultra-leve'],
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
  'calcas',
  'vestidos',
  'polos',
  'blusas',
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
