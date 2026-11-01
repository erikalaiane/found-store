"use client";

import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

export default function AddToCartButton() {
  const toast = useToast();

  return (
    <Button
      variant="accent"
      size="sm"
      className="w-full"
      onClick={() => toast("Produto adicionado ao carrinho!", "success")}
    >
      Adicionar ao carrinho
    </Button>
  );
}