import { formatPrice } from "@/lib/format";

type Props = {
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
  };
  coupon: string | null;
};

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-foreground/70">{label}</dt>
      <dd className={accent ? "text-accent" : undefined}>{value}</dd>
    </div>
  );
}

export default function OrderTotals({ totals, coupon }: Props) {
  return (
    <dl className="flex flex-col gap-2 text-sm">
      <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
      {totals.discount > 0 && (
        <Row
          label={`Cupom ${coupon}`}
          value={`− ${formatPrice(totals.discount)}`}
          accent
        />
      )}
      <Row
        label="Frete"
        value={totals.shipping === 0 ? "Grátis" : formatPrice(totals.shipping)}
      />
      <div className="mt-2 flex items-baseline justify-between border-t border-border pt-3">
        <dt className="text-lg">Total</dt>
        <dd className="font-display text-4xl text-sand">
          {formatPrice(totals.total)}
        </dd>
      </div>
    </dl>
  );
}