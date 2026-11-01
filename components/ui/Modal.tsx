"use client";

import { useEffect, useId, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
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
      className="m-auto w-[min(92vw,32rem)] rounded-2xl border border-border bg-surface p-6 text-foreground backdrop:bg-black/60"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
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
      {children}
    </dialog>
  );
}