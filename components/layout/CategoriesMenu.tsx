"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { cn } from "@/lib/cn";

export default function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex items-center gap-1.5 font-mono text-[0.7rem] tracking-widest text-foreground/70 uppercase transition hover:text-heading"
      >
        Categorias
        <span aria-hidden className={cn("transition", open && "rotate-180")}>
          ▾
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full mx-auto mt-2 w-[min(46rem,92vw)] rounded-2xl border border-foreground/10 bg-surface/95 p-3 shadow-2xl backdrop-blur-xl"
        >
          <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categoria/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="group block rounded-xl p-3 transition hover:bg-background"
                >
                  <span className="font-display text-lg text-heading">
                    {c.label}
                    <span className="text-accent opacity-0 transition group-hover:opacity-100">
                      .
                    </span>
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-xs text-foreground/60">
                    {c.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}