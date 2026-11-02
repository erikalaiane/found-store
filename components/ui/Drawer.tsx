"use client";

import { useEffect, useId, useRef } from "react";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Drawer({ open, onClose, title, children }: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md border-l border-border bg-surface/95 text-foreground backdrop-blur-xl backdrop:bg-black/60 open:flex open:flex-col"
    >
      <div className="flex shrink-0 items-start justify-between gap-4 p-6 pb-4">
        <h2 id={titleId} className="font-display text-3xl text-heading">
          {title}
        </h2>
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="rounded-full px-2 py-1 text-xl hover:bg-background"
        >
          ✕
        </button>
      </div>
      <div className="scroll-thin flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-6">
        {children}
      </div>
    </dialog>
  );
}