"use client";

import { useCartUI } from "@/components/cart/CartProvider";
import Button from "@/components/ui/Button";
import { cartActions } from "@/lib/cart-store";
import { getPricing } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { openCart } = useCartUI();

  function handleClick() {
    cartActions.add({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: getPricing(product.price, product.id).current,
      size: null,
    });
    openCart();
  }

  return (
    <Button
      variant="accent"
      size="sm"
      className="w-full"
      onClick={handleClick}
    >
      Adicionar ao carrinho
    </Button>
  );
}