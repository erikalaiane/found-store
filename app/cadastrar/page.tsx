import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Criar conta | Found Store" };

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Suspense fallback={null}>
        <AuthForm mode="register" />
      </Suspense>
    </div>
  );
}