import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';

export default function Checkout() {
  const { items, totalPrice } = useCart();
  const [step, setStep] = useState<'info' | 'shipping' | 'payment'>('info');

  const shippingCost = totalPrice > 299 ? 0 : 19.9;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground mb-6">Seu carrinho está vazio</p>
          <Link to="/colecao" className="btn-lume-primary inline-block">
            Continuar comprando
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <Link
          to="/colecao"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Continuar comprando
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <h1 className="heading-section mb-8">Checkout</h1>

            {/* Steps */}
            <div className="flex items-center gap-4 mb-8">
              {['Informações', 'Entrega', 'Pagamento'].map((label, index) => {
                const stepKey = ['info', 'shipping', 'payment'][index] as typeof step;
                const isActive = step === stepKey;
                const isPast =
                  (step === 'shipping' && index === 0) ||
                  (step === 'payment' && index <= 1);
                return (
                  <button
                    key={label}
                    onClick={() => setStep(stepKey)}
                    className={`text-sm transition-colors ${
                      isActive
                        ? 'text-foreground font-medium'
                        : isPast
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Information Step */}
            {step === 'info' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="text-sm font-medium block mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Nome</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Nome"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Sobrenome</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Sobrenome"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">CPF</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Telefone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <button
                  onClick={() => setStep('shipping')}
                  className="btn-lume-primary w-full"
                >
                  Continuar para entrega
                </button>
              </div>
            )}

            {/* Shipping Step */}
            {step === 'shipping' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="text-sm font-medium block mb-2">CEP</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="00000-000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Endereço</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Rua, número"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Complemento</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Apto, bloco..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Bairro</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Bairro"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Cidade</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Cidade"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Estado</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="UF"
                    />
                  </div>
                </div>

                {/* Shipping Options */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-sm font-medium mb-4">Método de entrega</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 border border-foreground cursor-pointer">
                      <input type="radio" name="shipping" defaultChecked className="w-4 h-4" />
                      <Truck className="w-5 h-5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Entrega padrão</p>
                        <p className="text-xs text-muted-foreground">5-7 dias úteis</p>
                      </div>
                      <span className="text-sm font-medium">
                        {shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="btn-lume-primary w-full"
                >
                  Continuar para pagamento
                </button>
              </div>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 p-4 bg-secondary">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm font-medium">Cartão de crédito</span>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Número do cartão</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Nome no cartão</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Nome como está no cartão"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Validade</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">CVV</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="000"
                    />
                  </div>
                </div>

                <button className="btn-lume-primary w-full">
                  Finalizar pedido • R$ {finalTotal.toFixed(2).replace('.', ',')}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-lume-gray-100 p-6 sticky top-28">
              <h2 className="text-lg font-medium mb-6">Resumo do pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize}`}
                    className="flex gap-4"
                  >
                    <div className="w-16 h-16 bg-background relative">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-[10px] font-medium flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedColor.name} / {item.selectedSize}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span>
                    {shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                {totalPrice < 299 && (
                  <p className="text-xs text-muted-foreground">
                    Frete grátis para compras acima de R$ 299
                  </p>
                )}
                <div className="flex justify-between text-lg font-medium pt-3 border-t border-border">
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
