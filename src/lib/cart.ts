import type { CartItem } from '@/types/product';

export const FREE_SHIPPING_THRESHOLD = 499;
export const CART_STORAGE_KEY = 'lume-wear-cart-v2';

export const getCartItemKey = (item: CartItem) =>
  `${item.product.id}-${item.selectedColor.id}-${item.selectedSize}`;
