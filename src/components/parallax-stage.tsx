"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

/**
 * Writes the pointer position (-1…1 from the stage centre) to --mx/--my so the
 * `parallax` layers inside can drift. Desktop pointers only; nothing runs on
 * touch devices or with reduced motion.
 */
export function ParallaxStage({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const query = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
    if (!el || !matchMedia(query).matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        if (box.bottom < 0 || box.top > innerHeight) return;
        el.style.setProperty(
          "--mx",
          clamp((event.clientX - box.left - box.width / 2) / (innerWidth / 2)).toFixed(3),
        );
        el.style.setProperty(
          "--my",
          clamp((event.clientY - box.top - box.height / 2) / (innerHeight / 2)).toFixed(3),
        );
      });
    };

    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
