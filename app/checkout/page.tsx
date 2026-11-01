import type { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Finalizar compra | Found Store" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Carrinho", href: "/carrinho" },
          { label: "Finalizar compra" },
        ]}
      />
      <h1 className="mt-4 mb-8 font-display text-6xl text-heading md:text-7xl">
        Finalizar compra
      </h1>
      <CheckoutView />
    </div>
  );
}