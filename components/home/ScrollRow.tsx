"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

const arrow =
  "absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-background p-2 shadow-lg transition hover:bg-surface md:block";

export default function ScrollRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);

  function scroll(direction: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        aria-label="Rolar para a esquerda"
        className={`${arrow} -left-4`}
      >
        <ChevronLeftIcon />
      </button>

      <ul
        ref={ref}
        tabIndex={0}
        aria-label={label}
className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand [&::-webkit-scrollbar]:hidden">
        {children}
      </ul>

      <button
        onClick={() => scroll(1)}
        aria-label="Rolar para a direita"
        className={`${arrow} -right-4`}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}