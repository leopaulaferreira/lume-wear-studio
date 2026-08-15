import { describe, expect, it } from 'vitest';
import { checkoutSchema, defaultCheckoutValues } from '@/lib/checkout';

const validCheckout = {
  ...defaultCheckoutValues,
  email: 'movimento@lume.test',
  firstName: 'Ana',
  lastName: 'Lima',
  cpf: '123.456.789-00',
  phone: '(11) 99999-9999',
  postalCode: '01310-100',
  street: 'Avenida Movimento',
  number: '101',
  neighborhood: 'Centro',
  city: 'São Paulo',
  state: 'SP',
  cardName: 'ANA LIMA',
  cardNumber: '4242 4242 4242 4242',
  expiry: '12/30',
  cvv: '123',
};

describe('checkout demonstrativo', () => {
  it('aceita um fluxo fictício completo e bem formatado', () => {
    expect(checkoutSchema.safeParse(validCheckout).success).toBe(true);
  });

  it('rejeita dados incompletos e cartão fora do formato', () => {
    const result = checkoutSchema.safeParse({
      ...validCheckout,
      email: 'invalido',
      postalCode: '123',
      cardNumber: '1234',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((issue) => issue.path[0]);
      expect(fields).toEqual(expect.arrayContaining(['email', 'postalCode', 'cardNumber']));
    }
  });
});
