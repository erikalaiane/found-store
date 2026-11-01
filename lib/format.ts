const USD_TO_BRL = 5;

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getDiscount(id: number) {
  return [0, 10, 15, 20][id % 4];
}

export function getPricing(usdPrice: number, id: number) {
  const original = Math.round(usdPrice * USD_TO_BRL * 100) / 100;
  const discount = getDiscount(id);
  const current = Math.round(original * (1 - discount / 100) * 100) / 100;
  return { original, current, discount };
}