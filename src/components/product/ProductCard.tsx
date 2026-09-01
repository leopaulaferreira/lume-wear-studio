import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { getProductVariant } from '@/data/products';
import { formatCurrency } from '@/lib/format';
import type { Product, ProductBadge } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

const badgeLabels: Record<ProductBadge, string> = {
  'best-seller': 'Mais vendido',
  novo: 'Novo',
  essencial: 'Essencial',
};

export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const [activeVariant, setActiveVariant] = useState(() => getProductVariant(product));
  const [primaryImage, secondaryImage] = activeVariant.images;
  const productPath = `/produto/${product.id}?cor=${activeVariant.color.id}`;

  useEffect(() => {
    setActiveVariant(getProductVariant(product));
  }, [product]);

  return (
    <article className={cn('product-card', className)}>
      <Link to={productPath} aria-label={`Ver ${product.name} em ${activeVariant.color.name}`} className="product-card__media-link">
        <div className="product-card__media" style={{ '--variant-color': activeVariant.color.hex } as CSSProperties}>
          <img
            key={primaryImage.src}
            className="product-card__image product-card__image--primary"
            src={primaryImage.src}
            alt={primaryImage.alt}
            width="1122"
            height="1402"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
          {secondaryImage && (
            <img
              key={secondaryImage.src}
              className="product-card__image product-card__image--secondary"
              src={secondaryImage.src}
              alt=""
              width="1122"
              height="1402"
              loading="lazy"
              decoding="async"
            />
          )}
          {product.badge && <span className="product-card__badge">{badgeLabels[product.badge]}</span>}
          <span className="product-card__view" aria-hidden="true">
            Ver peça <ArrowUpRight />
          </span>
        </div>
      </Link>

      <div className="product-card__content">
        <div className="product-card__heading">
          <div>
            <p>{product.subtitle}</p>
            <Link to={productPath}>
              <h3>{product.name}</h3>
            </Link>
          </div>
          <strong>{formatCurrency(product.price)}</strong>
        </div>
        <div className="product-card__colors">
          <span>{activeVariant.color.name}</span>
          <div role="group" aria-label={`Escolher prévia de cor de ${product.name}`}>
            {product.variants.slice(0, 4).map((variant) => {
              const active = variant.color.id === activeVariant.color.id;

              return (
                <button
                  key={variant.color.id}
                  type="button"
                  className={active ? 'is-active' : undefined}
                  onClick={() => setActiveVariant(variant)}
                  onFocus={() => setActiveVariant(variant)}
                  onPointerEnter={() => setActiveVariant(variant)}
                  aria-label={variant.color.name}
                  aria-pressed={active}
                >
                  <i style={{ backgroundColor: variant.color.hex }} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
