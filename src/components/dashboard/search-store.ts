"use client";

import { useSyncExternalStore } from "react";

// The topbar search and the invoices table live in different client islands;
// this tiny store connects them without a context provider around the page.
let query = "";
const listeners = new Set<() => void>();

export function setQuery(next: string) {
  query = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useQuery() {
  return useSyncExternalStore(
    subscribe,
    () => query,
    () => "",
  );
}
