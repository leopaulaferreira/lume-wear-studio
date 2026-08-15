import { z } from 'zod';

const requiredText = (label: string) => z.string().trim().min(2, `${label} é obrigatório.`);

export const checkoutSchema = z.object({
  email: z.string().trim().min(1, 'Informe seu email.').email('Digite um email válido.'),
  firstName: requiredText('Nome'),
  lastName: requiredText('Sobrenome'),
  cpf: z.string().trim().regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'Digite um CPF no formato 000.000.000-00.'),
  phone: z.string().trim().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Digite um telefone com DDD.'),
  postalCode: z.string().trim().regex(/^\d{5}-?\d{3}$/, 'Digite um CEP válido.'),
  street: requiredText('Endereço'),
  number: z.string().trim().min(1, 'Informe o número.'),
  complement: z.string().trim().optional(),
  neighborhood: requiredText('Bairro'),
  city: requiredText('Cidade'),
  state: z.string().trim().length(2, 'Use a sigla do estado com 2 letras.'),
  shippingMethod: z.enum(['standard', 'express']),
  cardName: requiredText('Nome no cartão'),
  cardNumber: z.string().trim().regex(/^(?:\d[ -]*?){16}$/, 'Use 16 dígitos fictícios.'),
  expiry: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use o formato MM/AA.'),
  cvv: z.string().trim().regex(/^\d{3,4}$/, 'Use 3 ou 4 dígitos fictícios.'),
  installments: z.string().min(1, 'Selecione o parcelamento.'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const informationFields: Array<keyof CheckoutFormData> = [
  'email',
  'firstName',
  'lastName',
  'cpf',
  'phone',
];

export const shippingFields: Array<keyof CheckoutFormData> = [
  'postalCode',
  'street',
  'number',
  'neighborhood',
  'city',
  'state',
  'shippingMethod',
];

export const paymentFields: Array<keyof CheckoutFormData> = [
  'cardName',
  'cardNumber',
  'expiry',
  'cvv',
  'installments',
];

export const defaultCheckoutValues: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  cpf: '',
  phone: '',
  postalCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  shippingMethod: 'standard',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  installments: '1',
};
