export function formatPrice(price: string | number | undefined | null): string {
  if (price === null || price === undefined || price === '') {
    return '';
  }
  const value = Number(price.toString().replaceAll(' ', ''));
  if (Number.isNaN(value)) {
    return '';
  }
  return new Intl.NumberFormat('ru-RU').format(value);
}

export function formatPriceWithCurrency(price: string | number | undefined | null): string {
  const formattedPrice = formatPrice(price);
  return formattedPrice ? `${formattedPrice} ₽` : '';
}
