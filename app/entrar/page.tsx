import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Entrar | Found Store" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Suspense fallback={null}>
        <AuthForm mode="login" />
      </Suspense>
    </div>
  );
}