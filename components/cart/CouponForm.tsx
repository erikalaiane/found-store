"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { isValidCoupon, normalizeCoupon } from "@/lib/cart";
import { cartActions } from "@/lib/cart-store";
import { useCart } from "@/lib/use-cart";

export default function CouponForm() {
  const { coupon } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalized = normalizeCoupon(code);
    if (!isValidCoupon(normalized)) {
      setError("Cupom inválido. Tente FOUND10.");
      return;
    }
    cartActions.setCoupon(normalized);
    setCode("");
    setError("");
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-sm">
        <span className="flex items-center gap-2">
          Cupom <Badge tone="primary">{coupon}</Badge> aplicado
        </span>
        <button
          onClick={() => cartActions.setCoupon(null)}
          className="underline transition hover:text-accent"
        >
          Remover
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex items-end gap-2">
      <div className="flex-1">
        <Input
          label="Cupom de desconto"
          placeholder="FOUND10"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={error}
        />
      </div>
      <Button type="submit" variant="outline">
        Aplicar
      </Button>
    </form>
  );
}