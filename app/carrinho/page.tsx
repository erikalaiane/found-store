import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Carrinho | Found Store" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Breadcrumb
        items={[{ label: "Início", href: "/" }, { label: "Carrinho" }]}
      />
      <h1 className="mt-4 mb-8 font-display text-6xl text-heading md:text-7xl">
        Seu carrinho
      </h1>
      <CartView />
    </div>
  );
}