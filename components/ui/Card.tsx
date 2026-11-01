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
        "rounded-2xl border border-border bg-surface p-4",
        interactive &&
          "transition hover:-translate-y-1 hover:border-sand hover:shadow-lg",
        className
      )}
      {...props}
    />
  );
}