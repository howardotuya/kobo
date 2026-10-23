"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Horizontal scroll-snap rail (pure CSS) with position dots. The dots only
 * report position, swiping is the interaction, so they're hidden from
 * assistive tech; the rail itself is focusable for arrow-key scrolling.
 */
export function UseCaseRail({ label, children }: { label: string; children: ReactNode[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Snap position from scroll offset; the last dot lights when the rail can't scroll further.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const [first, second] = el.children;
        if (!first || !second) return;
        const step = (second as HTMLElement).offsetLeft - (first as HTMLElement).offsetLeft;
        const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
        setActive(atEnd ? el.children.length - 1 : Math.round(el.scrollLeft / step));
      });
    };
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      el.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <ul
        ref={rail}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- scrollable region must be keyboard reachable
        tabIndex={0}
        aria-label={label}
        className="-mx-(--gutter) flex snap-x snap-mandatory scroll-px-(--gutter) [scrollbar-width:none] gap-4 overflow-x-auto px-(--gutter) md:gap-6 xl:mx-0 xl:grid xl:grid-cols-4 xl:overflow-visible xl:px-0"
      >
        {children.map((child, i) => (
          <li key={i} className="shrink-0 snap-start">
            {child}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-5 flex justify-center gap-2.5 xl:hidden">
        {children.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 rounded-full transition-[width,background-color] duration-300 ease-out-expo",
              i === active ? "w-5 bg-ink" : "w-2 bg-line",
            )}
          />
        ))}
      </div>
    </>
  );
}
