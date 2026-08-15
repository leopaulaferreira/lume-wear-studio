export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);

export const formatInstallments = (value: number, installments = 6) =>
  `${installments}x de ${formatCurrency(value / installments)} sem juros`;

