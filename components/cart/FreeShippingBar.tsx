import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

export default function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const done = subtotal >= FREE_SHIPPING_THRESHOLD;
  const percent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <p className="mb-2 text-sm">
        {done ? (
          "Você ganhou frete grátis! 🎉"
        ) : (
          <>
            Faltam{" "}
            <strong className="text-sand">
              {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}
            </strong>{" "}
            para o frete grátis
          </>
        )}
      </p>
      <div
        role="progressbar"
        aria-label="Progresso para frete grátis"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-2 overflow-hidden rounded-full bg-foreground/15"
      >
        <div
          className={cn(
            "h-full rounded-full transition-all",
            done ? "bg-primary" : "bg-accent"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}