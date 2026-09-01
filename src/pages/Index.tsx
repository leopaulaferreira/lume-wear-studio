import { ArrowDown, ArrowRight, Check, MoveRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import editorialImage from '@/assets/campaign/editorial-pause.webp';
import heroImage from '@/assets/campaign/hero-motion.webp';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { Seo } from '@/components/Seo';
import { getPrimaryProductImage, products } from '@/data/products';

const categories = [
  {
    index: '01',
    title: 'RUN',
    copy: 'Leveza, ventilação e ritmo contínuo.',
    to: '/colecao?categoria=regatas,shorts,leggings',
    image: getPrimaryProductImage(products[3]),
  },
  {
    index: '02',
    title: 'TRAIN',
    copy: 'Suporte preciso para força e amplitude.',
    to: '/colecao?categoria=tops,camisetas,leggings',
    image: getPrimaryProductImage(products[4]),
  },
  {
    index: '03',
    title: 'TRANSIT',
    copy: 'Camadas técnicas para o movimento urbano.',
    to: '/colecao?categoria=jaquetas,calcas,moletons',
    image: getPrimaryProductImage(products[6]),
  },
];

export default function Index() {
  const [newsletterSent, setNewsletterSent] = useState(false);
  const featured = ['1', '5', '8', '2']
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));
  const newArrivals = products.filter((product) => product.badge === 'novo');

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterSent(true);
    event.currentTarget.reset();
  };

  return (
    <Layout>
      <Seo description="Lume Wear é movimento com intenção: roupas esportivas premium para treino, corrida e vida urbana." />

      <section className="home-hero" aria-labelledby="home-hero-title">
        <img
          src={heroImage}
          alt="Dois atletas da Lume Wear em movimento diante de arquitetura mineral"
          width="1536"
          height="1024"
        />
        <div className="home-hero__wash" aria-hidden="true" />
        <div className="home-hero__content page-shell">
          <p className="eyebrow">Coleção 01 / Corpo & cidade</p>
          <h1 id="home-hero-title">MOVE WITH<br />PURPOSE</h1>
          <div className="home-hero__bottom">
            <p>Performance para o corpo.<br />Presença para a cidade.</p>
            <Link to="/colecao" className="button button--light">
              Explorar coleção <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <a className="home-hero__scroll" href="#lancamentos" aria-label="Ir para lançamentos">
          <ArrowDown aria-hidden="true" />
          Descobrir
        </a>
      </section>

      <section id="lancamentos" className="home-products section-space page-shell">
        <header className="section-heading">
          <div>
            <p className="eyebrow">Novas coordenadas</p>
            <h2>Lançamentos</h2>
          </div>
          <p>Volumes precisos, superfícies táteis e tecnologia que acompanha o corpo sem ocupar a cena.</p>
          <Link to="/colecao?badge=novo" className="text-link">Ver coleção <ArrowRight aria-hidden="true" /></Link>
        </header>
        <div className="product-grid product-grid--editorial">
          {newArrivals.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} className={index === 0 ? 'product-card--lead' : undefined} />
          ))}
        </div>
      </section>

      <section className="home-categories" aria-labelledby="categories-title">
        <div className="page-shell">
          <header className="section-heading section-heading--light">
            <div>
              <p className="eyebrow">Escolha seu ritmo</p>
              <h2 id="categories-title">Sistema Lume</h2>
            </div>
            <p>Três contextos. Uma linguagem visual contínua.</p>
          </header>
          <div className="category-grid">
            {categories.map((category) => (
              <Link key={category.title} to={category.to} className="category-card">
                <img src={category.image.src} alt={category.image.alt} width="1122" height="1402" loading="lazy" />
                <span className="category-card__index">{category.index}</span>
                <div className="category-card__content">
                  <h3>{category.title}</h3>
                  <p>{category.copy}</p>
                  <MoveRight aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-story">
        <div className="editorial-story__image">
          <img
            src={editorialImage}
            alt="Atletas Lume Wear em pausa entre estruturas de concreto claro"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span>02 / Entre o ritmo e a pausa</span>
        </div>
        <div className="editorial-story__content">
          <p className="eyebrow">Manifesto</p>
          <h2>O movimento não termina quando o treino acaba.</h2>
          <p>Desenhamos peças para o intervalo: o aquecimento, a recuperação, o caminho e a cidade. Menos ruído. Mais presença.</p>
          <Link to="/colecao?badge=essencial" className="text-link">Explorar essenciais <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="home-products section-space page-shell">
        <header className="section-heading">
          <div>
            <p className="eyebrow">Escolhas recorrentes</p>
            <h2>Em rotação</h2>
          </div>
          <p>As peças que sustentam diferentes intensidades e voltam ao corpo todos os dias.</p>
          <Link to="/colecao?ordem=rating" className="text-link">Ver seleção completa <ArrowRight aria-hidden="true" /></Link>
        </header>
        <div className="product-grid">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="brand-values">
        <div className="page-shell brand-values__grid">
          <div className="brand-values__intro">
            <p className="eyebrow">Projetado com intenção</p>
            <h2>Menos peças.<br />Mais possibilidades.</h2>
          </div>
          <article><span>01</span><h3>Material em primeiro plano</h3><p>Fibras técnicas, toque real e construção pensada para durar além da estação.</p></article>
          <article><span>02</span><h3>Forma que acompanha</h3><p>Modelagens testadas em movimento, com suporte sem restrição e conforto sem excesso.</p></article>
          <article><span>03</span><h3>Compra sem atrito</h3><p>Frete grátis a partir de R$ 499 e troca simples em até 30 dias.</p></article>
        </div>
      </section>

      <section className="newsletter page-shell" aria-labelledby="newsletter-title">
        <div>
          <p className="eyebrow">Lume Journal</p>
          <h2 id="newsletter-title">Novos movimentos,<br />sem excesso de ruído.</h2>
        </div>
        <div>
          <p>Receba lançamentos, editoriais e notas sobre design, corpo e cidade.</p>
          {newsletterSent ? (
            <p className="newsletter__success" role="status"><Check aria-hidden="true" /> Você está na lista.</p>
          ) : (
            <form onSubmit={submitNewsletter} className="newsletter__form">
              <label htmlFor="newsletter-email" className="sr-only">Seu email</label>
              <input id="newsletter-email" name="email" type="email" placeholder="seu@email.com" autoComplete="email" required />
              <button type="submit" aria-label="Cadastrar email"><ArrowRight aria-hidden="true" /></button>
            </form>
          )}
          <small>Ao continuar, você concorda em receber comunicações da marca fictícia Lume Wear.</small>
        </div>
      </section>
    </Layout>
  );
}
