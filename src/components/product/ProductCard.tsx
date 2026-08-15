import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [primaryImage, secondaryImage] = product.images;

  return (
    <article className={cn('product-card', className)}>
      <Link to={`/produto/${product.id}`} aria-label={`Ver ${product.name}`}>
        <div className="product-card__media">
          <img
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

        <div className="product-card__content">
          <div className="product-card__heading">
            <div>
              <p>{product.subtitle}</p>
              <h3>{product.name}</h3>
            </div>
            <strong>{formatCurrency(product.price)}</strong>
          </div>
          <div className="product-card__colors" aria-label={`${product.colors.length} cores disponíveis`}>
            <span>{product.colors.length} cores</span>
            <div aria-hidden="true">
              {product.colors.slice(0, 4).map((color) => (
                <i key={color.id} style={{ backgroundColor: color.hex }} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
