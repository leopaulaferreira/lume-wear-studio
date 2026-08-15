import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Check, CreditCard, LockKeyhole, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import {
  useForm,
  type FieldError,
  type UseFormRegister,
} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BrandMark } from '@/components/layout/BrandMark';
import { Seo } from '@/components/Seo';
import { useCart } from '@/context/CartContext';
import { FREE_SHIPPING_THRESHOLD, getCartItemKey } from '@/lib/cart';
import {
  checkoutSchema,
  defaultCheckoutValues,
  informationFields,
  shippingFields,
  type CheckoutFormData,
} from '@/lib/checkout';
import { formatCurrency } from '@/lib/format';

type CheckoutStep = 'information' | 'shipping' | 'payment';

const steps: Array<{ id: CheckoutStep; label: string }> = [
  { id: 'information', label: 'Informações' },
  { id: 'shipping', label: 'Entrega' },
  { id: 'payment', label: 'Pagamento' },
];

interface TextFieldProps {
  name: keyof CheckoutFormData;
  label: string;
  register: UseFormRegister<CheckoutFormData>;
  error?: FieldError;
  type?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
  placeholder?: string;
  optional?: boolean;
  maxLength?: number;
}

function TextField({
  name,
  label,
  register,
  error,
  type = 'text',
  autoComplete,
  inputMode,
  placeholder,
  optional = false,
  maxLength,
}: TextFieldProps) {
  const errorId = `${name}-error`;
  return (
    <div className={error ? 'form-field has-error' : 'form-field'}>
      <label htmlFor={name}>{label}{optional && <span>Opcional</span>}</label>
      <input
        id={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...register(name)}
      />
      {error && <p id={errorId} className="form-field__error" role="alert">{error.message}</p>}
    </div>
  );
}

interface Confirmation {
  orderNumber: string;
  email: string;
  total: number;
  method: string;
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('information');
  const [completedStep, setCompletedStep] = useState(-1);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: defaultCheckoutValues,
    mode: 'onTouched',
  });

  const shippingMethod = watch('shippingMethod');
  const standardShipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 24.9;
  const shippingCost = shippingMethod === 'express' ? 39.9 : standardShipping;
  const finalTotal = totalPrice + shippingCost;
  const currentIndex = steps.findIndex((item) => item.id === step);

  const advance = async () => {
    const fields = step === 'information' ? informationFields : shippingFields;
    const valid = await trigger(fields, { shouldFocus: true });
    if (!valid) return;
    setCompletedStep(currentIndex);
    setStep(step === 'information' ? 'shipping' : 'payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setStep(step === 'payment' ? 'shipping' : 'information');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const placeOrder = (data: CheckoutFormData) => {
    const orderNumber = `LW-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    setConfirmation({
      orderNumber,
      email: data.email,
      total: finalTotal,
      method: data.shippingMethod === 'express' ? 'Entrega express · 2–3 dias úteis' : 'Entrega padrão · 5–7 dias úteis',
    });
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmation) {
    return (
      <div className="checkout-shell checkout-shell--confirmation">
        <Seo title="Pedido demonstrativo confirmado" description="Confirmação do checkout demonstrativo Lume Wear." noIndex />
        <header className="checkout-header"><BrandMark /><span>Ambiente demonstrativo</span></header>
        <main className="checkout-confirmation">
          <span className="checkout-confirmation__icon"><PackageCheck aria-hidden="true" /></span>
          <p className="eyebrow">Movimento confirmado</p>
          <h1>Pedido recebido.</h1>
          <p>Uma confirmação fictícia seria enviada para <strong>{confirmation.email}</strong>. Nenhum pagamento foi processado.</p>
          <dl>
            <div><dt>Pedido</dt><dd>{confirmation.orderNumber}</dd></div>
            <div><dt>Entrega</dt><dd>{confirmation.method}</dd></div>
            <div><dt>Total demonstrativo</dt><dd>{formatCurrency(confirmation.total)}</dd></div>
          </dl>
          <div className="checkout-confirmation__actions">
            <Link to="/colecao" className="button button--primary">Continuar explorando <ArrowRight aria-hidden="true" /></Link>
            <Link to="/" className="text-link">Voltar ao início</Link>
          </div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-shell">
        <Seo title="Checkout" description="Checkout demonstrativo Lume Wear." noIndex />
        <header className="checkout-header"><BrandMark /><span>Checkout seguro · demonstração</span></header>
        <main className="checkout-empty">
          <p className="eyebrow">Sua seleção</p>
          <h1>O carrinho está vazio.</h1>
          <p>Encontre uma peça, selecione cor e tamanho e volte quando estiver pronto.</p>
          <Link to="/colecao" className="button button--primary">Explorar coleção <ArrowRight aria-hidden="true" /></Link>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-shell">
      <Seo title="Checkout" description="Finalize seu pedido demonstrativo na Lume Wear." noIndex />
      <a className="skip-link" href="#checkout-main">Pular para o checkout</a>
      <header className="checkout-header">
        <BrandMark />
        <div><LockKeyhole aria-hidden="true" /> Checkout seguro <span>· demonstração</span></div>
      </header>

      <main id="checkout-main" className="checkout-layout">
        <section className="checkout-form-column">
          <Link to="/colecao" className="checkout-back"><ArrowLeft aria-hidden="true" /> Continuar comprando</Link>
          <p className="eyebrow">Finalizar seleção</p>
          <h1>Checkout</h1>

          <ol className="checkout-steps" aria-label="Etapas do checkout">
            {steps.map((item, index) => {
              const active = item.id === step;
              const complete = index <= completedStep;
              return (
                <li key={item.id} className={active ? 'is-active' : complete ? 'is-complete' : undefined}>
                  <button
                    type="button"
                    onClick={() => complete && setStep(item.id)}
                    disabled={!complete && !active}
                    aria-current={active ? 'step' : undefined}
                  >
                    <span>{complete && !active ? <Check aria-hidden="true" /> : `0${index + 1}`}</span>
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="demo-notice" role="note">
            <ShieldCheck aria-hidden="true" />
            <p><strong>Experiência de portfólio.</strong> Use apenas dados fictícios. Nenhuma informação é enviada e nenhuma cobrança será realizada.</p>
          </div>

          <form onSubmit={handleSubmit(placeOrder)} noValidate>
            {step === 'information' && (
              <fieldset className="checkout-step-panel">
                <legend>Como podemos identificar você?</legend>
                <p>Usaremos estes dados apenas durante esta demonstração local.</p>
                <div className="form-grid">
                  <TextField name="email" label="Email" type="email" autoComplete="email" inputMode="email" placeholder="voce@exemplo.com" register={register} error={errors.email} />
                  <TextField name="firstName" label="Nome" autoComplete="given-name" register={register} error={errors.firstName} />
                  <TextField name="lastName" label="Sobrenome" autoComplete="family-name" register={register} error={errors.lastName} />
                  <TextField name="cpf" label="CPF fictício" inputMode="numeric" placeholder="000.000.000-00" maxLength={14} register={register} error={errors.cpf} />
                  <TextField name="phone" label="Telefone" autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" register={register} error={errors.phone} />
                </div>
                <button type="button" className="button button--primary button--full" onClick={advance}>Continuar para entrega <ArrowRight aria-hidden="true" /></button>
              </fieldset>
            )}

            {step === 'shipping' && (
              <fieldset className="checkout-step-panel">
                <legend>Onde este pedido chegaria?</legend>
                <p>Preencha um endereço fictício para testar a validação e as opções de frete.</p>
                <div className="form-grid">
                  <TextField name="postalCode" label="CEP" autoComplete="postal-code" inputMode="numeric" placeholder="00000-000" maxLength={9} register={register} error={errors.postalCode} />
                  <TextField name="street" label="Endereço" autoComplete="address-line1" register={register} error={errors.street} />
                  <TextField name="number" label="Número" inputMode="numeric" register={register} error={errors.number} />
                  <TextField name="complement" label="Complemento" autoComplete="address-line2" optional register={register} error={errors.complement} />
                  <TextField name="neighborhood" label="Bairro" register={register} error={errors.neighborhood} />
                  <TextField name="city" label="Cidade" autoComplete="address-level2" register={register} error={errors.city} />
                  <TextField name="state" label="Estado" autoComplete="address-level1" placeholder="SP" maxLength={2} register={register} error={errors.state} />
                </div>

                <div className="shipping-options">
                  <h2>Método de entrega</h2>
                  <label className={shippingMethod === 'standard' ? 'is-active' : undefined}>
                    <input type="radio" value="standard" {...register('shippingMethod')} />
                    <span><Truck aria-hidden="true" /><span><strong>Entrega padrão</strong><small>5–7 dias úteis</small></span></span>
                    <strong>{standardShipping === 0 ? 'Grátis' : formatCurrency(standardShipping)}</strong>
                  </label>
                  <label className={shippingMethod === 'express' ? 'is-active' : undefined}>
                    <input type="radio" value="express" {...register('shippingMethod')} />
                    <span><PackageCheck aria-hidden="true" /><span><strong>Entrega express</strong><small>2–3 dias úteis</small></span></span>
                    <strong>{formatCurrency(39.9)}</strong>
                  </label>
                </div>

                <div className="checkout-step-panel__actions">
                  <button type="button" className="button button--secondary" onClick={goBack}><ArrowLeft aria-hidden="true" /> Voltar</button>
                  <button type="button" className="button button--primary" onClick={advance}>Continuar para pagamento <ArrowRight aria-hidden="true" /></button>
                </div>
              </fieldset>
            )}

            {step === 'payment' && (
              <fieldset className="checkout-step-panel">
                <legend>Pagamento demonstrativo</legend>
                <p>Os campos abaixo validam formato, mas os dados nunca deixam seu navegador.</p>
                <div className="payment-card-label"><CreditCard aria-hidden="true" /><span><strong>Cartão fictício</strong><small>Ambiente sem transação financeira</small></span></div>
                <div className="form-grid">
                  <TextField name="cardNumber" label="Número do cartão fictício" inputMode="numeric" autoComplete="off" placeholder="4242 4242 4242 4242" maxLength={19} register={register} error={errors.cardNumber} />
                  <TextField name="cardName" label="Nome no cartão" autoComplete="off" register={register} error={errors.cardName} />
                  <TextField name="expiry" label="Validade" inputMode="numeric" autoComplete="off" placeholder="12/30" maxLength={5} register={register} error={errors.expiry} />
                  <TextField name="cvv" label="CVV fictício" inputMode="numeric" autoComplete="off" placeholder="123" maxLength={4} register={register} error={errors.cvv} />
                  <div className={errors.installments ? 'form-field has-error' : 'form-field'}>
                    <label htmlFor="installments">Parcelamento</label>
                    <select id="installments" {...register('installments')} aria-invalid={Boolean(errors.installments)}>
                      <option value="1">1x de {formatCurrency(finalTotal)}</option>
                      <option value="3">3x de {formatCurrency(finalTotal / 3)} sem juros</option>
                      <option value="6">6x de {formatCurrency(finalTotal / 6)} sem juros</option>
                    </select>
                  </div>
                </div>
                <div className="checkout-step-panel__actions">
                  <button type="button" className="button button--secondary" onClick={goBack}><ArrowLeft aria-hidden="true" /> Voltar</button>
                  <button type="submit" className="button button--primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Finalizando…' : `Finalizar demonstração · ${formatCurrency(finalTotal)}`}
                    {!isSubmitting && <ArrowRight aria-hidden="true" />}
                  </button>
                </div>
              </fieldset>
            )}
          </form>
        </section>

        <aside className="order-summary" aria-label="Resumo do pedido">
          <div className="order-summary__sticky">
            <div className="order-summary__heading"><h2>Sua seleção</h2><span>{items.reduce((total, item) => total + item.quantity, 0)} itens</span></div>
            <div className="order-summary__items">
              {items.map((item) => (
                <article key={getCartItemKey(item)} className="order-summary-item">
                  <div className="order-summary-item__image">
                    <img src={item.product.images[0].src} alt="" width="1122" height="1402" />
                    <span>{item.quantity}</span>
                  </div>
                  <div><h3>{item.product.name}</h3><p>{item.selectedColor.name} · {item.selectedSize}</p></div>
                  <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
                </article>
              ))}
            </div>
            <dl className="order-summary__totals">
              <div><dt>Subtotal</dt><dd>{formatCurrency(totalPrice)}</dd></div>
              <div><dt>Entrega</dt><dd>{shippingCost === 0 ? 'Grátis' : formatCurrency(shippingCost)}</dd></div>
              <div><dt>Total</dt><dd><span>BRL</span>{formatCurrency(finalTotal)}</dd></div>
            </dl>
            <p className="order-summary__security"><LockKeyhole aria-hidden="true" /> Checkout demonstrativo. Nenhum dado ou pagamento será processado.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
