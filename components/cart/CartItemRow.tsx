"use client";

import Image from "next/image";
import Link from "next/link";
import { itemKey, type CartItem } from "@/lib/cart";
import { cartActions } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import QuantityStepper from "./QuantityStepper";

export default function CartItemRow({ item }: { item: CartItem }) {
  const key = itemKey(item);
  const href = `/produtos/${item.productId}`;

  return (
    <div className="flex gap-4">
      <Link
        href={href}
        aria-hidden
        tabIndex={-1}
        className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-white"
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes="80px"
          className="object-contain p-2"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex justify-between gap-3">
          <div>
            <Link
              href={href}
              className="line-clamp-2 text-sm font-semibold transition hover:text-heading"
            >
              {item.title}
            </Link>
            {item.size && (
              <p className="text-xs text-foreground/60">Tamanho: {item.size}</p>
            )}
          </div>
          <p className="shrink-0 font-semibold text-sand">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <QuantityStepper
            value={item.quantity}
            label={item.title}
            onChange={(value) => cartActions.setQuantity(key, value)}
          />
          <button
            onClick={() => cartActions.remove(key)}
            aria-label={`Remover ${item.title} do carrinho`}
            className="text-sm text-foreground/60 underline transition hover:text-accent"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}