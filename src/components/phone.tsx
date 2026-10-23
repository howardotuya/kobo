import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Length in design pixels of the nearest scaled artwork (see `text-u-*` in the preset). */
export const u = (px: number) => `calc(var(--spacing) * ${px})`;

const frames = {
  // 300×620 hero phone and 280×560 builder phone in the 1440 frame.
  lg: {
    bezel: 10,
    radius: 48,
    screen: 40,
    island: [90, 26, 12],
    shadow: "0 30px 60px rgb(15 26 20 / 0.18)",
  },
  // 200×420 phones in the 390 frame.
  sm: {
    bezel: 8,
    radius: 40,
    screen: 33,
    island: [70, 20, 10],
    shadow: "0 24px 50px rgb(15 26 20 / 0.18)",
  },
} as const;

type PhoneProps = {
  /** Phone size in Figma pixels; the phone scales to whatever width it's given. */
  width: number;
  height: number;
  frame?: keyof typeof frames;
  className?: string;
  /** Screen content, positioned in screen pixels from the Figma frame. */
  children: ReactNode;
};

/**
 * Device mockup drawn in CSS. Everything inside is measured in Figma pixels
 * (via a local --spacing), so the whole phone scales as one picture.
 */
export function Phone({ width, height, frame = "lg", className, children }: PhoneProps) {
  const f = frames[frame];
  const [islandW, islandH, islandTop] = f.island;
  return (
    <div className={cn("@container", className)}>
      <div
        className="relative [--spacing:calc(100cqi/var(--w))]"
        style={{ "--w": width, aspectRatio: `${width} / ${height}` } as CSSProperties}
      >
        <div
          className="absolute inset-0 bg-bezel"
          style={{ borderRadius: u(f.radius), boxShadow: f.shadow }}
        />
        <div
          className="absolute overflow-hidden bg-white text-ink"
          style={{ inset: u(f.bezel), borderRadius: u(f.screen) }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-bezel"
            style={{
              top: u(islandTop),
              width: u(islandW),
              height: u(islandH),
              borderRadius: u(islandH / 2),
            }}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
