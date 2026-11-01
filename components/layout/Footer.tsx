import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { categories } from "@/lib/categories";

type FooterLink = { href: string; label: string };

const shop: FooterLink[] = categories.map((c) => ({
  href: `/categoria/${c.slug}`,
  label: c.label,
}));

const help: FooterLink[] = [
  { href: "/entrega", label: "Entrega e devoluções" },
  { href: "/faq", label: "Perguntas frequentes" },
  { href: "/rastrear", label: "Rastrear pedido" },
  { href: "/contato", label: "Contato" },
];

const company: FooterLink[] = [
  { href: "/sobre", label: "Sobre nós" },
  { href: "/termos", label: "Termos de uso" },
  { href: "/privacidade", label: "Privacidade" },
];

const payments = ["Visa", "Mastercard", "Pix", "Boleto"];

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="mb-4 font-display text-xl tracking-wide text-sand">
        {title}
      </h3>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-foreground/70 transition hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <p className="font-display text-3xl text-heading">FOUND STORE</p>
          <p className="text-sm text-foreground/70">
            Moda, tecnologia e acessórios com identidade própria.
          </p>
        </div>
        <FooterColumn title="Loja" links={shop} />
        <FooterColumn title="Ajuda" links={help} />
        <FooterColumn title="Empresa" links={company} />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-foreground/60 md:flex-row">
          <p>© 2026 Found Store. Projeto fictício de portfólio: nenhuma compra é real.</p>
          <div className="flex gap-2">
            {payments.map((p) => (
              <Badge key={p}>{p}</Badge>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}