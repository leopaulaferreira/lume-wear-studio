import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '@/App';
import { CartProvider } from '@/context/CartContext';

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CartProvider><AppRoutes /></CartProvider>
    </MemoryRouter>,
  );
}

describe('rotas principais', () => {
  it('renderiza a Home editorial', async () => {
    renderRoute('/');
    expect(await screen.findByRole('heading', { name: /move with purpose/i })).toBeInTheDocument();
  });

  it('redireciona a rota legada de kits para a coleção', async () => {
    renderRoute('/kits');
    expect(await screen.findByRole('heading', { name: 'Coleção 01' })).toBeInTheDocument();
  });

  it('apresenta uma página 404 localizada para rotas desconhecidas', async () => {
    renderRoute('/rota-que-nao-existe');
    expect(await screen.findByRole('heading', { name: /fora da rota/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explorar coleção/i })).toHaveAttribute('href', '/colecao');
  });
});
