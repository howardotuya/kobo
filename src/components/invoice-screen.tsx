import { invoice } from "@/content/landing";
import { u } from "./phone";
import { Dot } from "./ui";

// Payment landing, played once on load: the Paystack bar wipes in, its tick
// draws, then the status pill pops with a ping.
const landing = {
  bar: "motion-safe:animate-[bar-in_600ms_var(--ease-out-expo)_700ms_both]",
  tick: "motion-safe:animate-[draw_400ms_var(--ease-out-expo)_1050ms_both]",
  pill: "motion-safe:animate-[pill-in_500ms_var(--ease-out-expo)_1200ms_both]",
  ping: "motion-safe:animate-[ping_900ms_var(--ease-out-expo)_1250ms_both] motion-reduce:hidden",
};

function Tick({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ width: u(size), height: u(size) }}
    >
      <path
        d="m2.5 8.5 3.5 3.5 7.5-8"
        pathLength={1}
        strokeDasharray="1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={landing.tick}
      />
    </svg>
  );
}

function PaidPill({
  text,
  padX,
  padY,
  top,
  left,
}: {
  text: number;
  padX: number;
  padY: number;
  top: number;
  left: number;
}) {
  return (
    <span
      className={`absolute flex items-center rounded-full bg-mint leading-none font-medium text-green-ink ${landing.pill}`}
      style={{
        top: u(top),
        left: u(left),
        fontSize: u(text),
        padding: `${u(padY)} ${u(padX)}`,
        gap: u(text * 0.4),
      }}
    >
      <span className="relative inline-flex">
        <Dot className={`absolute inset-0 size-full ${landing.ping}`} />
        <Dot className="size-[0.6em]" />
      </span>
      {invoice.status}
    </span>
  );
}

/** Invoice #0042 on the 300×620 hero phone (Figma 3:57). */
export function InvoiceScreenLg() {
  return (
    <div className="absolute inset-0 leading-[1.3]">
      <p className="absolute font-semibold" style={{ left: u(26), top: u(16), fontSize: u(13) }}>
        9:41
      </p>
      <p
        className="absolute font-semibold tracking-[-0.01em]"
        style={{ left: u(22), top: u(60), fontSize: u(20) }}
      >
        {invoice.number}
      </p>
      <PaidPill text={12} padX={10} padY={6} top={62} left={200} />

      <p className="absolute text-soft" style={{ left: u(22), top: u(104), fontSize: u(12) }}>
        Billed to
      </p>
      <p className="absolute font-medium" style={{ left: u(22), top: u(122), fontSize: u(15) }}>
        {invoice.billedTo}
      </p>
      <p className="absolute text-soft" style={{ left: u(22), top: u(160), fontSize: u(12) }}>
        Amount
      </p>
      <p
        className="absolute font-medium tracking-[-0.03em]"
        style={{ left: u(20), top: u(176), fontSize: u(38) }}
      >
        {invoice.amount}
      </p>

      <div className="absolute h-px bg-line" style={{ left: u(22), right: u(22), top: u(240) }} />
      {invoice.lines.map((line, i) => (
        <div
          key={line.label}
          className="absolute flex justify-between"
          style={{ left: u(22), right: u(22), top: u(258 + i * 34), fontSize: u(13) }}
        >
          <span>{line.label}</span>
          <span className="font-mono font-medium">{line.amount}</span>
        </div>
      ))}
      <div className="absolute h-px bg-line" style={{ left: u(22), right: u(22), top: u(366) }} />
      <div
        className="absolute flex justify-between"
        style={{ left: u(22), right: u(22), top: u(382), fontSize: u(14) }}
      >
        <span className="font-medium">Total</span>
        <span className="font-mono font-semibold">{invoice.total}</span>
      </div>

      <div
        className={`absolute flex items-center justify-center bg-forest font-medium text-lime ${landing.bar}`}
        style={{
          left: u(22),
          right: u(22),
          top: u(428),
          height: u(50),
          borderRadius: u(14),
          fontSize: u(14),
          gap: u(8),
        }}
      >
        <Tick size={15} />
        {invoice.paidVia} · {invoice.paidAfter}
      </div>
      <p
        className="absolute text-center text-soft"
        style={{ left: u(22), right: u(22), top: u(494), fontSize: u(12) }}
      >
        {invoice.receipt}
      </p>
    </div>
  );
}

/** The shorter invoice on the 200×420 phone in the 390 frame (Figma 8:28). */
export function InvoiceScreenSm() {
  return (
    <div className="absolute inset-0 leading-[1.3]">
      <p
        className="absolute font-semibold tracking-[-0.01em]"
        style={{ left: u(16), top: u(42), fontSize: u(15) }}
      >
        {invoice.number}
      </p>
      <p className="absolute text-soft" style={{ left: u(16), top: u(64), fontSize: u(11) }}>
        {invoice.billedTo}
      </p>
      <p
        className="absolute font-medium tracking-[-0.03em]"
        style={{ left: u(14), top: u(82), fontSize: u(28) }}
      >
        {invoice.amount}
      </p>
      <PaidPill text={10} padX={8} padY={5} top={126} left={16} />

      <div className="absolute h-px bg-line" style={{ left: u(16), right: u(16), top: u(160) }} />
      {invoice.lines.map((line, i) => (
        <div
          key={line.label}
          className="absolute flex justify-between"
          style={{ left: u(16), right: u(16), top: u(172 + i * 24), fontSize: u(11) }}
        >
          <span>{line.short}</span>
          <span className="font-mono font-medium">{line.amount}</span>
        </div>
      ))}

      <div
        className={`absolute flex items-center justify-center bg-forest font-medium text-lime ${landing.bar}`}
        style={{
          left: u(16),
          right: u(16),
          top: u(256),
          height: u(40),
          borderRadius: u(10),
          fontSize: u(11),
          gap: u(6),
        }}
      >
        <Tick size={12} />
        {invoice.paidVia}
      </div>
    </div>
  );
}
