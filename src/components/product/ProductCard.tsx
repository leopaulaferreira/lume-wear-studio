import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const badgeLabels = {
  'best-seller': 'Best Seller',
  'novo': 'Novo',
  'essencial': 'Essencial',
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/produto/${product.id}`}
      className="group block product-card-hover"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-background text-foreground text-[10px] tracking-wider uppercase font-medium">
            {badgeLabels[product.badge]}
          </span>
        )}

        {/* Quick Color Preview on Hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.hex}
                className="w-5 h-5 rounded-full border border-lume-gray-300 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1.5">
        <h3 className="text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors duration-300">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-foreground text-foreground" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.map((color) => (
            <div
              key={color.hex}
              className="w-4 h-4 rounded-full border border-lume-gray-200"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
