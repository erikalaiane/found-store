import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import ReviewsSection from "@/components/product/ReviewsSection";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Rating from "@/components/ui/Rating";
import { getProduct, getProducts, getProductsByCategory } from "@/lib/api";
import { categories } from "@/lib/categories";
import { formatPrice, getPricing } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(Number(id));
  return {
    title: product ? `${product.title} | Found Store` : "Produto não encontrado",
  };
}

const detailBox = "group rounded-2xl border border-border bg-surface p-4";
const summary =
  "flex cursor-pointer list-none items-center justify-between font-semibold";

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();

  const product = await getProduct(productId);
  if (!product) notFound();

  const category = categories.find((c) => c.apiName === product.category);
  const { original, current, discount } = getPricing(product.price, product.id);
  const freeShipping = current >= 299;

  const related = (await getProductsByCategory(product.category))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-8">
      <div className="flex flex-col gap-6">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            ...(category
              ? [{ label: category.label, href: `/categoria/${category.slug}` }]
              : []),
            { label: product.title },
          ]}
        />

        <div className="grid gap-10 md:grid-cols-2">
          <ProductGallery image={product.image} title={product.title} />

          <div className="flex flex-col gap-5">
            {category && <Badge tone="sand" className="self-start">{category.label}</Badge>}
            <h1 className="text-2xl font-bold md:text-3xl">{product.title}</h1>
            <Rating value={product.rating.rate} count={product.rating.count} />

            <p className="flex flex-wrap items-baseline gap-3">
              <span className="font-display text-5xl text-sand">
                {formatPrice(current)}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-foreground/50 line-through">
                    {formatPrice(original)}
                  </span>
                  <Badge tone="accent">-{discount}%</Badge>
                </>
              )}
            </p>

            <p className="rounded-xl border border-border px-4 py-3 text-sm">
              {freeShipping
                ? "Frete grátis para todo o Brasil neste produto."
                : "Frete grátis em compras acima de R$ 299."}
            </p>

            <ProductPurchase
              productId={product.id}
              title={product.title}
              hasSizes={Boolean(category?.slug.startsWith("roupas"))}
            />

            <details open className={detailBox}>
              <summary className={summary}>
                Descrição
                <span aria-hidden className="transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-foreground/80">
                {product.description}
              </p>
            </details>

            <details className={detailBox}>
              <summary className={summary}>
                Entrega e devolução
                <span aria-hidden className="transition group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground/80">
                <li>Prazo estimado: 3 a 7 dias úteis.</li>
                <li>Troca ou devolução em até 7 dias após o recebimento.</li>
                <li>Embalagem reforçada e código de rastreio por e-mail.</li>
              </ul>
            </details>
          </div>
        </div>
      </div>

      <ReviewsSection
        productId={product.id}
        rate={product.rating.rate}
        count={product.rating.count}
      />

      {related.length > 0 && (
        <section aria-labelledby="relacionados-titulo">
          <h2
            id="relacionados-titulo"
            className="mb-6 font-display text-4xl text-heading md:text-5xl"
          >
            Você também pode gostar
          </h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}