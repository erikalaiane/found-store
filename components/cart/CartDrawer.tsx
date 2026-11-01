"use client";

import Drawer from "@/components/ui/Drawer";
import ButtonLink from "@/components/ui/ButtonLink";
import { itemKey } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/use-cart";
import CartItemRow from "./CartItemRow";
import FreeShippingBar from "./FreeShippingBar";

type Props = { open: boolean; onClose: () => void };

export default function CartDrawer({ open, onClose }: Props) {
  const { items, subtotal, count } = useCart();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={count > 0 ? `Seu carrinho (${count})` : "Seu carrinho"}
    >
      <div className="flex h-[calc(100dvh-8.5rem)] flex-col">
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="font-display text-3xl text-sand">Carrinho vazio</p>
            <p className="text-foreground/70">
              Que tal começar pelos mais vendidos?
            </p>
            <ButtonLink href="/" variant="accent" onClick={onClose}>
              Continuar comprando
            </ButtonLink>
          </div>
        ) : (
          <>
            <FreeShippingBar subtotal={subtotal} />

            <ul className="mt-4 flex-1 divide-y divide-border overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={itemKey(item)} className="py-4">
                  <CartItemRow item={item} />
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <p className="flex items-baseline justify-between text-lg">
                <span>Subtotal</span>
                <strong className="text-sand">{formatPrice(subtotal)}</strong>
              </p>
              <ButtonLink
                href="/checkout"
                variant="accent"
                size="lg"
                onClick={onClose}
              >
                Finalizar compra
              </ButtonLink>
              <ButtonLink href="/carrinho" variant="outline" onClick={onClose}>
                Ver carrinho completo
              </ButtonLink>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}