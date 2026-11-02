export type User = { name: string; email: string };

export type AuthState = {
  user: User | null;
  profiles: Record<string, string>;
};

export const emptyAuth: AuthState = { user: null, profiles: {} };

export type AuthErrors = Partial<Record<"name" | "email" | "password", string>>;

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export function nameFromEmail(email: string) {
  const local = email.split("@")[0].replace(/[._-]+/g, " ").trim();
  return local.replace(/\b\p{L}/gu, (c) => c.toUpperCase()) || "Cliente";
}

export function validateAuth(
  values: { name?: string; email: string; password: string },
  mode: "login" | "register"
): AuthErrors {
  const errors: AuthErrors = {};
  if (
    mode === "register" &&
    (values.name ?? "").trim().split(/\s+/).filter(Boolean).length < 2
  ) {
    errors.name = "Digite nome e sobrenome.";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Digite um e-mail válido.";
  }
  if (values.password.length < 6) {
    errors.password = "A senha precisa ter pelo menos 6 caracteres.";
  }
  return errors;
}

export function parseAuth(raw: unknown): AuthState {
  if (!raw || typeof raw !== "object") return emptyAuth;
  const data = raw as { user?: unknown; profiles?: unknown };

  const u = data.user as Partial<User> | null | undefined;
  const user =
    u && typeof u.name === "string" && typeof u.email === "string"
      ? { name: u.name, email: u.email }
      : null;

  const profiles: Record<string, string> = {};
  if (data.profiles && typeof data.profiles === "object") {
    for (const [key, value] of Object.entries(data.profiles)) {
      if (typeof value === "string") profiles[key] = value;
    }
  }
  return { user, profiles };
}