import Link from "next/link";
import { categories } from "@/lib/categories";
import { SearchIcon } from "@/components/ui/icons";
import CartButton from "./CartButton";
import MobileMenu from "../ui/MobileMenu";
import ThemeToggle from "./ThemeToggle";

const iconButton = "rounded-full p-2 transition hover:bg-surface";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Link
            href="/"
            className="font-display text-3xl tracking-wide text-heading"
          >
            FOUND STORE
          </Link>
        </div>

        <nav
          aria-label="Categorias"
          className="hidden items-center gap-8 md:flex"
        >
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="text-sm font-medium text-foreground/80 transition hover:text-heading"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 justify-self-end">
          <Link href="/busca" aria-label="Buscar produtos" className={iconButton}>
            <SearchIcon />
          </Link>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}