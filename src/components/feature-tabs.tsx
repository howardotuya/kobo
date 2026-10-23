"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tab = { id: string; label: string };

/**
 * WAI-ARIA tabs (automatic activation). Panels are server-rendered and passed
 * in, so all four are in the HTML. Each tab's id is also an in-page anchor:
 * #pay-links (e.g. from the footer) opens that tab, and choosing a tab updates
 * the hash without scrolling.
 */
export function FeatureTabs({ tabs, panels }: { tabs: Tab[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const fromHash = () => {
      const i = tabs.findIndex((t) => `#${t.id}` === location.hash);
      if (i >= 0) setActive(i);
    };
    fromHash();
    addEventListener("hashchange", fromHash);
    return () => removeEventListener("hashchange", fromHash);
  }, [tabs]);

  const select = (i: number, focus = false) => {
    setActive(i);
    history.replaceState(null, "", `#${tabs[i]!.id}`);
    if (focus) buttons.current[i]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const last = tabs.length - 1;
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next < 0 ? last : next > last ? 0 : next, true);
  };

  return (
    <>
      <div className="max-lg:-mx-(--gutter) max-lg:[scrollbar-width:none] max-lg:overflow-x-auto">
        <div
          role="tablist"
          aria-label="Features"
          className="relative mx-auto flex w-max min-w-full border-b border-line max-lg:gap-5 max-lg:px-[calc(var(--gutter)-4px)] lg:grid lg:w-[720px] lg:min-w-0 lg:grid-cols-4"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              id={tab.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${tab.id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "tab relative min-h-11 px-1 pb-2.5 text-[15px] leading-[1.3] font-medium transition-colors duration-200 lg:text-[17px]",
                i === active ? "text-ink" : "text-soft hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          ))}
          <span aria-hidden="true" className="tab-indicator" />
        </div>
      </div>

      {panels.map((panel, i) => (
        <div
          key={tabs[i]!.id}
          id={`${tabs[i]!.id}-panel`}
          role="tabpanel"
          aria-labelledby={tabs[i]!.id}
          hidden={i !== active}
          className="motion-safe:animate-[panel-in_500ms_var(--ease-out-expo)]"
        >
          {panel}
        </div>
      ))}
    </>
  );
}
