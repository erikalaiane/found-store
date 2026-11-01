import type { CartItem } from "./cart";

export type PaymentMethod = "pix" | "cartao" | "boleto";

export const paymentLabels: Record<PaymentMethod, string> = {
  pix: "Pix",
  cartao: "Cartão de crédito",
  boleto: "Boleto",
};

export type Order = {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  address: string;
  payment: PaymentMethod;
  coupon: string | null;
  items: CartItem[];
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
  };
};

export function createOrderId() {
  return `FS-${Date.now().toString(36).toUpperCase()}`;
}

export function parseOrders(raw: unknown): Order[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (o): o is Order =>
      Boolean(o) &&
      typeof o === "object" &&
      typeof (o as Order).id === "string" &&
      Array.isArray((o as Order).items)
  );
}