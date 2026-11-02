import { createLocalStore } from "./local-store";

export const favoritesStore = createLocalStore<number[]>(
  "found-store-favorites",
  [],
  (raw) =>
    Array.isArray(raw)
      ? raw.filter((id): id is number => typeof id === "number")
      : []
);

export function toggleFavorite(id: number) {
  favoritesStore.set((ids) =>
    ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
  );
}