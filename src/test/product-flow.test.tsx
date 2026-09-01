import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { CartProvider } from '@/context/CartContext';
import { products } from '@/data/products';
import ProductDetail from '@/pages/ProductDetail';

describe('fluxo de produto', () => {
  it('troca e reinicia a galeria ao selecionar outra cor', () => {
    render(
      <MemoryRouter initialEntries={['/produto/7']}>
        <CartProvider>
          <Routes><Route path="/produto/:id" element={<ProductDetail />} /></Routes>
        </CartProvider>
      </MemoryRouter>,
    );

    const mainImage = screen.getByTestId('product-gallery-main-image');
    const initialSrc = mainImage.getAttribute('src');

    fireEvent.click(screen.getAllByRole('button', { name: 'Próxima imagem' })[0]);
    expect(screen.getByTestId('product-gallery-main-image').getAttribute('src')).not.toBe(initialSrc);

    fireEvent.click(screen.getByRole('button', { name: 'Oliva mineral' }));
    expect(screen.getByTestId('product-gallery-main-image').getAttribute('src')).toBe(
      products[6].variants[1].images[0].src,
    );
    expect(screen.getByRole('button', { name: 'Oliva mineral' })).toHaveAttribute('aria-pressed', 'true');
  });

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

    fireEvent.click(screen.getByRole('button', { name: 'Oliva mineral' }));
    fireEvent.click(screen.getByRole('button', { name: 'M' }));
    fireEvent.click(addButton);

    const cart = await screen.findByRole('dialog', { name: 'Carrinho' });
    expect(within(cart).getByRole('heading', { name: 'Jaqueta Shield' })).toBeInTheDocument();
    expect(within(cart).getByText(/Oliva mineral · M/)).toBeInTheDocument();
    expect(within(cart).getByRole('img', { name: /Jaqueta Shield oliva mineral/ })).toHaveAttribute(
      'src',
      products[6].variants[1].images[0].src,
    );
  });
});
