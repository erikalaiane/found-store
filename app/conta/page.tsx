import type { Metadata } from "next";
import AccountView from "@/components/account/AccountView";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = { title: "Minha conta | Found Store" };

export default async function AccountPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Breadcrumb
        items={[{ label: "Início", href: "/" }, { label: "Minha conta" }]}
      />
      <h1 className="mt-4 mb-6 font-display text-5xl text-heading md:text-7xl">
        Minha conta<span className="text-accent">.</span>
      </h1>
      <AccountView products={products} />
    </div>
  );
}