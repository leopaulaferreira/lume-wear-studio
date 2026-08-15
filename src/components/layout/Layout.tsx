import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Cart } from '@/components/cart/Cart';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content" className={isHome ? 'page-main page-main--home' : 'page-main'}>
        {children}
      </main>
      {!hideFooter && <Footer />}
      <Cart />
    </div>
  );
}
