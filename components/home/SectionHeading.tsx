type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  action,
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="mb-1 flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase">
          <span aria-hidden className="h-px w-6 bg-accent" />
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl text-heading md:text-5xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}