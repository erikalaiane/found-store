"use client";

import { useCartUI } from "@/components/cart/CartProvider";
import { BagIcon } from "@/components/ui/icons";
import { useCart } from "@/lib/use-cart";
import { CartIcon } from "@/components/ui/icons";

export default function CartButton() {
  const { count } = useCart();
  const { openCart } = useCartUI();

  return (
    <button
      onClick={openCart}
      aria-label={
        count > 0
          ? `Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}`
          : "Abrir carrinho"
      }
      className="relative rounded-full p-2 transition hover:bg-surface"
    >
    <CartIcon />      {count > 0 && (
        <span
          aria-hidden
          className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-cream"
        >
          {count}
        </span>
      )}
    </button>
  );
}