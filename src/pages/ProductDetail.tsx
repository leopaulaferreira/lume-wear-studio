import { ArrowRight, Check, ChevronLeft, Minus, Package, Plus, RotateCcw, Star, Truck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGallery } from '@/components/product/ProductGallery';
import { SizeGuideDialog } from '@/components/product/SizeGuideDialog';
import { Seo } from '@/components/Seo';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatCurrency, formatInstallments } from '@/lib/format';
import type { ProductColor } from '@/types/product';

export default function ProductDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const product = getProductById(id);
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(product?.colors[0] ?? null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectionError, setSelectionError] = useState(false);

  useEffect(() => {
    setSelectedColor(product?.colors[0] ?? null);
    setSelectedSize(null);
    setQuantity(1);
    setSelectionError(false);
  }, [product]);

  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product]);

  if (!product) {
    return (
      <Layout>
        <Seo title="Produto não encontrado" description="A peça procurada não está disponível." noIndex />
        <section className="not-found not-found--product page-shell">
          <p className="eyebrow">Erro 404</p>
          <h1>Esta peça saiu do campo.</h1>
          <p>Ela pode ter mudado de nome ou não fazer mais parte da coleção.</p>
          <Link to="/colecao" className="button button--primary">Explorar coleção <ArrowRight aria-hidden="true" /></Link>
        </section>
      </Layout>
    );
  }

  const selectedStock = selectedSize ? product.stockBySize[selectedSize] ?? 0 : 0;

  const selectSize = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
    setSelectionError(false);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setSelectionError(true);
      return;
    }
    addItem(product, selectedColor, selectedSize, quantity);
  };

  return (
    <Layout>
      <Seo
        title={product.name}
        description={`${product.subtitle}. ${product.description}`}
        image={product.images[0].src}
        type="product"
      />

      <div className="product-breadcrumb page-shell">
        <Link to="/colecao"><ChevronLeft aria-hidden="true" /> Coleção</Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </div>

      <section className="product-page page-shell" aria-labelledby="product-title">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="product-buybox">
          <div className="product-buybox__sticky">
            <p className="eyebrow">{product.subtitle}</p>
            <div className="product-buybox__title">
              <h1 id="product-title">{product.name}</h1>
              {product.badge && <span>{product.badge === 'best-seller' ? 'Mais vendido' : product.badge === 'novo' ? 'Novo' : 'Essencial'}</span>}
            </div>

            <div className="product-buybox__rating">
              <span><Star aria-hidden="true" /> {product.rating}</span>
              <a href="#avaliacoes">{product.reviewCount} avaliações verificadas</a>
            </div>

            <div className="product-buybox__price">
              <p>{formatCurrency(product.price)}</p>
              {product.originalPrice && <del>{formatCurrency(product.originalPrice)}</del>}
              <small>{formatInstallments(product.price)}</small>
            </div>

            <fieldset className="product-option">
              <legend>Cor <span>{selectedColor?.name}</span></legend>
              <div className="product-colors">
                {product.colors.map((color) => {
                  const active = selectedColor?.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      className={active ? 'is-active' : undefined}
                      onClick={() => setSelectedColor(color)}
                      aria-pressed={active}
                      aria-label={color.name}
                    >
                      <span style={{ backgroundColor: color.hex }} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="product-option">
              <div className="product-option__line">
                <legend>Tamanho {selectedSize && <span>{selectedSize}</span>}</legend>
                <SizeGuideDialog fit={product.fit} />
              </div>
              <div className="product-sizes">
                {product.sizes.map((size) => {
                  const stock = product.stockBySize[size] ?? 0;
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={stock === 0}
                      className={active ? 'is-active' : undefined}
                      onClick={() => selectSize(size)}
                      aria-pressed={active}
                      aria-label={`${size}${stock === 0 ? ', indisponível' : ''}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <p className={selectionError ? 'product-option__error is-visible' : 'product-option__error'} role="alert">
                Selecione um tamanho para adicionar a peça.
              </p>
              {selectedSize && selectedStock <= 5 && <p className="product-option__stock">Últimas {selectedStock} unidades no tamanho {selectedSize}.</p>}
            </fieldset>

            <div className="product-purchase">
              <div className="quantity-control quantity-control--large" aria-label="Quantidade">
                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} disabled={quantity === 1} aria-label="Diminuir quantidade"><Minus aria-hidden="true" /></button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity((current) => Math.min(selectedStock || 10, current + 1))} disabled={Boolean(selectedSize) && quantity >= selectedStock} aria-label="Aumentar quantidade"><Plus aria-hidden="true" /></button>
              </div>
              <button type="button" className="button button--primary product-purchase__add" onClick={handleAddToCart}>
                Adicionar à seleção <ArrowRight aria-hidden="true" />
              </button>
            </div>

            <ul className="product-service-list">
              <li><Truck aria-hidden="true" /><span><strong>Frete grátis</strong> acima de R$ 499</span></li>
              <li><RotateCcw aria-hidden="true" /><span><strong>Troca simples</strong> em até 30 dias</span></li>
              <li><Package aria-hidden="true" /><span><strong>Envio em 1–2 dias úteis</strong> após confirmação</span></li>
            </ul>

            <div className="product-details">
              <details open>
                <summary>Sobre a peça <Plus aria-hidden="true" /></summary>
                <p>{product.description}</p>
                <ul>{product.benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul>
              </details>
              <details>
                <summary>Composição & cuidado <Plus aria-hidden="true" /></summary>
                <p>{product.composition}</p><p>{product.care}</p>
              </details>
              <details>
                <summary>Caimento <Plus aria-hidden="true" /></summary>
                <p>{product.fit}</p>
              </details>
              <details>
                <summary>Entrega & devolução <Plus aria-hidden="true" /></summary>
                <p>Calcule opções e prazos no checkout. A troca demonstrativa pode ser solicitada em até 30 dias.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section id="avaliacoes" className="product-proof page-shell">
        <div>
          <p className="eyebrow">Teste de movimento</p>
          <h2>Usada no ritmo real.</h2>
        </div>
        <div className="product-proof__score"><strong>{product.rating}</strong><span><span aria-label={`${product.rating} de 5 estrelas`}>★★★★★</span>{product.reviewCount} avaliações verificadas</span></div>
        <blockquote>“O caimento mantém a estrutura durante o treino e continua certo no resto do dia.”<cite>— Comunidade Lume / avaliação demonstrativa</cite></blockquote>
      </section>

      <section className="related-products section-space page-shell">
        <header className="section-heading">
          <div><p className="eyebrow">Complete o sistema</p><h2>Também em movimento</h2></div>
          <Link to="/colecao" className="text-link">Ver coleção <ArrowRight aria-hidden="true" /></Link>
        </header>
        <div className="product-grid">{related.slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>
    </Layout>
  );
}
