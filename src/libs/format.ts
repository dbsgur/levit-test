export function getDiscountPrice(originalPrice: number, discountRate: number) {
  return formatCurrency(Math.floor((originalPrice * discountRate) / 100));
}
export function formatCurrency(price: number) {
  return price.toLocaleString("en-US");
}
