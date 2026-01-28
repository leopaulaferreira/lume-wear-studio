import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { openCart, totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span className="text-xl font-medium tracking-[0.3em] text-foreground">LUME</span>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground -mt-0.5">wear</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/colecao?genero=masculino"
              className="text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              Masculino
            </Link>
            <Link
              to="/colecao?genero=feminino"
              className="text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              Feminino
            </Link>
            <Link
              to="/colecao?badge=novo"
              className="text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              Lançamentos
            </Link>
            <Link
              to="/colecao?badge=essencial"
              className="text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              Essenciais
            </Link>
            <Link
              to="/kits"
              className="text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              Kits
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button
              className="p-2 text-foreground hover:text-muted-foreground transition-colors duration-300"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              className="p-2 text-foreground hover:text-muted-foreground transition-colors duration-300"
              aria-label="Minha conta"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              className="p-2 text-foreground hover:text-muted-foreground transition-colors duration-300 relative"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] font-medium flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
