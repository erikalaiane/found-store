"use client";

import Image from "next/image";
import OrderTotals from "@/components/cart/OrderTotals";
import ButtonLink from "@/components/ui/ButtonLink";
import { itemKey } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { paymentLabels } from "@/lib/orders";
import { useHydrated } from "@/lib/use-hydrated";
import { useOrders } from "@/lib/use-orders";

export default function OrderConfirmation() {
  const hydrated = useHydrated();
  const orders = useOrders();
  const order = orders[0];

  if (!hydrated) {
    return <p className="py-16 text-center text-foreground/60">Carregando…</p>;
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="font-display text-4xl text-heading">
          Nenhum pedido recente
        </p>
        <ButtonLink href="/" variant="accent" size="lg">
          Voltar para a loja
        </ButtonLink>
      </div>
    );
  }

  const firstName = order.customerName.split(" ")[0];
  const date = new Date(order.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header className="text-center">
        <p
          aria-hidden
          className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary text-3xl text-cream"
        >
          ✓
        </p>
        <h1 className="font-display text-6xl text-heading md:text-7xl">
          Pedido confirmado!
        </h1>
        <p className="mt-3 text-foreground/80">
          Recebemos o seu pedido, {firstName}. Como este é um projeto de
          demonstração, nenhuma compra foi processada de verdade.
        </p>
      </header>

      <section className="grid gap-4 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2">
        <div>
          <p className="text-xs text-foreground/60 uppercase">Número do pedido</p>
          <p className="font-semibold text-sand">{order.id}</p>
        </div>
        <div>
          <p className="text-xs text-foreground/60 uppercase">Data</p>
          <p className="font-semibold">{date}</p>
        </div>
        <div>
          <p className="text-xs text-foreground/60 uppercase">Pagamento</p>
          <p className="font-semibold">{paymentLabels[order.payment]}</p>
        </div>
        <div>
          <p className="text-xs text-foreground/60 uppercase">Entrega em</p>
          <p className="font-semibold">{order.address}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="mb-4 font-display text-3xl text-heading">Itens</h2>
        <ul className="mb-6 flex flex-col gap-3">
          {order.items.map((item) => (
            <li key={itemKey(item)} className="flex items-center gap-3 text-sm">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1">{item.title}</p>
                <p className="text-xs text-foreground/60">
                  {item.size ? `Tam. ${item.size} · ` : ""}Qtd. {item.quantity}
                </p>
              </div>
              <p className="font-semibold">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <OrderTotals totals={order.totals} coupon={order.coupon} />
      </section>

      <div className="flex justify-center">
        <ButtonLink href="/" variant="accent" size="lg">
          Voltar para a loja
        </ButtonLink>
      </div>
    </div>
  );
}