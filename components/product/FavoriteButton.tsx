"use client";

import { HeartIcon } from "@/components/ui/icons";
import { useToast } from "@/components/ui/ToastProvider";
import { cn } from "@/lib/cn";
import { useFavorites } from "@/lib/use-favorites";

type Props = {
  productId: number;
  size?: "sm" | "lg";
  className?: string;
};

export default function FavoriteButton({
  productId,
  size = "sm",
  className,
}: Props) {
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const active = isFavorite(productId);

  return (
    <button
      onClick={() => {
        toggle(productId);
        toast(
          active ? "Removido dos favoritos." : "Adicionado aos favoritos.",
          "info"
        );
      }}
      aria-pressed={active}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={cn(
        "flex items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur transition hover:bg-surface",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand",
        size === "lg" ? "px-5 py-3.5" : "p-2",
        active && "text-accent",
        className
      )}
    >
      <HeartIcon filled={active} />
    </button>
  );
}