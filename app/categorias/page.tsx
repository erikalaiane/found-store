import type { Metadata } from "next";
import CategoryCard from "@/components/catalog/CategoryCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getProducts } from "@/lib/api";
import { categories } from "@/lib/categories";

export const metadata: Metadata = { title: "Categorias | Found Store" };

export default async function CategoriesPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Breadcrumb
        items={[{ label: "Início", href: "/" }, { label: "Categorias" }]}
      />

      <header className="mt-4 mb-10">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          {"// Departamentos"}
        </p>
        <h1 className="font-display text-5xl text-heading md:text-7xl">
          Todas as categorias
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-2 max-w-xl text-lg text-foreground/80">
          Moda, casa, beleza e tecnologia: escolha por onde quer começar.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {categories.map((category) => {
          const inCategory = products.filter(
            (p) => p.category === category.apiName
          );
          if (inCategory.length === 0) return null;
          return (
            <li key={category.slug}>
              <CategoryCard
                category={category}
                product={inCategory[0]}
                count={inCategory.length}
                detailed
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}