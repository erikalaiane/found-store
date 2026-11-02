import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";
import ScrollRow from "./ScrollRow";
import SectionHeading from "./SectionHeading";

export default function BestSellers({ products }: { products: Product[] }) {
  return (
    <section>
      <SectionHeading eyebrow="Produtos queridinhos" title="Mais vendidos" index="02" ghost="Destaques" />
      <ScrollRow label="Produtos mais vendidos">
        {products.map((product) => (
          <li key={product.id} className="w-64 shrink-0 snap-start">
            <ProductCard product={product} />
          </li>
        ))}
      </ScrollRow>
    </section>
  );
}