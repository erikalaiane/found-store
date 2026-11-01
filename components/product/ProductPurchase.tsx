"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { cn } from "@/lib/cn";

const sizes = ["P", "M", "G", "GG", "XG"];

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

type Props = {
  productId: number;
  title: string;
  hasSizes: boolean;
};

export default function ProductPurchase({ productId, title, hasSizes }: Props) {
  const toast = useToast();
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);

  const soldOut = sizes[productId % sizes.length];

  function handleAdd() {
    if (hasSizes && !size) {
      setError("Escolha um tamanho para continuar.");
      return;
    }
    toast(`${title.slice(0, 40)} adicionado ao carrinho!`, "success");
  }

  function handleFavorite() {
    const next = !favorite;
    setFavorite(next);
    toast(next ? "Adicionado aos favoritos." : "Removido dos favoritos.", "info");
  }

  return (
    <div className="flex flex-col gap-5">
      {hasSizes && (
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
        <Button
          variant="outline"
          size="lg"
          aria-pressed={favorite}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={handleFavorite}
          className={favorite ? "text-accent" : undefined}
        >
          <HeartIcon filled={favorite} />
        </Button>
      </div>
    </div>
  );
}