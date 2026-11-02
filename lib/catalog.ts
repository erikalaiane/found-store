import { getPricing } from "./format";
import type { Product } from "./types";
import { categories } from "./categories"

export type SortKey =
  | "relevancia"
  | "menor-preco"
  | "maior-preco"
  | "avaliacao"
  | "desconto";

export type PriceRangeKey = "ate-100" | "100-300" | "300-1000" | "acima-1000";

export type Filters = {
  price: PriceRangeKey | null;
  minRating: number;
  sort: SortKey;
};

export const defaultFilters: Filters = {
  price: null,
  minRating: 0,
  sort: "relevancia",
};

export const priceRanges: {
  key: PriceRangeKey;
  label: string;
  min: number;
  max: number;
}[] = [
  { key: "ate-100", label: "Até R$ 100", min: 0, max: 100 },
  { key: "100-300", label: "R$ 100 a R$ 300", min: 100, max: 300 },
  { key: "300-1000", label: "R$ 300 a R$ 1.000", min: 300, max: 1000 },
  { key: "acima-1000", label: "Acima de R$ 1.000", min: 1000, max: Infinity },
];

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "avaliacao", label: "Melhor avaliados" },
  { value: "desconto", label: "Maiores descontos" },
];

type Range = (typeof priceRanges)[number];

function currentPrice(product: Product) {
  return getPricing(product.price, product.id).current;
}

function inRange(product: Product, range: Range) {
  const price = currentPrice(product);
  return price > range.min && price <= range.max;
}

export function countInRange(products: Product[], range: Range) {
  return products.filter((p) => inRange(p, range)).length;
}

export function applyFilters(products: Product[], filters: Filters) {
  const range = priceRanges.find((r) => r.key === filters.price);

  const filtered = products.filter((p) => {
    if (range && !inRange(p, range)) return false;
    if (p.rating.rate < filters.minRating) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sort) {
    case "menor-preco":
      sorted.sort((a, b) => currentPrice(a) - currentPrice(b));
      break;
    case "maior-preco":
      sorted.sort((a, b) => currentPrice(b) - currentPrice(a));
      break;
    case "avaliacao":
      sorted.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    case "desconto":
      sorted.sort(
        (a, b) =>
          getPricing(b.price, b.id).discount - getPricing(a.price, a.id).discount
      );
      break;
  }
  return sorted;
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function searchProducts(products: Product[], query: string) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return products.filter((p) => {
    const label = categories.find((c) => c.apiName === p.category)?.label ?? "";
    const haystack = normalize(`${p.title} ${p.description} ${label}`);
    return terms.every((term) => haystack.includes(term));
  });
}