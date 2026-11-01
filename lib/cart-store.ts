import {
  addItem,
  emptyCart,
  parseCart,
  removeItem,
  setItemQuantity,
  type CartItem,
  type CartState,
} from "./cart";
import { createLocalStore } from "./local-store";

export const cartStore = createLocalStore<CartState>(
  "found-store-cart",
  emptyCart,
  parseCart
);

export const cartActions = {
  add: (item: Omit<CartItem, "quantity">, quantity = 1) =>
    cartStore.set((state) => addItem(state, item, quantity)),
  remove: (key: string) => cartStore.set((state) => removeItem(state, key)),
  setQuantity: (key: string, quantity: number) =>
    cartStore.set((state) => setItemQuantity(state, key, quantity)),
  setCoupon: (coupon: string | null) =>
    cartStore.set((state) => ({ ...state, coupon })),
  clear: () => cartStore.set(() => emptyCart),
};