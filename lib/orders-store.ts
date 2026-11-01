import { createLocalStore } from "./local-store";
import { parseOrders, type Order } from "./orders";

export const ordersStore = createLocalStore<Order[]>(
  "found-store-orders",
  [],
  parseOrders
);

export function addOrder(order: Order) {
  ordersStore.set((orders) => [order, ...orders]);
}