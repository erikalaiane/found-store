import { cacheLife } from "next/cache";
import { extraProducts } from "@/data/extra-products";
import type { Product } from "./types";

const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Não foi possível carregar os produtos.");
  const apiProducts: Product[] = await res.json();
  return [...apiProducts, ...extraProducts];
}

export async function getProduct(id: number): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
  const local = extraProducts.find((p) => p.id === id);
  if (local) return local;

  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) return null;
  const data = await res.text();
  return data ? JSON.parse(data) : null;
}

export async function getProductsByCategory(
  apiName: string
): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  const local = extraProducts.filter((p) => p.category === apiName);
  if (local.length > 0) return local;

  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(apiName)}`
  );
  if (!res.ok) throw new Error("Não foi possível carregar a categoria.");
  return res.json();
}