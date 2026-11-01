import { cacheLife } from "next/cache";
import type { Product } from "./types";

const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Não foi possível carregar os produtos.");
  return res.json();
}

export async function getProduct(id: number): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
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
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(apiName)}`
  );
  if (!res.ok) throw new Error("Não foi possível carregar a categoria.");
  return res.json();
}