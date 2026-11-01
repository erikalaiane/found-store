import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ButtonLink from "@/components/ui/ButtonLink";
import { getProducts } from "@/lib/api";
import { categories } from "@/lib/categories";

export default async function Home() {
  const products = await getProducts();

  const tiles = categories.flatMap((category) => {
    const product = products.find((p) => p.category === category.apiName);
    return product ? [{ category, product }] : [];
  });

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-15">
      <div className="flex flex-col items-start gap-6">
        <Badge tone="sand">Coleção nova</Badge>
        <h1 className="font-display text-6xl leading-none text-heading md:text-8xl">
          Encontre o que combina com você
        </h1>
        <p className="max-w-md text-lg text-foreground/80">
          Moda, tecnologia e acessórios escolhidos a dedo, com entrega para
          todo o Brasil e 10% de desconto na primeira compra.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/categoria/roupas-femininas" variant="accent" size="lg">
            Comprar agora
          </ButtonLink>
          <ButtonLink href="/sobre" variant="outline" size="lg">
            Conhecer a loja
          </ButtonLink>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {tiles.map(({ category, product }) => (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-white"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(min-width: 768px) 25vw, 45vw"
              className="object-contain p-6 transition group-hover:scale-105"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-cream">
              {category.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}