"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { validateAuth, type AuthErrors } from "@/lib/auth";
import { useAuth } from "@/lib/use-auth";

const safeNext = (next: string | null) =>
  next && next.startsWith("/") && !next.startsWith("//") ? next : "/conta";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const auth = useAuth();

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<AuthErrors>({});

  const isRegister = mode === "register";
  const rawNext = params.get("next");
  const next = safeNext(rawNext);
  const switchHref = `${isRegister ? "/entrar" : "/cadastrar"}${
    rawNext ? `?next=${encodeURIComponent(next)}` : ""
  }`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateAuth(values, mode);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (isRegister) auth.register(values.name, values.email);
    else auth.login(values.email);

    toast(isRegister ? "Conta criada com sucesso!" : "Login feito com sucesso.", "success");
    router.push(next);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-md flex-col gap-5 rounded-3xl border border-foreground/10 bg-surface/60 p-8 backdrop-blur-md"
    >
      <header>
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          {isRegister ? "// Nova conta" : "// Bem-vindo de volta"}
        </p>
        <h1 className="font-display text-4xl text-heading">
          {isRegister ? "Criar conta" : "Entrar"}
          <span className="text-accent">.</span>
        </h1>
      </header>

      {isRegister && (
        <Input
          label="Nome completo"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
      )}
      <Input
        label="E-mail"
        type="email"
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />
      <Input
        label="Senha"
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
        value={values.password}
        error={errors.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
      />

      <Button type="submit" variant="accent" size="lg">
        {isRegister ? "Criar conta" : "Entrar"}
      </Button>

      <p className="text-center text-sm text-foreground/70">
        {isRegister ? "Já tem conta? " : "Ainda não tem conta? "}
        <Link href={switchHref} className="text-sand underline">
          {isRegister ? "Entrar" : "Cadastre-se"}
        </Link>
      </p>

      <p className="text-center text-xs text-foreground/50">
        Ambiente de demonstração: nenhuma senha é salva ou verificada.
      </p>
    </form>
  );
}