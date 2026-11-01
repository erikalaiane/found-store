"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import Drawer from "@/components/ui/Drawer";
import {
  applyFilters,
  defaultFilters,
  sortOptions,
  type Filters,
  type SortKey,
} from "@/lib/catalog";
import type { Product } from "@/lib/types";
import CatalogFilters from "./CatalogFilters";

export default function CategoryView({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visible = applyFilters(products, filters);

  return (
    <div className="grid gap-8 md:grid-cols-[16rem_1fr]">
      <aside className="hidden self-start rounded-2xl border border-border bg-surface p-5 md:block">
        <h2 className="mb-4 font-display text-3xl text-heading">Filtros</h2>
        <CatalogFilters products={products} filters={filters} onChange={setFilters} />
      </aside>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-foreground/70">
            {visible.length} {visible.length === 1 ? "produto" : "produtos"}
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              Filtros
            </Button>

            <label className="flex items-center gap-2 text-sm">
              <span className="text-foreground/70">Ordenar por</span>
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value as SortKey })
                }
                className="rounded-full border border-border bg-surface px-4 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sand"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {visible.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {visible.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="font-display text-3xl text-heading">
              Nenhum produto encontrado
            </p>
            <p className="text-foreground/70">
              Tente mudar ou limpar os filtros.
            </p>
            <Button
              variant="accent"
              onClick={() => setFilters({ ...defaultFilters, sort: filters.sort })}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filtros">
        <CatalogFilters products={products} filters={filters} onChange={setFilters} />
        <Button
          variant="accent"
          className="mt-8 w-full"
          onClick={() => setDrawerOpen(false)}
        >
          Ver {visible.length} {visible.length === 1 ? "produto" : "produtos"}
        </Button>
      </Drawer>
    </div>
  );
}