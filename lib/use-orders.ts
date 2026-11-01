"use client";

import { useSyncExternalStore } from "react";
import { ordersStore } from "./orders-store";

export function useOrders() {
  return useSyncExternalStore(
    ordersStore.subscribe,
    ordersStore.getSnapshot,
    ordersStore.getServerSnapshot
  );
}