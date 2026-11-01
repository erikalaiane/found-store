"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

const views = [
  { label: "Visão geral", scale: 1, origin: "center" },
  { label: "Detalhe", scale: 1.8, origin: "center" },
  { label: "Zoom", scale: 2.4, origin: "top left" },
];

export default function ProductGallery({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const view = views[index];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(min-width: 768px) 560px, 90vw"
          className="object-contain p-10 transition-transform duration-300"
          style={{
            transform: `scale(${view.scale})`,
            transformOrigin: view.origin,
          }}
        />
      </div>

      <ul className="grid grid-cols-3 gap-3">
        {views.map((v, i) => (
          <li key={v.label}>
            <button
              onClick={() => setIndex(i)}
              aria-label={`Ver imagem: ${v.label}`}
              aria-pressed={i === index}
              className={cn(
                "relative block aspect-square w-full overflow-hidden rounded-2xl bg-white border-2 transition",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand",
                i === index ? "border-sand" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="180px"
                className="object-contain p-3"
                style={{
                  transform: `scale(${v.scale})`,
                  transformOrigin: v.origin,
                }}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}