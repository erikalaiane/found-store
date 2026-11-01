import Link from "next/link";
import { categories } from "@/lib/categories";
import { BagIcon, SearchIcon } from "@/components/ui/icons";
import MobileMenu from "../ui/MobileMenu";
import ThemeToggle from "./ThemeToggle";

const iconButton = "rounded-full p-2 transition hover:bg-surface";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6 md:gap-8">
        <MobileMenu />

        <Link
          href="/"
          className="font-display text-3xl tracking-wide text-heading"
        >
          FOUND STORE
        </Link>

        <nav
          aria-label="Categorias"
          className="hidden flex-1 items-center gap-6 md:flex"
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

        <div className="ml-auto flex items-center gap-1">
          <Link href="/busca" aria-label="Buscar produtos" className={iconButton}>
            <SearchIcon />
          </Link>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link href="/carrinho" aria-label="Carrinho" className={iconButton}>
            <BagIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}