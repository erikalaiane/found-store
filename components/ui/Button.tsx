import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-cream hover:brightness-110",
  accent: "bg-accent text-cream shadow-[0_0_28px_-8px] shadow-accent hover:brightness-110",
  outline: "border border-border text-foreground hover:bg-surface",
  ghost: "text-foreground hover:bg-surface",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, size, className)}
      {...props}
    />
  );
}