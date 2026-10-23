"use client";

import { useEffect, useRef } from "react";
import { setQuery, useQuery } from "./search-store";

/** Topbar search; filters the invoices table. ⌘K / Ctrl+K focuses it, as the hint says. */
export function SearchField() {
  const input = useRef<HTMLInputElement>(null);
  const query = useQuery();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.current?.focus();
        input.current?.select();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  return (
    <label className="flex h-11 w-full max-w-[420px] items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 text-soft transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_var(--color-focus)]">
      {/* Inlined so this island doesn't pull in the whole dashboard icon set. */}
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        aria-hidden="true"
        className="size-5 shrink-0"
      >
        <path d="m16.667 16.667-3.334-3.334M9.167 15a5.833 5.833 0 1 0 0-11.667 5.833 5.833 0 0 0 0 11.667Z" />
      </svg>
      <span className="sr-only">Search invoices and clients</span>
      <input
        ref={input}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search invoices, clients…"
        className="w-full min-w-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-soft [&::-webkit-search-cancel-button]:hidden"
      />
      <kbd
        aria-hidden="true"
        className="flex shrink-0 items-center gap-px font-mono text-xs font-medium"
      >
        {/* ⌘ isn't in Geist. */}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          className="size-3"
        >
          <path d="M6 6V4a2 2 0 1 0-2 2h2Zm0 0v4m0-4h4m-4 4H4a2 2 0 1 0 2 2v-2Zm0 0h4m0-4V4a2 2 0 1 1 2 2h-2Zm0 0v4m0 0h2a2 2 0 1 1-2 2v-2Z" />
        </svg>
        K
      </kbd>
    </label>
  );
}
