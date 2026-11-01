import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";
import Rating from "@/components/ui/Rating";
import { needsSize } from "@/lib/cart";
import { formatPrice, getPricing } from "@/lib/format";
import type { Product } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const { original, current, discount } = getPricing(product.price, product.id);

  return (
    <Card interactive className="relative flex h-full flex-col gap-3">
      {discount > 0 && (
        <Badge tone="accent" className="absolute top-6 left-6 z-10">
          -{discount}%
        </Badge>
      )}

      <Link
        href={`/produtos/${product.id}`}
        className="flex flex-1 flex-col gap-3"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 256px, 60vw"
            className="object-contain p-5"
          />
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold">{product.title}</h3>
        <Rating value={product.rating.rate} count={product.rating.count} />
        <p className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-bold text-sand">
            {formatPrice(current)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-foreground/50 line-through">
              {formatPrice(original)}
            </span>
          )}
        </p>
      </Link>

      {needsSize(product.category) ? (
        <ButtonLink
          href={`/produtos/${product.id}`}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Escolher tamanho
        </ButtonLink>
      ) : (
        <AddToCartButton product={product} />
      )}
    </Card>
  );
}