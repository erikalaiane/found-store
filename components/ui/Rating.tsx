type RatingProps = {
  value: number;
  count?: number;
};

export default function Rating({ value, count }: RatingProps) {
  const filled = Math.round(value);

  return (
    <div
      className="flex items-center gap-1.5 text-sm"
      role="img"
      aria-label={`Nota ${value.toFixed(1)} de 5${
        count ? `, ${count} avaliações` : ""
      }`}
    >
      <span aria-hidden className="text-sand">
        {"★".repeat(filled)}
        <span className="text-foreground/25">{"★".repeat(5 - filled)}</span>
      </span>
      <span aria-hidden className="text-foreground/70">
        {value.toFixed(1)}
        {count ? ` (${count})` : ""}
      </span>
    </div>
  );
}