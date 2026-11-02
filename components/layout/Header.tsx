import Link from "next/link";
import { SearchIcon, UserIcon } from "@/components/ui/icons";
import CartButton from "./CartButton";
import CategoriesMenu from "./CategoriesMenu";
import MobileMenu from "../ui/MobileMenu";
import ThemeToggle from "./ThemeToggle";

const iconButton = "rounded-full p-2 transition hover:bg-surface";

const navLink =
  "font-mono text-[0.7rem] tracking-widest text-foreground/70 uppercase transition hover:text-heading";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Link
            href="/"
            className="font-condensed text-3xl tracking-wide text-heading"
          >
            FOUND STORE<span className="text-accent">.</span>
          </Link>
        </div>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-8 md:flex"
        >
          <CategoriesMenu />
          <Link href="/#mais-vendidos" className={navLink}>
            Mais vendidos
          </Link>
          <Link href="/sobre" className={navLink}>
            Sobre nós
          </Link>
          <Link href="/contato" className={navLink}>
            Contato
          </Link>
        </nav>

        

        <div className="flex items-center gap-1 justify-self-end">
          <Link href="/busca" aria-label="Buscar produtos" className={iconButton}>
            <SearchIcon />
          </Link>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link href="/conta" aria-label="Minha conta" className={iconButton}>
          <UserIcon />
        </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}