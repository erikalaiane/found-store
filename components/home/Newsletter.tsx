"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Digite um e-mail válido.");
      return;
    }
    setError("");
    setEmail("");
    toast("Inscrição feita! Confira seu e-mail.", "success");
  }

  return (
    <section
      aria-labelledby="newsletter-titulo"
      className="grid items-center gap-6 rounded-3xl border border-border bg-surface p-8 md:grid-cols-2 md:p-12"
    >
      <div>
        <h2
          id="newsletter-titulo"
          className="font-display text-4xl text-heading md:text-5xl"
        >
          Entre para a comunidade
        </h2>
        <p className="mt-2 text-foreground/80">
          Receba novidades, ofertas especiais e 10% de desconto na primeira
          compra.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="E-mail"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
        </div>
        <Button type="submit" variant="accent" size="lg">
          Inscrever
        </Button>
      </form>
    </section>
  );
}