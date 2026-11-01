"use client";

import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import { itemKey } from "@/lib/cart";
import { useCart } from "@/lib/use-cart";
import { useHydrated } from "@/lib/use-hydrated";
import CartItemRow from "./CartItemRow";
import CouponForm from "./CouponForm";
import FreeShippingBar from "./FreeShippingBar";
import OrderTotals from "./OrderTotals";

export default function CartView() {
  const cart = useCart();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <p className="py-16 text-center text-foreground/60">
        Carregando carrinho…
      </p>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
        <p className="font-display text-4xl text-heading">
          Seu carrinho está vazio
        </p>
        <p className="text-foreground/70">
          Explore a loja e adicione seus produtos favoritos.
        </p>
        <ButtonLink href="/" variant="accent" size="lg">
          Continuar comprando
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
      <div className="flex flex-col gap-4">
        <FreeShippingBar subtotal={cart.subtotal} />
        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface px-5">
          {cart.items.map((item) => (
            <li key={itemKey(item)} className="py-5">
              <CartItemRow item={item} />
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          size="sm"
          className="self-start"
          onClick={() => cart.clear()}
        >
          Esvaziar carrinho
        </Button>
      </div>

      <aside className="flex flex-col gap-5 self-start rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-3xl text-heading">Resumo do pedido</h2>
        <CouponForm />
        <OrderTotals totals={cart} coupon={cart.coupon} />
        <ButtonLink href="/checkout" variant="accent" size="lg">
          Finalizar compra
        </ButtonLink>
        <ButtonLink href="/" variant="ghost">
          Continuar comprando
        </ButtonLink>
      </aside>
    </div>
  );
}