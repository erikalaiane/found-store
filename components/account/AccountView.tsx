"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/ToastProvider";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { paymentLabels } from "@/lib/orders";
import type { Product } from "@/lib/types";
import { useAuth } from "@/lib/use-auth";
import { useFavorites } from "@/lib/use-favorites";
import { useHydrated } from "@/lib/use-hydrated";
import { useOrders } from "@/lib/use-orders";

type Tab = "pedidos" | "favoritos" | "dados";

const tabs: { id: Tab; label: string }[] = [
  { id: "pedidos", label: "Pedidos" },
  { id: "favoritos", label: "Favoritos" },
  { id: "dados", label: "Meus dados" },
];

function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center">
      <p className="font-display text-3xl text-heading">{title}</p>
      <p className="text-foreground/70">{text}</p>
      <ButtonLink href="/" variant="accent">
        Ir para a loja
      </ButtonLink>
    </div>
  );
}

export default function AccountView({ products }: { products: Product[] }) {
  const router = useRouter();
  const toast = useToast();
  const hydrated = useHydrated();
  const { user, logout } = useAuth();
  const orders = useOrders();
  const { ids } = useFavorites();
  const [tab, setTab] = useState<Tab>("pedidos");

  useEffect(() => {
    if (hydrated && !user) router.replace("/entrar?next=/conta");
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return <p className="py-16 text-center text-foreground/60">Carregando…</p>;
  }

  const favorites = products.filter((p) => ids.includes(p.id));

  function handleLogout() {
    logout();
    toast("Você saiu da sua conta.", "info");
    router.push("/");
  }

  return (
    <div>
      <p className="mb-6 text-lg text-foreground/80">
        Olá, <strong className="text-sand">{user.name.split(" ")[0]}</strong>!
      </p>

      <div
        role="tablist"
        aria-label="Seções da conta"
        className="scroll-thin mb-8 flex gap-2 overflow-x-auto pb-2"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full border px-5 py-2 font-mono text-xs tracking-widest whitespace-nowrap uppercase transition",
              tab === t.id
                ? "border-sand bg-primary text-cream"
                : "border-border hover:bg-surface"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === "pedidos" &&
          (orders.length === 0 ? (
            <Empty
              title="Nenhum pedido ainda"
              text="Quando você finalizar uma compra, ela aparece aqui."
            />
          ) : (
            <ul className="flex flex-col gap-4">
              {orders.map((order) => (
                <li key={order.id}>
                  <Card className="flex flex-col gap-4 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-xs tracking-widest text-sand uppercase">
                          {order.id}
                        </p>
                        <p className="text-sm text-foreground/60">
                          {new Date(order.createdAt).toLocaleDateString("pt-BR")}{" "}
                          · {paymentLabels[order.payment]}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge tone="primary">Em separação</Badge>
                        <p className="font-display text-2xl text-sand">
                          {formatPrice(order.totals.total)}
                        </p>
                      </div>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {order.items.map((item) => (
                        <li
                          key={`${item.productId}-${item.size}`}
                          className="relative size-14 overflow-hidden rounded-lg bg-white"
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="56px"
                            className="object-contain p-1"
                          />
                        </li>
                      ))}
                    </ul>
                  </Card>
                </li>
              ))}
            </ul>
          ))}

        {tab === "favoritos" &&
          (favorites.length === 0 ? (
            <Empty
              title="Nenhum favorito"
              text="Toque no coração de um produto para guardá-lo aqui."
            />
          ) : (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {favorites.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ))}

        {tab === "dados" && (
          <Card className="flex max-w-md flex-col gap-5 p-6">
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="font-mono text-xs tracking-widest text-sand uppercase">
                  Nome
                </dt>
                <dd>{user.name}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-widest text-sand uppercase">
                  E-mail
                </dt>
                <dd>{user.email}</dd>
              </div>
            </dl>
            <Button variant="outline" onClick={handleLogout}>
              Sair da conta
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}