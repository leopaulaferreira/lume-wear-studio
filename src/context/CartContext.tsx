import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, Product, ProductColor } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((
    product: Product,
    selectedColor: ProductColor,
    selectedSize: string,
    quantity: number = 1
  ) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedColor.hex === selectedColor.hex &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedColor, selectedSize, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, color: string, size: string) => {
    setItems(prev =>
      prev.filter(
        item =>
          !(item.product.id === productId &&
            item.selectedColor.hex === color &&
            item.selectedSize === size)
      )
    );
  }, []);

  const updateQuantity = useCallback((
    productId: string,
    color: string,
    size: string,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeItem(productId, color, size);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.product.id === productId &&
        item.selectedColor.hex === color &&
        item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
