import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryView from "@/components/catalog/CategoryView";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getProductsByCategory } from "@/lib/api";
import { categories, getCategoryBySlug } from "@/lib/categories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: category ? `${category.label} | Found Store` : "Categoria não encontrada",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.apiName);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Breadcrumb
        items={[{ label: "Início", href: "/" }, { label: category.label }]}
      />

      <header className="mt-4 mb-10">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          {"// Categoria"}
        </p>
        <h1 className="font-display text-5xl text-heading md:text-7xl">
          {category.label}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-2 max-w-xl text-lg text-foreground/80">
          {category.description}
        </p>
      </header>

      <CategoryView products={products} />
    </div>
  );
}