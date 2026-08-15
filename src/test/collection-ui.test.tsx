import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { CartProvider } from '@/context/CartContext';
import Collection from '@/pages/Collection';

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.search}</output>;
}

describe('interface da coleção', () => {
  it('sincroniza filtro e ordenação com a URL e atualiza o grid', async () => {
    render(
      <MemoryRouter initialEntries={['/colecao']}>
        <CartProvider>
          <Routes>
            <Route path="/colecao" element={<><Collection /><LocationProbe /></>} />
          </Routes>
        </CartProvider>
      </MemoryRouter>,
    );

    await screen.findByRole('heading', { name: 'Coleção 01' });
    fireEvent.click(screen.getByLabelText('Leggings'));

    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('categoria=leggings'));
    expect(screen.getByRole('heading', { name: 'Legging Form' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Jaqueta Shield' })).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox', { name: 'Ordenar' }), { target: { value: 'price-desc' } });
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('ordem=price-desc'));
  });
});
