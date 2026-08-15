import * as Dialog from '@radix-ui/react-dialog';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { BrandMark } from './BrandMark';
import { SearchDialog } from './SearchDialog';

const navigation = [
  { label: 'Coleção', to: '/colecao' },
  { label: 'Masculino', to: '/colecao?genero=masculino' },
  { label: 'Feminino', to: '/colecao?genero=feminino' },
  { label: 'Novidades', to: '/colecao?badge=novo' },
];

export function Header() {
  const { pathname } = useLocation();
  const { openCart, totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isHome = pathname === '/';
  const isOverlay = isHome && !scrolled;

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 32);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={cn('site-header', isOverlay && 'site-header--overlay', scrolled && 'site-header--scrolled')}>
        <div className="announcement-bar">
          <span>Frete grátis acima de R$ 499</span>
          <span className="announcement-bar__secondary">Troca simples em até 30 dias</span>
        </div>

        <div className="site-header__inner page-shell">
          <div className="site-header__mobile-menu">
            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger asChild>
                <button className="icon-button" aria-label="Abrir menu">
                  <Menu aria-hidden="true" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="mobile-menu">
                  <div className="mobile-menu__header">
                    <BrandMark onClick={() => setMenuOpen(false)} />
                    <Dialog.Close className="icon-button" aria-label="Fechar menu">
                      <X aria-hidden="true" />
                    </Dialog.Close>
                  </div>
                  <Dialog.Title className="sr-only">Navegação principal</Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Acesse coleção, categorias e novidades da Lume Wear.
                  </Dialog.Description>
                  <nav className="mobile-menu__nav" aria-label="Navegação mobile">
                    {navigation.map((item, index) => (
                      <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
                        <span>0{index + 1}</span>
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mobile-menu__footer">
                    <p>Performance, design e cidade em uma única camada.</p>
                    <Link to="/ajuda/trocas" onClick={() => setMenuOpen(false)}>
                      Ajuda & trocas
                    </Link>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <BrandMark className="site-header__brand" />

          <nav className="site-header__nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <button className="header-action" onClick={() => setSearchOpen(true)} aria-label="Buscar produtos">
              <Search aria-hidden="true" />
              <span>Buscar</span>
            </button>
            <button className="header-action header-action--cart" onClick={openCart} aria-label={`Abrir carrinho com ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`}>
              <ShoppingBag aria-hidden="true" />
              <span>Carrinho</span>
              {totalItems > 0 && <strong aria-hidden="true">{totalItems}</strong>}
            </button>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
