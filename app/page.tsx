import HeroCarousel, { type HeroSlide } from "@/components/home/HeroCarousel";
import { heroCopy } from "@/data/hero";
import { getProducts } from "@/lib/api";
import { categories } from "@/lib/categories";

export default async function Home() {
  const products = await getProducts();

  const slides: HeroSlide[] = categories.flatMap((category) => {
    const product = products.find((p) => p.category === category.apiName);
    const copy = heroCopy[category.slug];
    if (!product || !copy) return [];
    return [
      {
        slug: category.slug,
        label: category.label,
        ...copy,
        image: product.image,
        productTitle: product.title,
      },
    ];
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-6 md:py-10">
      <HeroCarousel slides={slides} />
    </div>
  );
}