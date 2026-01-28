import { ReactNode } from 'react';
import { Header } from './Header';
import { Cart } from '@/components/cart/Cart';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Cart />
    </div>
  );
}
