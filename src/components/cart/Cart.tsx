import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

export function Cart() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-foreground/20 z-50 animate-fade-in"
        onClick={closeCart}
      />

      {/* Cart Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <h2 className="text-lg font-medium tracking-tight">Carrinho</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-secondary transition-colors duration-200"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                <p className="text-muted-foreground mb-6">Seu carrinho está vazio</p>
                <button
                  onClick={closeCart}
                  className="btn-lume-outline"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize}`}
                    className="flex gap-4 p-6"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 bg-secondary flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-3 h-3 border border-border"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {item.selectedColor.name} • {item.selectedSize}
                        </span>
                      </div>
                      <p className="text-sm font-medium mt-2">
                        R$ {item.product.price.toFixed(2).replace('.', ',')}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.hex,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.hex,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.selectedColor.hex,
                              item.selectedSize
                            )
                          }
                          className="ml-auto p-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-medium">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Frete calculado no checkout
              </p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn-lume-primary w-full flex items-center justify-center"
              >
                Finalizar compra
              </Link>
              <button
                onClick={closeCart}
                className="btn-lume-outline w-full"
              >
                Continuar comprando
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
