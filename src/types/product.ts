export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  gender: 'masculino' | 'feminino' | 'unissex';
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  badge?: 'best-seller' | 'novo' | 'essencial';
  description: string;
  benefits: string[];
  composition: string;
  isNew?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  priceRange: string[];
  categories: string[];
  genders: string[];
  colors: string[];
  sizes: string[];
}
