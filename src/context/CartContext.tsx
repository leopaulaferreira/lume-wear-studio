import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getProductById } from '@/data/products';
import { CART_STORAGE_KEY, getCartItemKey } from '@/lib/cart';
import type { CartItem, Product, ProductColor } from '@/types/product';

interface StoredCartItem {
  productId: string;
  colorId: string;
  size: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  announcement: string;
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;
  addItem: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeItem: (productId: string, colorId: string, size: string) => void;
  updateQuantity: (productId: string, colorId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const hydrateCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as StoredCartItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((storedItem) => {
      const product = getProductById(storedItem.productId);
      const selectedColor = product?.colors.find((color) => color.id === storedItem.colorId);
      const stock = product?.stockBySize[storedItem.size] ?? 0;

      if (!product || !selectedColor || !product.sizes.includes(storedItem.size) || stock < 1) {
        return [];
      }

      return [
        {
          product,
          selectedColor,
          selectedSize: storedItem.size,
          quantity: Math.max(1, Math.min(storedItem.quantity, stock)),
        },
      ];
    });
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(hydrateCart);
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const serialized: StoredCartItem[] = items.map((item) => ({
      productId: item.product.id,
      colorId: item.selectedColor.id,
      size: item.selectedSize,
      quantity: item.quantity,
    }));
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serialized));
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const setCartOpen = useCallback((open: boolean) => setIsOpen(open), []);

  const addItem = useCallback(
    (product: Product, selectedColor: ProductColor, selectedSize: string, quantity = 1) => {
      const stock = product.stockBySize[selectedSize] ?? 0;
      if (stock < 1) {
        setAnnouncement(`${product.name} está indisponível no tamanho ${selectedSize}.`);
        return;
      }

      setItems((currentItems) => {
        const existing = currentItems.find(
          (item) =>
            item.product.id === product.id &&
            item.selectedColor.id === selectedColor.id &&
            item.selectedSize === selectedSize,
        );

        if (!existing) {
          return [
            ...currentItems,
            {
              product,
              selectedColor,
              selectedSize,
              quantity: Math.min(Math.max(1, quantity), stock),
            },
          ];
        }

        return currentItems.map((item) =>
          getCartItemKey(item) === getCartItemKey(existing)
            ? { ...item, quantity: Math.min(item.quantity + quantity, stock) }
            : item,
        );
      });

      setAnnouncement(`${product.name}, cor ${selectedColor.name}, tamanho ${selectedSize}, foi adicionado.`);
      setIsOpen(true);
    },
    [],
  );

  const removeItem = useCallback((productId: string, colorId: string, size: string) => {
    const removed = items.find(
      (item) =>
        item.product.id === productId &&
        item.selectedColor.id === colorId &&
        item.selectedSize === size,
    );
    setItems((currentItems) => {
      return currentItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor.id === colorId &&
            item.selectedSize === size
          ),
      );
    });
    if (removed) setAnnouncement(`${removed.product.name} foi removido do carrinho.`);
  }, [items]);

  const updateQuantity = useCallback(
    (productId: string, colorId: string, size: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId, colorId, size);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) => {
          const isTarget =
            item.product.id === productId &&
            item.selectedColor.id === colorId &&
            item.selectedSize === size;

          if (!isTarget) return item;
          const stock = item.product.stockBySize[size] ?? 1;
          return { ...item, quantity: Math.min(quantity, stock) };
        }),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setAnnouncement('Carrinho limpo.');
  }, []);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );
  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      announcement,
      openCart,
      closeCart,
      setCartOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [
      items,
      isOpen,
      announcement,
      openCart,
      closeCart,
      setCartOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart precisa ser usado dentro de CartProvider.');
  return context;
}
