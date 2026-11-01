import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary" | "accent" | "sand";

type BadgeProps = ComponentProps<"span"> & { tone?: Tone };

const tones: Record<Tone, string> = {
  neutral: "bg-surface text-foreground border border-border",
  primary: "bg-primary text-cream",
  accent: "bg-accent text-cream",
  sand: "bg-sand text-[#1a1a1a]",
};

export default function Badge({
  tone = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}