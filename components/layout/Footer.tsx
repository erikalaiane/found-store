import Link from "next/link";
import Badge from "@/components/ui/Badge";

type FooterLink = { href: string; label: string };

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

const sparkles = [
  { char: "✦", position: "top-8 left-[5%] text-lg", delay: "0s" },
  { char: "✧", position: "top-16 left-[18%] text-sm", delay: "1.2s" },
  { char: "✦", position: "top-10 left-[32%] text-xs", delay: "2.1s" },
  { char: "✧", position: "top-6 right-[30%] text-sm", delay: "0.6s" },
  { char: "✦", position: "top-20 right-[14%] text-base", delay: "1.7s" },
  { char: "✧", position: "top-8 right-[4%] text-lg", delay: "2.6s" },
  { char: "✦", position: "bottom-24 left-[8%] text-sm", delay: "0.9s" },
  { char: "✧", position: "bottom-28 right-[9%] text-base", delay: "1.4s" },
];

const columnTitle =
  "mb-3 font-mono text-[0.7rem] tracking-[0.25em] text-sand uppercase";

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className={columnTitle}>
        <span className="text-accent">✦</span> {title}
      </h3>
      <ul className="flex flex-col gap-1.5 font-mono text-xs text-foreground/60">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="transition hover:text-foreground"
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
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      {sparkles.map((s, i) => (
        <span
          key={i}
          aria-hidden
          style={{ animationDelay: s.delay }}
          className={`pointer-events-none absolute animate-twinkle text-sand/50 motion-reduce:animate-none ${s.position}`}
        >
          {s.char}
        </span>
      ))}

      <div className="relative mx-auto max-w-6xl px-6 pt-8 text-center">
        <div className="relative inline-block">
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 font-condensed text-5xl leading-none whitespace-nowrap text-foreground/5 blur-[2px] select-none md:text-6xl"
          >
            FOUND STORE
          </span>
          <p className="relative font-condensed text-5xl leading-none tracking-tight md:text-6xl">
            <span className="text-foreground">FOUND</span>{" "}
            <span className="text-accent">STORE</span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <p className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.3em] text-foreground/50 uppercase">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Moda · Casa · Beleza · Tecnologia
            <span aria-hidden className="h-px w-6 bg-accent" />
          </p>

          <p className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary/15 px-4 py-1.5 font-mono text-[0.65rem] tracking-widest text-sand uppercase">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sand opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-sand" />
            </span>
            Loja aberta 24h
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-6 max-w-6xl border-t border-border px-6 py-6">
        <div className="grid gap-6 text-center sm:grid-cols-3">
          <FooterColumn title="Ajuda" links={help} />
          <FooterColumn title="Empresa" links={company} />
          <div>
            <h3 className={columnTitle}>
              <span className="text-accent">✦</span> Filosofia
            </h3>
            <p className="mx-auto max-w-[16rem] font-display text-base text-accent italic">
              “Estilo é encontrar o que já era seu.”
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-center font-mono text-[0.65rem] tracking-widest text-foreground/50 uppercase md:flex-row md:text-left">
          <p>
            © 2026 <span className="text-accent">Found Store</span> · Projeto
            fictício
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {payments.map((p) => (
              <li key={p}>
                <Badge>{p}</Badge>
              </li>
            ))}
          </ul>
          <p>
            Feito com <span className="text-accent">♥</span> e Next.js · RJ,
            Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}