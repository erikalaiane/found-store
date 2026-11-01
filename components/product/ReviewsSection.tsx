import Card from "@/components/ui/Card";
import Rating from "@/components/ui/Rating";
import { getReviews } from "@/data/reviews";

const stars = [5, 4, 3, 2, 1];

function distribution(rate: number) {
  const weights = stars.map((star) => Math.exp(-((star - rate) ** 2) / 1.2));
  const total = weights.reduce((sum, w) => sum + w, 0);
  return stars.map((star, i) => ({
    star,
    percent: Math.round((weights[i] / total) * 100),
  }));
}

type Props = { productId: number; rate: number; count: number };

export default function ReviewsSection({ productId, rate, count }: Props) {
  const bars = distribution(rate);
  const reviews = getReviews(productId);

  return (
    <section aria-labelledby="avaliacoes-titulo">
      <h2
        id="avaliacoes-titulo"
        className="mb-6 font-display text-4xl text-heading md:text-5xl"
      >
        Avaliações
      </h2>

      <div className="grid gap-8 md:grid-cols-[18rem_1fr]">
        <div>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-8xl leading-none text-sand">
              {rate.toFixed(1).replace(".", ",")}
            </span>
            <span className="text-foreground/60">/ 5</span>
          </p>
          <p className="mt-1 mb-4 text-sm text-foreground/60">
            {count} avaliações
          </p>
          <ul className="flex flex-col gap-2">
            {bars.map(({ star, percent }) => (
              <li key={star} className="flex items-center gap-3 text-sm">
                <span className="w-8 text-sand">{star} ★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/15">
                  <div
                    className="h-full rounded-full bg-sand"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-10 text-right text-foreground/60">
                  {percent}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.name}>
              <Card className="flex h-full flex-col gap-3 p-5">
                <Rating value={review.rating} />
                <p className="flex-1 text-sm text-foreground/90">
                  “{review.text}”
                </p>
                <p className="text-xs text-foreground/60">
                  <span className="font-semibold text-sand">{review.name}</span>
                  {" · "}
                  {review.date}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}