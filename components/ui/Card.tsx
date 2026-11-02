import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentProps<"div"> & {
  interactive?: boolean;
};

export default function Card({
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-foreground/10 bg-surface/60 p-4 backdrop-blur-md",
        interactive &&
          "transition hover:-translate-y-1 hover:border-sand/60 hover:shadow-[0_12px_40px_-12px] hover:shadow-sand/30",
        className
      )}
      {...props}
    />
  );
}