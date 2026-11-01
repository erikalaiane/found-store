"use client";

import { useId } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  countInRange,
  defaultFilters,
  priceRanges,
  type Filters,
} from "@/lib/catalog";
import type { Product } from "@/lib/types";

const ratingOptions = [
  { value: 0, label: "Todas" },
  { value: 4, label: "4 estrelas ou mais" },
  { value: 3, label: "3 estrelas ou mais" },
];

type RadioRowProps = {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
  disabled?: boolean;
};

function RadioRow({ name, label, checked, onChange, count, disabled }: RadioRowProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition hover:bg-background",
        disabled && "cursor-not-allowed opacity-40 hover:bg-transparent"
      )}
    >
      <span className="flex items-center gap-2">
        <input
          type="radio"
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="accent-accent"
        />
        {label}
      </span>
      {count !== undefined && <span className="text-foreground/50">{count}</span>}
    </label>
  );
}

type Props = {
  products: Product[];
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export default function CatalogFilters({ products, filters, onChange }: Props) {
  const uid = useId();
  const hasActive = filters.price !== null || filters.minRating !== 0;

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="mb-2 font-display text-2xl text-sand">Preço</legend>
        <RadioRow
          name={`${uid}-preco`}
          label="Todos"
          count={products.length}
          checked={filters.price === null}
          onChange={() => onChange({ ...filters, price: null })}
        />
        {priceRanges.map((range) => {
          const count = countInRange(products, range);
          return (
            <RadioRow
              key={range.key}
              name={`${uid}-preco`}
              label={range.label}
              count={count}
              disabled={count === 0}
              checked={filters.price === range.key}
              onChange={() => onChange({ ...filters, price: range.key })}
            />
          );
        })}
      </fieldset>

      <fieldset>
        <legend className="mb-2 font-display text-2xl text-sand">Avaliação</legend>
        {ratingOptions.map((option) => (
          <RadioRow
            key={option.value}
            name={`${uid}-nota`}
            label={option.label}
            checked={filters.minRating === option.value}
            onChange={() => onChange({ ...filters, minRating: option.value })}
          />
        ))}
      </fieldset>

      {hasActive && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange({ ...defaultFilters, sort: filters.sort })}
        >
          Limpar filtros
        </Button>
      )}
    </div>
  );
}