import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { CartProvider } from '@/context/CartContext';
import ProductDetail from '@/pages/ProductDetail';

describe('fluxo de produto', () => {
  it('exige tamanho e adiciona a variante escolhida ao carrinho', async () => {
    render(
      <MemoryRouter initialEntries={['/produto/7']}>
        <CartProvider>
          <Routes><Route path="/produto/:id" element={<ProductDetail />} /></Routes>
        </CartProvider>
      </MemoryRouter>,
    );

    const addButton = screen.getByRole('button', { name: /adicionar à seleção/i });
    fireEvent.click(addButton);
    expect(screen.getByRole('alert')).toHaveTextContent('Selecione um tamanho');

    fireEvent.click(screen.getByRole('button', { name: 'M' }));
    fireEvent.click(addButton);

    const cart = await screen.findByRole('dialog', { name: 'Carrinho' });
    expect(within(cart).getByRole('heading', { name: 'Jaqueta Shield' })).toBeInTheDocument();
    expect(within(cart).getByText(/Preto tinta · M/)).toBeInTheDocument();
  });
});
