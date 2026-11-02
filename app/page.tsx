import BestSellers from "@/components/home/BestSellers";
import CategoryStrip from "@/components/home/CategoryStrip";
import HeroCarousel, { type HeroSlide } from "@/components/home/HeroCarousel";
import Newsletter from "@/components/home/Newsletter";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import { heroCopy } from "@/data/hero";
import { getProducts } from "@/lib/api";
import { categories } from "@/lib/categories";
import Marquee from "@/components/home/Marquee";

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

  const bestSellers = [...products]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 8);

  const promoProduct =
    products.find((p) => p.category === "electronics") ?? products[0];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-6 md:py-10">
      <HeroCarousel slides={slides} />
      <Marquee />
      <CategoryStrip products={products} />
      <BestSellers products={bestSellers} />
      {promoProduct && <PromoBanner product={promoProduct} />}
      <Testimonials />
      <Newsletter />
    </div>
  );
}