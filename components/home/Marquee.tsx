import { categories } from "@/lib/categories";

const items = [
  ...categories.map((c) => c.label),
  "Frete grátis acima de R$ 299",
  "Cupom FOUND10",
  "Troca em até 7 dias",
];

const row = items.flatMap((item) => [item, "✦"]);

export default function Marquee() {
  return (
    <div aria-hidden className="overflow-hidden border-y border-border py-3">
      <div className="flex w-max animate-marquee font-mono text-xs tracking-widest text-foreground/60 uppercase hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-6 pr-6">
            {row.map((text, i) => (
              <li key={i} className={text === "✦" ? "text-accent" : undefined}>
                {text}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}