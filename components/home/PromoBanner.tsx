import Image from "next/image";
import Badge from "@/components/ui/Badge";
import ButtonLink from "@/components/ui/ButtonLink";
import type { Product } from "@/lib/types";
import Countdown from "./Countdown";

export default function PromoBanner({ product }: { product: Product }) {
  return (
    <section
      aria-labelledby="promo-titulo"
      className="grid items-center gap-8 overflow-hidden rounded-3xl bg-linear-to-br from-accent to-[#8f342d] p-8 text-cream md:grid-cols-[1.2fr_1fr] md:p-12"
    >
      <div className="flex flex-col items-start gap-5">
        <Badge tone="sand">Oferta especial</Badge>
        <h2
          id="promo-titulo"
          className="font-display text-5xl leading-none md:text-7xl"
        >
          Até 20% off em produtos selecionados
        </h2>
        <p className="max-w-md text-lg opacity-90">
          Aproveite as melhores marcas com preço especial. A oferta termina à
          meia-noite.
        </p>
        <Countdown />
        <ButtonLink href="/categoria/eletronicos" variant="primary" size="lg">
          Ver ofertas
        </ButtonLink>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-3xl bg-white shadow-2xl">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 768px) 320px, 80vw"
          className="object-contain p-8"
        />
      </div>
    </section>
  );
}