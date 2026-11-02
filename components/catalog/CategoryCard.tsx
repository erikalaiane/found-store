import Image from "next/image";
import Link from "next/link";
import type { CategoryInfo, Product } from "@/lib/types";

type Props = {
  category: CategoryInfo;
  product: Product;
  count?: number;
  detailed?: boolean;
};

export default function CategoryCard({
  category,
  product,
  count,
  detailed = false,
}: Props) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-foreground/10 bg-surface/60 p-3 backdrop-blur-md transition hover:-translate-y-1 hover:border-sand/60 hover:shadow-[0_12px_40px_-12px] hover:shadow-sand/30"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
        <Image
          src={product.image}
          alt=""
          fill
          sizes={
            detailed
              ? "(min-width: 768px) 33vw, 45vw"
              : "(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
          }
          className="object-contain p-5 transition group-hover:scale-105"
        />
      </div>

      {detailed ? (
        <div className="flex flex-1 flex-col gap-1 px-1 pb-1">
          <span className="font-display text-2xl text-heading">
            {category.label}
            <span className="text-accent">.</span>
          </span>
          <span className="line-clamp-2 text-sm text-foreground/70">
            {category.description}
          </span>
          {count !== undefined && (
            <span className="mt-auto pt-2 font-mono text-[0.65rem] tracking-widest text-sand uppercase">
              {count} {count === 1 ? "produto" : "produtos"} →
            </span>
          )}
        </div>
      ) : (
        <span className="px-1 pb-1 text-center text-sm font-semibold">
          {category.label}
        </span>
      )}
    </Link>
  );
}