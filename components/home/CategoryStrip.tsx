import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/categories";
import type { Product } from "@/lib/types";
import SectionHeading from "./SectionHeading";

export default function CategoryStrip({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="categorias-titulo">
      <SectionHeading eyebrow="Nossas categorias" title="Navegue por categoria" index="01" ghost="Categorias" />
      <ul id="categorias-titulo" className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {categories.map((category) => {
          const product = products.find((p) => p.category === category.apiName);
          if (!product) return null;
          return (
            <li key={category.slug}>
              <Link
                href={`/categoria/${category.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3 transition hover:border-sand"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 25vw, 45vw"
                    className="object-contain p-5 transition group-hover:scale-105"
                  />
                </div>
                <span className="px-1 pb-1 text-center font-semibold">
                  {category.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}