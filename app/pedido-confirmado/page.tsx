import type { Metadata } from "next";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";

export const metadata: Metadata = { title: "Pedido confirmado | Found Store" };

export default function OrderConfirmedPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <OrderConfirmation />
    </div>
  );
}