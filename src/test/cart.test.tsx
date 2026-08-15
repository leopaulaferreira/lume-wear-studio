import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartProvider, useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { CART_STORAGE_KEY } from '@/lib/cart';

function CartProbe() {
  const { items, totalItems, totalPrice, addItem, updateQuantity, removeItem } = useCart();
  const product = products[0];
  const color = product.colors[0];

  return (
    <div>
      <output aria-label="itens">{totalItems}</output>
      <output aria-label="total">{totalPrice}</output>
      <output aria-label="linhas">{items.length}</output>
      <button onClick={() => addItem(product, color, 'M', 2)}>Adicionar</button>
      <button onClick={() => updateQuantity(product.id, color.id, 'M', 99)}>Máximo</button>
      <button onClick={() => removeItem(product.id, color.id, 'M')}>Remover</button>
    </div>
  );
}

describe('carrinho', () => {
  it('adiciona, limita pelo estoque, persiste e remove a mesma variante', async () => {
    render(<CartProvider><CartProbe /></CartProvider>);

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));
    expect(screen.getByLabelText('itens')).toHaveTextContent('2');
    expect(screen.getByLabelText('total')).toHaveTextContent(String(products[0].price * 2));

    fireEvent.click(screen.getByRole('button', { name: 'Máximo' }));
    expect(screen.getByLabelText('itens')).toHaveTextContent(String(products[0].stockBySize.M));

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? '[]') as Array<{ quantity: number }>;
      expect(stored[0].quantity).toBe(products[0].stockBySize.M);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Remover' }));
    expect(screen.getByLabelText('linhas')).toHaveTextContent('0');
  });

  it('restaura uma seleção válida do armazenamento local', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([
      { productId: '8', colorId: 'graphite', size: 'P', quantity: 2 },
    ]));
    render(<CartProvider><CartProbe /></CartProvider>);
    expect(screen.getByLabelText('itens')).toHaveTextContent('2');
    expect(screen.getByLabelText('linhas')).toHaveTextContent('1');
  });
});
