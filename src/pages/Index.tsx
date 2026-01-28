import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import heroImage from '@/assets/hero-lume.jpg';

export default function Index() {
  const featuredProducts = products.filter(p => p.badge === 'best-seller').slice(0, 4);
  const newProducts = products.filter(p => p.badge === 'novo').slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="LUME Collection"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <span className="text-caption inline-block mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Nova Coleção
            </span>
            <h1 className="heading-display mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Tecnologia<br />que você<br />veste.
            </h1>
            <p className="text-body text-lg max-w-md mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Peças essenciais desenvolvidas com tecidos inteligentes.
              Design atemporal, conforto absoluto.
            </p>
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <Link to="/colecao" className="btn-lume-primary">
                Explorar coleção
              </Link>
              <Link to="/colecao?badge=novo" className="btn-lume-outline">
                Ver lançamentos
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-6 text-caption opacity-0 animate-fade-up z-10" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          Scroll
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-caption block mb-2">Favoritos</span>
              <h2 className="heading-section">Best Sellers</h2>
            </div>
            <Link
              to="/colecao?badge=best-seller"
              className="hidden md:flex items-center gap-2 text-sm hover:gap-3 transition-all duration-300"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <Link
            to="/colecao?badge=best-seller"
            className="mt-10 flex md:hidden items-center justify-center gap-2 text-sm"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="text-center md:text-left">
              <span className="text-4xl font-light mb-4 block">01</span>
              <h3 className="text-lg font-medium mb-2">Tecidos Inteligentes</h3>
              <p className="text-sm text-background/60 leading-relaxed">
                Materiais desenvolvidos para regular temperatura, absorver umidade e proporcionar liberdade de movimento.
              </p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-4xl font-light mb-4 block">02</span>
              <h3 className="text-lg font-medium mb-2">Design Atemporal</h3>
              <p className="text-sm text-background/60 leading-relaxed">
                Peças versáteis que transcendem tendências. Feitas para durar e se adaptar ao seu estilo de vida.
              </p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-4xl font-light mb-4 block">03</span>
              <h3 className="text-lg font-medium mb-2">Conforto Absoluto</h3>
              <p className="text-sm text-background/60 leading-relaxed">
                Cada peça é testada exaustivamente para garantir o máximo conforto em qualquer situação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-caption block mb-2">Recém chegados</span>
              <h2 className="heading-section">Lançamentos</h2>
            </div>
            <Link
              to="/colecao?badge=novo"
              className="hidden md:flex items-center gap-2 text-sm hover:gap-3 transition-all duration-300"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {newProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-lume-offwhite">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-caption block mb-4">Newsletter</span>
            <h2 className="heading-section mb-4">Fique por dentro</h2>
            <p className="text-body mb-8">
              Receba novidades, lançamentos exclusivos e ofertas especiais.
            </p>
            <form className="flex gap-0">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-4 border border-border border-r-0 bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
              />
              <button type="submit" className="btn-lume-primary whitespace-nowrap">
                Inscrever
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div>
              <Link to="/" className="flex flex-col items-start mb-6">
                <span className="text-xl font-medium tracking-[0.3em]">LUME</span>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground -mt-0.5">wear</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Moda essencial, tecnológica e atemporal.
              </p>
            </div>

            <div>
              <h4 className="text-xs tracking-wider uppercase font-medium mb-4">Loja</h4>
              <ul className="space-y-2">
                <li><Link to="/colecao?genero=masculino" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Masculino</Link></li>
                <li><Link to="/colecao?genero=feminino" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Feminino</Link></li>
                <li><Link to="/colecao?badge=novo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Lançamentos</Link></li>
                <li><Link to="/colecao?badge=essencial" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Essenciais</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-wider uppercase font-medium mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Trocas e Devoluções</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Guia de Medidas</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-wider uppercase font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2024 LUME. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pinterest</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
