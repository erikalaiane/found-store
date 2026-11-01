"use client";

import { MAX_QUANTITY } from "@/lib/cart";

type Props = {
  value: number;
  onChange: (value: number) => void;
  label: string;
};

const button =
  "flex size-8 items-center justify-center rounded-full border border-border text-lg transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40";

export default function QuantityStepper({ value, onChange, label }: Props) {
  return (
    <div
      role="group"
      aria-label={`Quantidade de ${label}`}
      className="flex items-center gap-3"
    >
      <button
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Diminuir quantidade"
        className={button}
      >
        −
      </button>
      <span aria-live="polite" className="w-6 text-center text-sm font-semibold">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY}
        aria-label="Aumentar quantidade"
        className={button}
      >
        +
      </button>
    </div>
  );
}