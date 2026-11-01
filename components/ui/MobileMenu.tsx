"use client";

import { useState } from "react";
import Link from "next/link";
import Drawer from "@/components/ui/Drawer";
import { MenuIcon } from "@/components/ui/icons";
import { categories } from "@/lib/categories";
import ThemeToggle from "./ThemeToggle";

const links = [
  ...categories.map((c) => ({
    href: `/categoria/${c.slug}`,
    label: c.label,
  })),
  { href: "/sobre", label: "Sobre nós" },
  { href: "/faq", label: "Perguntas frequentes" },
  { href: "/contato", label: "Contato" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        className="rounded-full p-2 transition hover:bg-surface md:hidden"
      >
        <MenuIcon />
      </button>

      <Drawer open={open} onClose={close} title="Menu">
        <nav aria-label="Menu principal" className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-xl px-3 py-3 text-lg transition hover:bg-background"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <ThemeToggle />
        </div>
      </Drawer>
    </>
  );
}