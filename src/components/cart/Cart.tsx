import * as Dialog from '@radix-ui/react-dialog';
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { FREE_SHIPPING_THRESHOLD, getCartItemKey } from '@/lib/cart';
import { formatCurrency } from '@/lib/format';

export function Cart() {
  const {
    items,
    isOpen,
    announcement,
    setCartOpen,
    updateQuantity,
    removeItem,
    totalItems,
    totalPrice,
  } = useCart();

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const shippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setCartOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="cart-drawer">
          <div className="cart-drawer__header">
            <div>
              <Dialog.Title>Carrinho</Dialog.Title>
              <Dialog.Description>
                {totalItems === 0
                  ? 'Sua seleção está vazia.'
                  : `${totalItems} ${totalItems === 1 ? 'item selecionado' : 'itens selecionados'}`}
              </Dialog.Description>
            </div>
            <Dialog.Close className="icon-button" aria-label="Fechar carrinho">
              <X aria-hidden="true" />
            </Dialog.Close>
          </div>

          <p className="sr-only" aria-live="polite">
            {announcement}
          </p>

          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag aria-hidden="true" />
              <h2>Espaço para o próximo movimento.</h2>
              <p>Explore peças desenhadas para treino, trajeto e tudo entre eles.</p>
              <Dialog.Close asChild>
                <Link to="/colecao" className="button button--primary">
                  Explorar coleção
                </Link>
              </Dialog.Close>
            </div>
          ) : (
            <>
              <div className="cart-shipping-progress">
                <div className="cart-shipping-progress__copy">
                  <Check aria-hidden="true" />
                  <p>
                    {remainingForFreeShipping > 0
                      ? <>Faltam <strong>{formatCurrency(remainingForFreeShipping)}</strong> para frete grátis.</>
                      : <strong>Você conquistou frete grátis.</strong>}
                  </p>
                </div>
                <div
                  className="cart-shipping-progress__track"
                  role="progressbar"
                  aria-label="Progresso para frete grátis"
                  aria-valuemin={0}
                  aria-valuemax={FREE_SHIPPING_THRESHOLD}
                  aria-valuenow={Math.min(totalPrice, FREE_SHIPPING_THRESHOLD)}
                >
                  <span style={{ width: `${shippingProgress}%` }} />
                </div>
              </div>

              <div className="cart-drawer__items">
                {items.map((item) => {
                  const stock = item.product.stockBySize[item.selectedSize] ?? 0;
                  const key = getCartItemKey(item);

                  return (
                    <article key={key} className="cart-item">
                      <Dialog.Close asChild>
                        <Link to={`/produto/${item.product.id}`} className="cart-item__image">
                          <img
                            src={item.product.images[0].src}
                            alt={item.product.images[0].alt}
                            width="1122"
                            height="1402"
                          />
                        </Link>
                      </Dialog.Close>

                      <div className="cart-item__details">
                        <div className="cart-item__topline">
                          <div>
                            <h3>{item.product.name}</h3>
                            <p>{item.selectedColor.name} · {item.selectedSize}</p>
                          </div>
                          <button
                            className="cart-item__remove"
                            onClick={() => removeItem(item.product.id, item.selectedColor.id, item.selectedSize)}
                            aria-label={`Remover ${item.product.name}`}
                          >
                            <Trash2 aria-hidden="true" />
                            <span>Remover</span>
                          </button>
                        </div>

                        <div className="cart-item__bottomline">
                          <div className="quantity-control" aria-label={`Quantidade de ${item.product.name}`}>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedColor.id, item.selectedSize, item.quantity - 1)}
                              aria-label="Diminuir quantidade"
                            >
                              <Minus aria-hidden="true" />
                            </button>
                            <span aria-live="polite">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedColor.id, item.selectedSize, item.quantity + 1)}
                              disabled={item.quantity >= stock}
                              aria-label="Aumentar quantidade"
                            >
                              <Plus aria-hidden="true" />
                            </button>
                          </div>
                          <p className="cart-item__price">{formatCurrency(item.product.price * item.quantity)}</p>
                        </div>
                        {stock <= 5 && <p className="cart-item__stock">Apenas {stock} em estoque neste tamanho</p>}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="cart-drawer__footer">
                <div className="cart-total">
                  <span>Subtotal</span>
                  <strong>{formatCurrency(totalPrice)}</strong>
                </div>
                <p>Frete e prazo são calculados na próxima etapa.</p>
                <Dialog.Close asChild>
                  <Link to="/checkout" className="button button--primary button--full">
                    Ir para o checkout
                  </Link>
                </Dialog.Close>
                <Dialog.Close className="button button--secondary button--full">
                  Continuar comprando
                </Dialog.Close>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
