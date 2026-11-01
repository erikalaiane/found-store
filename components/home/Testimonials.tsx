import Card from "@/components/ui/Card";
import Rating from "@/components/ui/Rating";
import { testimonials } from "@/data/testimonials";
import SectionHeading from "./SectionHeading";

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
              <footer className="text-sm">
                <p className="font-semibold text-sand">{t.name}</p>
                <p className="text-foreground/60">{t.city}</p>
              </footer>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
