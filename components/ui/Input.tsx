import { useId } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type InputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-sand">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "rounded-xl border bg-surface px-4 py-2.5 text-foreground placeholder:text-foreground/40",
          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sand",
          error ? "border-accent" : "border-border",
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}