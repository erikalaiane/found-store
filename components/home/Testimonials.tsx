import Image from "next/image";
import Card from "@/components/ui/Card";
import Rating from "@/components/ui/Rating";
import { testimonials } from "@/data/testimonials";
import SectionHeading from "./SectionHeading";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={48}
        height={48}
        className="size-12 rounded-full border-2 border-sand object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-sand bg-primary font-semibold text-cream"
    >
      {initials(name)}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section>
      <SectionHeading eyebrow="Quem já comprou" title="O que dizem por aí" />
      <ul className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.name}>
            <Card className="flex h-full flex-col gap-4 p-6">
              <Rating value={t.rating} />
              <blockquote className="flex-1 text-foreground/90">
                “{t.text}”
              </blockquote>
              <footer className="flex items-center gap-3 text-sm">
                <Avatar name={t.name} src={t.avatar} />
                <div>
                  <p className="font-semibold text-sand">{t.name}</p>
                  <p className="text-foreground/60">{t.city}</p>
                </div>
              </footer>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}