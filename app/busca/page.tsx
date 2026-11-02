import type { Metadata } from "next";
import SearchView from "@/components/catalog/SearchView";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = { title: "Buscar | Found Store" };

export default async function SearchPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Busca" }]} />
      <header className="mt-4 mb-8">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          {"// Buscar"}
        </p>
        <h1 className="font-display text-5xl text-heading md:text-7xl">
          O que você procura<span className="text-accent">?</span>
        </h1>
      </header>
      <SearchView products={products} />
    </div>
  );
}