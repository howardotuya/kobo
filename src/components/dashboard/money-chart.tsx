"use client";

import { useState, type CSSProperties } from "react";
import type { Series } from "@/content/dashboard";
import { cn } from "@/lib/cn";

const naira = (v: number) => `₦${v.toLocaleString("en-NG")}`;
const compact = (v: number) =>
  v >= 1_000_000 ? `₦${+(v / 1_000_000).toFixed(2)}M` : `₦${Math.round(v / 1000)}k`;

/*
 * Pure SVG bar chart. Horizontal positions are percentages of the card (so it
 * stretches with the layout), vertical ones are pixels from the Figma frame.
 * Bars grow in on load; the tooltip follows hover and keyboard focus and rests
 * on the latest period, as in Figma.
 */

type Geometry = {
  width: number; // design width the x positions are measured against
  height: number;
  bottom: number; // y of the zero line
  plot: number; // px from zero line to the top tick
  first: number; // x of the first bar
  pitch: number;
  bar: number;
  radius: number;
};

const lg: Geometry = {
  width: 736,
  height: 236,
  bottom: 209,
  plot: 190,
  first: 83,
  pitch: 80,
  bar: 52,
  radius: 8,
};
const sm: Geometry = {
  width: 350,
  height: 180,
  bottom: 145,
  plot: 104.13 / 1.42,
  first: 23,
  pitch: 54,
  bar: 36,
  radius: 6,
};

const pct = (x: number, g: Geometry) => `${(x / g.width) * 100}%`;

function Bars({
  data,
  g,
  max,
  active,
  onActive,
}: {
  data: Series["points"];
  g: Geometry;
  max: number;
  active: number;
  onActive: (i: number) => void;
}) {
  return data.map((point, i) => {
    const h = (point.value / max) * g.plot;
    const latest = i === data.length - 1;
    return (
      <g key={i}>
        <rect
          role="img"
          tabIndex={0}
          aria-label={`${point.long}: ${naira(point.value)}`}
          x={pct(g.first + i * g.pitch, g)}
          width={pct(g.bar, g)}
          y={g.bottom - h}
          height={h}
          rx={g.radius}
          onPointerEnter={() => onActive(i)}
          onFocus={() => onActive(i)}
          onClick={() => onActive(i)}
          className={cn(
            "cursor-pointer transition-[y,height,fill] duration-500 ease-out-expo outline-none focus-visible:stroke-(--color-focus) focus-visible:[stroke-width:2]",
            "motion-safe:animate-[bar-grow_700ms_var(--ease-out-expo)_both]",
            latest
              ? "fill-forest"
              : active === i
                ? "fill-[color-mix(in_oklab,var(--color-lime),var(--color-forest)_12%)]"
                : "fill-lime",
          )}
          // y/height as CSS too, so period changes animate (SVG 2 geometry properties).
          style={{ y: g.bottom - h, height: h, animationDelay: `${i * 45}ms` } as CSSProperties}
        />
        <text
          aria-hidden="true"
          x={pct(g.first + i * g.pitch + g.bar / 2, g)}
          y={g.bottom + (g === lg ? 22 : 20)}
          textAnchor="middle"
          className={cn("fill-soft font-medium", g === lg ? "text-xs" : "text-[10px]")}
        >
          {point.short}
        </text>
      </g>
    );
  });
}

/** Desktop card body: axis, gridlines, period switch and tooltip (Figma 5:67). */
export function MoneyChartLg({ series: allSeries }: { series: Series[] }) {
  const [id, setId] = useState<Series["id"]>("monthly");
  const data = allSeries.find((s) => s.id === id)!;
  const last = data.points.length - 1;
  const [active, setActive] = useState(last);
  const max = data.ticks.at(-1)!.value;
  const point = data.points[active]!;
  const h = (point.value / max) * lg.plot;
  // Tooltip sits to the left of the bar top, flipping right near the axis.
  const left = active > 0;
  const barX = lg.first + active * lg.pitch;

  return (
    <div className="relative">
      <div className="flex items-start justify-between px-6 pt-[22px]">
        <div>
          <h2 id="money-in" className="text-lg leading-[1.3] font-semibold tracking-[-0.01em]">
            Money in
          </h2>
          <p className="mt-0.5 text-[13px] leading-[1.3] text-soft">{data.caption}</p>
        </div>
        <div
          role="group"
          aria-label="Period"
          className="relative grid w-48 grid-cols-2 rounded-[10px] bg-paper p-1"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-[0_1px_2px_rgb(15_26_20/0.06)] transition-transform duration-300 ease-out-expo"
            style={{ transform: id === "weekly" ? "translateX(100%)" : undefined }}
          />
          {allSeries.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === id}
              onClick={() => {
                setId(s.id);
                setActive(s.points.length - 1);
              }}
              className={cn(
                "relative h-[26px] rounded-lg text-[13px] font-medium transition-colors duration-200",
                s.id === id ? "text-ink" : "text-soft hover:text-ink",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-[15px] pb-3.5" onPointerLeave={() => setActive(last)}>
        <svg
          width="100%"
          height={lg.height}
          aria-labelledby="money-in"
          className="block overflow-visible"
        >
          {data.ticks.map((tick) => {
            const y = lg.bottom - (tick.value / max) * lg.plot;
            return (
              <g key={tick.label} aria-hidden="true">
                <line x1={pct(63, lg)} x2={pct(711, lg)} y1={y} y2={y} className="stroke-line" />
                <text x={pct(19, lg)} y={y + 4} className="fill-soft font-mono text-[11px]">
                  {tick.label}
                </text>
              </g>
            );
          })}
          <Bars data={data.points} g={lg} max={max} active={active} onActive={setActive} />
        </svg>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute flex flex-col gap-0.5 rounded-[10px] bg-ink px-3 py-2 whitespace-nowrap transition-[left,top] duration-300 ease-out-expo"
          style={{
            top: lg.bottom - h - 16,
            left: left ? `calc(${pct(barX, lg)} - 14px)` : `calc(${pct(barX + lg.bar, lg)} + 14px)`,
            translate: left ? "-100% 0" : undefined,
          }}
        >
          <span className="text-[11px] text-white">{point.long}</span>
          <span className="text-[15px] font-semibold text-lime">{compact(point.value)}</span>
        </div>
      </div>
    </div>
  );
}

/** Mobile card body: last six months, value above the selected bar (Figma 9:35). */
export function MoneyChartSm({ points: data }: { points: Series["points"] }) {
  const last = data.length - 1;
  const [active, setActive] = useState(last);
  const point = data[active]!;
  const center = sm.first + active * sm.pitch + sm.bar / 2;
  const anchor = active === last ? "end" : active === 0 ? "start" : "middle";
  const x =
    anchor === "end" ? center + sm.bar / 2 : anchor === "start" ? center - sm.bar / 2 : center;

  return (
    <div>
      <div className="px-[17px] pt-[15px]">
        <h2 id="money-in-sm" className="text-base leading-[1.3] font-semibold tracking-[-0.01em]">
          Money in
        </h2>
        <p className="mt-px text-xs leading-[1.3] text-soft">Last 6 months</p>
      </div>
      <svg
        width="100%"
        height={sm.height}
        aria-labelledby="money-in-sm"
        className="-mt-0.5 block overflow-visible"
      >
        <text
          aria-hidden="true"
          x={pct(x, sm)}
          y={13}
          textAnchor={anchor}
          className="fill-forest font-mono text-[13px] font-semibold transition-all duration-300"
        >
          {compact(point.value)}
        </text>
        <Bars data={data} g={sm} max={1_000_000} active={active} onActive={setActive} />
      </svg>
    </div>
  );
}
