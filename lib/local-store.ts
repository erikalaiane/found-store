export function createLocalStore<T>(
  key: string,
  empty: T,
  parse: (raw: unknown) => T
) {
  let state: T = empty;
  let loaded = false;
  const listeners = new Set<() => void>();

  function load() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = localStorage.getItem(key);
      if (raw) state = parse(JSON.parse(raw));
    } catch {}
  }

  function emit() {
    listeners.forEach((listener) => listener());
  }

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);

      const onStorage = (event: StorageEvent) => {
        if (event.key !== key) return;
        try {
          state = event.newValue ? parse(JSON.parse(event.newValue)) : empty;
        } catch {
          state = empty;
        }
        emit();
      };
      window.addEventListener("storage", onStorage);

      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },

    getSnapshot(): T {
      load();
      return state;
    },

    getServerSnapshot(): T {
      return empty;
    },

    set(updater: (current: T) => T) {
      load();
      state = updater(state);
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch {}
      emit();
    },
  };
}