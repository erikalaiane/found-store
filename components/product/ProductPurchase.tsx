"use client";

import { useState } from "react";
import { useCartUI } from "@/components/cart/CartProvider";
import Button from "@/components/ui/Button";
import { cartActions } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { getPricing } from "@/lib/format";
import type { Product } from "@/lib/types";
import FavoriteButton from "./FavoriteButton";

type Props = {
  product: Product;
  sizes: string[] | null;
};

export default function ProductPurchase({ product, sizes }: Props) {
  const { openCart } = useCartUI();
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState("");

  const soldOut = sizes ? sizes[product.id % sizes.length] : null;

  function handleAdd() {
    if (sizes && !size) {
      setError("Escolha um tamanho para continuar.");
      return;
    }
    cartActions.add({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: getPricing(product.price, product.id).current,
      size: sizes ? size : null,
    });
    openCart();
  }

  return (
    <div className="flex flex-col gap-5">
      {sizes && (
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-sand">Tamanho</legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const unavailable = s === soldOut;
              return (
                <label key={s} className="relative">
                  <input
                    type="radio"
                    name="tamanho"
                    value={s}
                    disabled={unavailable}
                    checked={size === s}
                    onChange={() => {
                      setSize(s);
                      setError("");
                    }}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "flex size-12 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold transition",
                      "peer-checked:border-sand peer-checked:bg-primary peer-checked:text-cream",
                      "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sand",
                      "peer-disabled:cursor-not-allowed peer-disabled:text-foreground/30 peer-disabled:line-through"
                    )}
                  >
                    {s}
                  </span>
                </label>
              );
            })}
          </div>
          {error && (
            <p role="alert" className="mt-2 text-sm text-accent">
              {error}
            </p>
          )}
        </fieldset>
      )}

      <div className="flex gap-3">
        <Button variant="accent" size="lg" className="flex-1" onClick={handleAdd}>
          Adicionar ao carrinho
        </Button>
        <FavoriteButton productId={product.id} size="lg" />
      </div>
    </div>
  );
}