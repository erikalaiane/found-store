"use client";

import { useSyncExternalStore } from "react";
import { getTotals } from "./cart";
import { cartActions, cartStore } from "./cart-store";

export function useCart() {
  const state = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  return {
    items: state.items,
    coupon: state.coupon,
    ...getTotals(state),
    ...cartActions,
  };
}