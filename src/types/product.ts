export type ProductGender = 'masculino' | 'feminino' | 'unissex';

export type ProductCategory =
  | 'camisetas'
  | 'calcas'
  | 'moletons'
  | 'regatas'
  | 'tops'
  | 'shorts'
  | 'jaquetas'
  | 'leggings';

export type ProductBadge = 'best-seller' | 'novo' | 'essencial';

export type ProductActivity = 'run' | 'train' | 'transit';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  position?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: ProductCategory;
  gender: ProductGender;
  activities: ProductActivity[];
  colors: ProductColor[];
  sizes: string[];
  stockBySize: Record<string, number>;
  images: ProductImage[];
  badge?: ProductBadge;
  description: string;
  benefits: string[];
  composition: string;
  care: string;
  fit: string;
  relatedIds: string[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export type PriceRangeId = '0-200' | '200-300' | '300-450' | '450-plus';

export interface FilterState {
  priceRanges: PriceRangeId[];
  categories: ProductCategory[];
  genders: ProductGender[];
  colors: string[];
  sizes: string[];
}

export type CatalogSort = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterOption<T extends string> {
  label: string;
  value: T;
}
