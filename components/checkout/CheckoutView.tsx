"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OrderTotals from "@/components/cart/OrderTotals";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { itemKey } from "@/lib/cart";
import { cartActions } from "@/lib/cart-store";
import {
  emptyCheckout,
  formatCep,
  validateCheckout,
  type CheckoutErrors,
  type CheckoutValues,
} from "@/lib/checkout";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { createOrderId, paymentLabels, type PaymentMethod } from "@/lib/orders";
import { addOrder } from "@/lib/orders-store";
import { useCart } from "@/lib/use-cart";
import { useHydrated } from "@/lib/use-hydrated";

const legend = "mb-4 font-display text-2xl text-sand";

export default function CheckoutView() {
  const router = useRouter();
  const toast = useToast();
  const cart = useCart();
  const hydrated = useHydrated();

  const [values, setValues] = useState<CheckoutValues>(emptyCheckout);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [done, setDone] = useState(false);

  function update(field: keyof CheckoutValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  const field = (name: keyof CheckoutValues) => ({
    value: values[name],
    error: errors[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      update(name, e.target.value),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const found = validateCheckout(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast("Confira os campos destacados.", "error");
      return;
    }

    addOrder({
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      customerName: values.name.trim(),
      email: values.email.trim(),
      address: `${values.street.trim()}, ${values.number.trim()} - ${values.city.trim()}/${values.state.toUpperCase()} - CEP ${values.cep}`,
      payment,
      coupon: cart.coupon,
      items: cart.items,
      totals: {
        subtotal: cart.subtotal,
        discount: cart.discount,
        shipping: cart.shipping,
        total: cart.total,
      },
    });

    setDone(true);
    cartActions.clear();
    router.push("/pedido-confirmado");
  }

  if (!hydrated) {
    return (
      <p className="py-16 text-center text-foreground/60">Carregando…</p>
    );
  }

  if (done) {
    return (
      <p className="py-16 text-center text-foreground/70">
        Pedido confirmado! Redirecionando…
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
          Adicione produtos antes de finalizar a compra.
        </p>
        <ButtonLink href="/" variant="accent" size="lg">
          Voltar para a loja
        </ButtonLink>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-8 lg:grid-cols-[1fr_24rem]"
    >
      <div className="flex flex-col gap-8">
        <fieldset className="rounded-2xl border border-border bg-surface p-6">
          <legend className="sr-only">Seus dados</legend>
          <h2 className={legend}>Seus dados</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Nome completo" autoComplete="name" {...field("name")} />
            <Input
              label="E-mail"
              type="email"
              autoComplete="email"
              {...field("email")}
            />
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-surface p-6">
          <legend className="sr-only">Endereço de entrega</legend>
          <h2 className={legend}>Entrega</h2>
          <div className="grid gap-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <Input
                label="CEP"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="00000-000"
                {...field("cep")}
                onChange={(e) => update("cep", formatCep(e.target.value))}
              />
            </div>
            <div className="sm:col-span-4">
              <Input
                label="Endereço"
                autoComplete="street-address"
                {...field("street")}
              />
            </div>
            <div className="sm:col-span-2">
              <Input label="Número" {...field("number")} />
            </div>
            <div className="sm:col-span-3">
              <Input
                label="Cidade"
                autoComplete="address-level2"
                {...field("city")}
              />
            </div>
            <div className="sm:col-span-1">
              <Input
                label="UF"
                autoComplete="address-level1"
                maxLength={2}
                {...field("state")}
                onChange={(e) =>
                  update("state", e.target.value.toUpperCase().slice(0, 2))
                }
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-surface p-6">
          <legend className="sr-only">Forma de pagamento</legend>
          <h2 className={legend}>Pagamento</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {(Object.keys(paymentLabels) as PaymentMethod[]).map((method) => (
              <label
                key={method}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm transition",
                  payment === method
                    ? "border-sand bg-primary text-cream"
                    : "border-border bg-background hover:border-sand"
                )}
              >
                <input
                  type="radio"
                  name="pagamento"
                  value={method}
                  checked={payment === method}
                  onChange={() => setPayment(method)}
                  className="accent-accent"
                />
                {paymentLabels[method]}
              </label>
            ))}
          </div>
          <p className="mt-3 text-xs text-foreground/60">
            Ambiente de demonstração: nenhum dado de pagamento é solicitado ou
            processado. Use dados fictícios.
          </p>
        </fieldset>
      </div>

      <aside className="flex flex-col gap-5 self-start rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-3xl text-heading">Seu pedido</h2>

        <ul className="flex flex-col gap-3">
          {cart.items.map((item) => (
            <li key={itemKey(item)} className="flex items-center gap-3 text-sm">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="48px"
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

        <OrderTotals totals={cart} coupon={cart.coupon} />

        <Button type="submit" variant="accent" size="lg">
          Confirmar pedido
        </Button>
        <ButtonLink href="/carrinho" variant="ghost">
          Voltar ao carrinho
        </ButtonLink>
      </aside>
    </form>
  );
}