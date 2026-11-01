"use client";

import { createContext, useContext, useMemo, useState } from "react";
import CartDrawer from "./CartDrawer";

type CartUI = { openCart: () => void; closeCart: () => void };

const CartUIContext = createContext<CartUI | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo<CartUI>(
    () => ({
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    }),
    []
  );

  return (
    <CartUIContext.Provider value={value}>
      {children}
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  const ctx = useContext(CartUIContext);
  if (!ctx) throw new Error("useCartUI precisa estar dentro de CartProvider");
  return ctx;
}