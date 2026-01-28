import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronLeft, Minus, Plus, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductGallery } from '@/components/product/ProductGallery';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ProductColor } from '@/types/product';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  
  const product = products.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product?.colors[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">Produto não encontrado</p>
          <Link to="/colecao" className="mt-4 inline-block underline">
            Voltar à coleção
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    addItem(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link
          to="/colecao"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar à coleção
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="lg:py-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Title & Rating */}
              <div>
                <h1 className="text-2xl font-medium tracking-tight">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-foreground text-foreground" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} avaliações)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-medium">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>

              {/* Colors */}
              <div>
                <p className="text-sm font-medium mb-3">
                  Cor: <span className="font-normal text-muted-foreground">{selectedColor?.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        selectedColor?.hex === color.hex
                          ? 'border-foreground scale-110'
                          : 'border-lume-gray-200 hover:border-lume-gray-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Tamanho</p>
                  <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
                    Guia de medidas
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 px-4 flex items-center justify-center text-sm border transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-medium mb-3">Quantidade</p>
                <div className="inline-flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 text-sm font-medium tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-green-600 text-white'
                    : selectedSize
                    ? 'btn-lume-primary'
                    : 'bg-lume-gray-200 text-muted-foreground cursor-not-allowed'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    Adicionado ao carrinho
                  </>
                ) : (
                  'Adicionar ao carrinho'
                )}
              </button>

              {!selectedSize && (
                <p className="text-xs text-muted-foreground text-center">
                  Selecione um tamanho para continuar
                </p>
              )}

              {/* Description */}
              <div className="pt-6 border-t border-border space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Descrição</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Benefícios</h3>
                  <ul className="space-y-1.5">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-foreground flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Composição</h3>
                  <p className="text-sm text-muted-foreground">{product.composition}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
