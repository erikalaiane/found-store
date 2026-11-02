"use client";

import { useState } from "react";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeadsetIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type HeroSlide = {
  slug: string;
  label: string;
  title: string;
  text: string;
  cta: string;
  image: string;
  productTitle: string;
};

const benefits = [
  { icon: TruckIcon, label: "Entrega rápida" },
  { icon: ShieldIcon, label: "Pagamento seguro" },
  { icon: HeadsetIcon, label: "Suporte de segunda a domingo" },
];

const arrowButton =
  "rounded-full border border-border bg-background/60 p-2 transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand";

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  if (total === 0) return null;

  const go = (i: number) => setIndex((i + total) % total);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Destaques da loja"
      className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/40 via-surface to-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-sand/10 blur-3xl"
      />

      <div className="grid">
        {slides.map((slide, i) => (
          <div
            key={slide.slug}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={i !== index}
            className={cn(
              "col-start-1 row-start-1 grid items-center gap-8 p-8 transition-[opacity,visibility] duration-500 md:grid-cols-2 md:p-14",
              i === index ? "visible opacity-100" : "invisible opacity-0"
            )}
          >
            <div className="flex flex-col items-start gap-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/40 px-3 py-1 font-mono text-[0.7rem] tracking-widest text-sand uppercase backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {slide.label}
              </span>
              <h1 className="font-display text-5xl leading-[1.05] text-heading md:text-6xl">
                {slide.title}
                <span className="text-accent">.</span>
              </h1>
              <p className="max-w-md text-lg text-foreground/80">{slide.text}</p>
              <ButtonLink
                href={`/categoria/${slide.slug}`}
                variant="accent"
                size="lg"
              >
                {slide.cta}
              </ButtonLink>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-xs md:max-w-sm">
              <div
                aria-hidden
                className="absolute inset-4 rounded-full bg-sand/20 blur-2xl"
              />
              <div className="relative size-full overflow-hidden rounded-3xl bg-white shadow-2xl">
                <Image
                  src={slide.image}
                  alt={slide.productTitle}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 768px) 384px, 80vw"
                  className="object-contain p-8"
                />
              </div>
              <span className="absolute -bottom-3 left-4 max-w-[80%] truncate rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-cream shadow-lg">
                {slide.productTitle}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t border-border/60 px-8 py-5 md:flex-row md:items-center md:justify-between md:px-14">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80">
          {benefits.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="text-sand" />
              {label}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go(index - 1)}
            aria-label="Destaque anterior"
            className={arrowButton}
          >
            <ChevronLeftIcon />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.slug}
                onClick={() => go(i)}
                aria-label={`Ir para o destaque ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === index ? "w-6 bg-accent" : "w-2.5 bg-foreground/30"
                )}
              />
            ))}
          </div>

          <button
            onClick={() => go(index + 1)}
            aria-label="Próximo destaque"
            className={arrowButton}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}