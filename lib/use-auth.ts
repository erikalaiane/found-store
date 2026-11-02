"use client";

import { useSyncExternalStore } from "react";
import { authActions, authStore } from "./auth-store";

export function useAuth() {
  const state = useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
    authStore.getServerSnapshot
  );
  return { user: state.user, ...authActions };
}