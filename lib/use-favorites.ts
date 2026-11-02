"use client";

import { useSyncExternalStore } from "react";
import { favoritesStore, toggleFavorite } from "./favorites-store";

export function useFavorites() {
  const ids = useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.getSnapshot,
    favoritesStore.getServerSnapshot
  );

  return {
    ids,
    isFavorite: (id: number) => ids.includes(id),
    toggle: toggleFavorite,
  };
}