"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { searchProducts } from "@/lib/catalog";
import type { Product } from "@/lib/types";

const suggestions = ["tênis", "sérum", "poltrona", "bolsa", "vela", "relógio"];

export default function SearchView({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const results = searchProducts(products, query);
  const searching = query.trim().length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <label htmlFor="busca" className="sr-only">
          Buscar produtos
        </label>
        <input
          id="busca"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busque por produto ou categoria"
          className="w-full rounded-full border border-border bg-surface/60 px-6 py-4 text-lg backdrop-blur-md placeholder:text-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
        />
      </div>

      {!searching ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs tracking-widest text-foreground/60 uppercase">
            Sugestões:
          </span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="rounded-full border border-border px-4 py-1.5 text-sm transition hover:border-sand hover:bg-surface"
            >
              {s}
            </button>
          ))}
        </div>
      ) : (
        <>
          <p aria-live="polite" className="text-sm text-foreground/70">
            {results.length} {results.length === 1 ? "resultado" : "resultados"}{" "}
            para “{query.trim()}”
          </p>
          {results.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {results.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-dashed border-border py-16 text-center text-foreground/70">
              Nada encontrado. Tente outra palavra ou uma categoria.
            </p>
          )}
        </>
      )}
    </div>
  );
}