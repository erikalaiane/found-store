import {
  emptyAuth,
  nameFromEmail,
  normalizeEmail,
  parseAuth,
  type AuthState,
} from "./auth";
import { createLocalStore } from "./local-store";

export const SESSION_COOKIE = "found-store-session";

export const authStore = createLocalStore<AuthState>(
  "found-store-auth",
  emptyAuth,
  parseAuth
);

// Cookie de demonstração: é ele que a rota protegida (proxy.ts) consulta.
function setSessionCookie(active: boolean) {
  document.cookie = `${SESSION_COOKIE}=${active ? "1" : ""}; path=/; max-age=${
    active ? 60 * 60 * 24 * 7 : 0
  }; samesite=lax`;
}

export const authActions = {
  login(email: string) {
    const key = normalizeEmail(email);
    authStore.set((s) => ({
      ...s,
      user: { email: key, name: s.profiles[key] ?? nameFromEmail(key) },
    }));
    setSessionCookie(true);
  },
  register(name: string, email: string) {
    const key = normalizeEmail(email);
    const clean = name.trim();
    authStore.set((s) => ({
      user: { email: key, name: clean },
      profiles: { ...s.profiles, [key]: clean },
    }));
    setSessionCookie(true);
  },
  logout() {
    authStore.set((s) => ({ ...s, user: null }));
    setSessionCookie(false);
  },
};