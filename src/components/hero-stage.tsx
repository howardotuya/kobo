import type { CSSProperties, ReactNode } from "react";
import { hero } from "@/content/landing";
import { cn } from "@/lib/cn";
import {
  ArrowRightIcon,
  BankIcon,
  CurveArrowLeft,
  CurveArrowRight,
  ReceiptIcon,
  SparkleIcon,
} from "./icons";
import { InvoiceScreenLg, InvoiceScreenSm } from "./invoice-screen";
import { Phone, u } from "./phone";

// Entrance animations; delays are set per layer. Everything lands by 900ms.
const GROW = "motion-safe:animate-[grow_700ms_var(--ease-out-expo)_both]";
const RISE = "motion-safe:animate-[fade-up_650ms_var(--ease-out-expo)_both]";
const POP = "motion-safe:animate-[pop_420ms_var(--ease-out-expo)_both]";
const FLOAT = "motion-safe:animate-float";

const cardShadow = "shadow-[0_10px_30px_rgb(15_26_20/0.08)]";

type LayerProps = {
  /** Position and size in stage pixels (the Figma frame, relative to the stage). */
  x: number;
  y: number;
  w?: number;
  h?: number;
  /** Pointer parallax travel in px; bigger = closer to the viewer. */
  depth?: number;
  enter: string;
  delay?: number;
  children: ReactNode;
};

function Layer({ x, y, w, h, depth = 0, enter, delay = 0, children }: LayerProps) {
  return (
    <div
      className={cn("absolute parallax", enter)}
      style={
        {
          left: u(x),
          top: u(y),
          width: w === undefined ? undefined : u(w),
          height: h === undefined ? undefined : u(h),
          "--depth": depth,
          animationDelay: `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** Idle bob, desynced per card with a negative delay. */
function Float({
  offset,
  rotate,
  className,
  children,
}: {
  offset: number;
  rotate?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("size-full", FLOAT, className)}
      style={{ animationDelay: `${offset}s`, rotate: rotate ? `${rotate}deg` : undefined }}
    >
      {children}
    </div>
  );
}

const stageLabel =
  "Kòbò on a phone: invoice #0042 to Adaeze Studio for ₦450,000, paid via Paystack in 2 days.";

/** The 700×700 composition around the hero phone in the 1440 frame (Figma 3:54–3:101). */
export function HeroStageLg() {
  return (
    <div className="@container">
      <div
        role="img"
        aria-label={stageLabel}
        className="relative aspect-square [--spacing:calc(100cqi/700)]"
      >
        <Layer x={70} y={70} w={560} h={560} depth={6} enter={GROW}>
          <div className="size-full rounded-full bg-[radial-gradient(closest-side,var(--color-lime),color-mix(in_oklab,var(--color-lime)_35%,transparent))]" />
        </Layer>
        <Layer x={0} y={0} w={700} h={700} depth={3} enter={GROW} delay={60}>
          <div className="size-full rounded-full border-[1.5px] border-line" />
        </Layer>

        <Layer x={200} y={10} w={300} depth={10} enter={RISE} delay={150}>
          <Phone width={300} height={620}>
            <InvoiceScreenLg />
          </Phone>
        </Layer>

        <Layer x={10} y={90} w={170} h={150} depth={22} enter={POP} delay={300}>
          <Float offset={-1} className={cn("relative rounded-u-14 bg-yellow", cardShadow)}>
            <SparkleIcon className="absolute" style={{ left: u(20), top: u(18), width: u(28) }} />
            {/* Geist sets a hair narrower in browsers than in Figma; 122 reproduces Figma's breaks. */}
            <p
              className="absolute text-u-20 leading-[1.15] font-semibold tracking-[-0.02em] text-wrap"
              style={{ left: u(20), top: u(60), width: u(122) }}
            >
              {hero.cards.paid}
            </p>
          </Float>
        </Layer>

        <Layer x={480} y={140} w={210} h={150} depth={26} enter={POP} delay={380}>
          <Float offset={-3.5} className={cn("relative rounded-u-14 bg-mint", cardShadow)}>
            <BankIcon className="absolute" style={{ left: u(20), top: u(18), width: u(28) }} />
            <p
              className="absolute text-u-20 leading-[1.15] font-semibold tracking-[-0.02em]"
              style={{ left: u(20), top: u(60), width: u(170) }}
            >
              {hero.cards.lands}
            </p>
          </Float>
        </Layer>

        <Layer x={50} y={400} w={150} h={150} depth={18} enter={POP} delay={460}>
          <Float
            offset={-2}
            className={cn("relative rounded-u-14 bg-coral text-white", cardShadow)}
          >
            <ReceiptIcon className="absolute" style={{ left: u(18), top: u(18), width: u(26) }} />
            <p
              className="absolute text-u-28 font-semibold tracking-[-0.03em]"
              style={{ left: u(18), top: u(62) }}
            >
              {hero.cards.due.amount}
            </p>
            <p
              className="absolute rounded-full bg-ink text-u-11 leading-none font-medium"
              style={{ left: u(18), top: u(106), padding: `${u(4.5)} ${u(8)}` }}
            >
              {hero.cards.due.label}
            </p>
          </Float>
        </Layer>

        {/* Nudged 10px right of Figma so it clears the Paystack bar's end cap. */}
        <Layer x={470} y={460} depth={30} enter={POP} delay={520}>
          <Float offset={-4.5}>
            <p
              className="flex items-center rounded-u-14 bg-ink text-u-16 font-medium whitespace-nowrap text-white shadow-[0_12px_30px_rgb(15_26_20/0.15)]"
              style={{ padding: `${u(16)} ${u(22)}`, gap: u(8) }}
            >
              {hero.cards.reminder}
              <ArrowRightIcon style={{ width: u(16) }} />
            </p>
          </Float>
        </Layer>

        <Layer x={80} y={20} w={120} h={60} depth={14} enter={RISE} delay={420}>
          <CurveArrowLeft className="size-full text-ink" />
        </Layer>
        <Layer x={460} y={70} w={120} h={50} depth={14} enter={RISE} delay={420}>
          <CurveArrowRight className="size-full text-ink" />
        </Layer>
      </div>
    </div>
  );
}

/** The 350×420 composition in the 390 frame (Figma 8:26–8:50). */
export function HeroStageSm() {
  return (
    <div className="@container">
      <div
        role="img"
        aria-label={stageLabel}
        className="relative aspect-[350/420] [--spacing:calc(100cqi/350)]"
      >
        <Layer x={5} y={40} w={340} h={340} enter={GROW}>
          <div className="size-full rounded-full bg-lime" />
        </Layer>

        <Layer x={75} y={0} w={200} enter={RISE} delay={150}>
          <Phone width={200} height={420} frame="sm">
            <InvoiceScreenSm />
          </Phone>
        </Layer>

        <Layer x={2.2} y={62.35} w={92} h={86} enter={POP} delay={300}>
          <Float
            offset={-1}
            rotate={3}
            className="relative rounded-u-12 bg-yellow shadow-[0_8px_20px_rgb(15_26_20/0.08)]"
          >
            <div
              className="absolute text-u-15 leading-[1.15] font-semibold"
              style={{ left: u(12), top: u(10), width: u(70) }}
            >
              {/* Figma sets a filled ✦ here; Geist has no such glyph. */}
              <span className="flex h-[1.15em] items-center">
                <SparkleIcon fill="currentColor" className="w-[1.05em]" />
              </span>
              {hero.cards.paidShort.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Float>
        </Layer>

        <Layer x={260} y={267.6} w={88} h={80} enter={POP} delay={400}>
          <Float
            offset={-2.5}
            rotate={-3}
            className="relative rounded-u-12 bg-coral text-white shadow-[0_8px_20px_rgb(15_26_20/0.08)]"
          >
            <p className="absolute text-u-22 font-semibold" style={{ left: u(12), top: u(12) }}>
              {hero.cards.due.amount}
            </p>
            <p className="absolute text-u-11 font-medium" style={{ left: u(12), top: u(48) }}>
              {hero.cards.due.label}
            </p>
          </Float>
        </Layer>

        <Layer x={10} y={360} w={180} h={44} enter={POP} delay={500}>
          <Float offset={-4}>
            <p
              className="flex size-full items-center justify-center rounded-u-14 bg-ink text-u-16 font-medium text-white shadow-[0_10px_24px_rgb(15_26_20/0.15)]"
              style={{ gap: u(6) }}
            >
              {hero.cards.reminder}
              <ArrowRightIcon style={{ width: u(16) }} />
            </p>
          </Float>
        </Layer>
      </div>
    </div>
  );
}
