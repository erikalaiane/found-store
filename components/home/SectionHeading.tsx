type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  index?: string;
  ghost?: string;
  action?: React.ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  index,
  ghost,
  action,
}: SectionHeadingProps) {
  return (
    <div className="relative mb-8 flex items-end justify-between gap-4 overflow-hidden py-6">
      {ghost && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 font-display text-[5rem] leading-none whitespace-nowrap text-foreground/5 select-none md:text-[8rem]"
        >
          {ghost}
        </span>
      )}
      <div className="relative">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          {index ? `// ${index} — ` : "// "}
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl text-heading md:text-5xl">
          {title}
          <span className="text-accent">.</span>
        </h2>
      </div>
      {action && <div className="relative">{action}</div>}
    </div>
  );
}