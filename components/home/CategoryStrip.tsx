import CategoryCard from "@/components/catalog/CategoryCard";
import ButtonLink from "@/components/ui/ButtonLink";
import { categories } from "@/lib/categories";
import type { Product } from "@/lib/types";
import SectionHeading from "./SectionHeading";

const FEATURED = 6;

export default function CategoryStrip({ products }: { products: Product[] }) {
  const featured = categories.slice(0, FEATURED);

  return (
    <section aria-label="Categorias">
      <SectionHeading
        eyebrow="Nossas categorias"
        title="Navegue por categoria"
        index="01"
        ghost="Categorias"
        action={
          <ButtonLink
            href="/categorias"
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            Ver todas ({categories.length})
          </ButtonLink>
        }
      />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {featured.map((category) => {
          const product = products.find((p) => p.category === category.apiName);
          if (!product) return null;
          return (
            <li key={category.slug}>
              <CategoryCard category={category} product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}