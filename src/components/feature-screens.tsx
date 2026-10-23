import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { u } from "./phone";

/*
 * Screen parts for the feature-panel phones. Two scales, measured from the
 * Figma invoice builder: `lg` = 280×560 phone (3:126), `sm` = 200×420 phone
 * (8:68). Line heights and gaps are chosen so the flow layout lands on
 * Figma's exact y positions.
 */
const kits = {
  lg: {
    pad: 20,
    top: 56,
    title: [18, 23, 13],
    label: [11, 14, 4],
    field: [40, 10, 12, 14],
    row: 8,
    block: 14,
    toggle: [44, 13],
    button: [46, 12],
  },
  sm: {
    pad: 14,
    top: 40,
    title: [14, 18, 6],
    label: [9, 12, 2],
    field: [30, 8, 8, 11],
    row: 6,
    block: 12,
    toggle: [34, 10],
    button: [36, 10],
  },
} as const;

export type ScreenSize = keyof typeof kits;
type Kit = (typeof kits)[ScreenSize];

function Body({ kit, children }: { kit: Kit; children: ReactNode }) {
  return (
    <div
      className="absolute flex flex-col"
      style={{ left: u(kit.pad), right: u(kit.pad), top: u(kit.top) }}
    >
      {children}
    </div>
  );
}

function Title({ kit, children }: { kit: Kit; children: ReactNode }) {
  const [size, lh, gap] = kit.title;
  return (
    <p
      className="font-semibold tracking-[-0.01em]"
      style={{ fontSize: u(size), lineHeight: u(lh), marginBottom: u(gap) }}
    >
      {children}
    </p>
  );
}

function Label({ kit, children }: { kit: Kit; children: ReactNode }) {
  const [size, lh, gap] = kit.label;
  return (
    <p className="text-soft" style={{ fontSize: u(size), lineHeight: u(lh), marginBottom: u(gap) }}>
      {children}
    </p>
  );
}

function Box({
  kit,
  className,
  style,
  children,
}: {
  kit: Kit;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [height, radius, padX, text] = kit.field;
  return (
    <div
      className={cn("flex items-center justify-between bg-paper font-medium", className)}
      style={{
        height: u(height),
        borderRadius: u(radius),
        paddingInline: u(padX),
        fontSize: u(text),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Field({
  kit,
  label,
  value,
  mono,
}: {
  kit: Kit;
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div style={{ marginBottom: u(kit.row) }}>
      <Label kit={kit}>{label}</Label>
      <Box kit={kit} className={mono ? "font-mono" : undefined}>
        {value}
      </Box>
    </div>
  );
}

function Toggle({ kit, label, on }: { kit: Kit; label: string; on: boolean }) {
  const [height, text] = kit.toggle;
  return (
    <Box
      kit={kit}
      className="bg-lime-soft text-forest"
      style={{ height: u(height), fontSize: u(text), marginTop: u(kit.block - kit.row) }}
    >
      {label}
      <span
        className={cn("relative rounded-full", on ? "bg-forest" : "bg-line")}
        style={{ width: u(34 * (height / 44)), height: u(20 * (height / 44)) }}
      >
        <span
          className={cn(
            "absolute top-1/2 aspect-square -translate-y-1/2 rounded-full",
            on ? "bg-lime" : "bg-white",
          )}
          style={{ height: "70%", [on ? "right" : "left"]: "9%" }}
        />
      </span>
    </Box>
  );
}

function Button({ kit, children }: { kit: Kit; children: ReactNode }) {
  const [height, radius] = kit.button;
  return (
    <div
      className="flex items-center justify-center bg-ink font-medium text-white"
      style={{
        height: u(height),
        borderRadius: u(radius),
        fontSize: u(kit.field[3]),
        marginTop: u(kit.block - kit.row),
      }}
    >
      {children}
    </div>
  );
}

/** Invoices tab: the builder from Figma. The 390 frame drops the toggle row. */
export function BuilderScreen({ size }: { size: ScreenSize }) {
  const kit = kits[size];
  return (
    <Body kit={kit}>
      <Title kit={kit}>New invoice</Title>
      <Field kit={kit} label="Client" value="Lola Bakes" />
      <Field kit={kit} label="Work" value="Wedding cake shoot" />
      <Field kit={kit} label="Amount" value="₦85,000" />
      <Field kit={kit} label="Due" value="Fri, 31 Oct" />
      {size === "lg" && <Toggle kit={kit} label="Add Paystack link" on />}
      <Button kit={kit}>Send invoice</Button>
    </Body>
  );
}

/* The three screens below are drafts: not in Figma, pending Howard's review. */

export function PayLinkScreen({ size }: { size: ScreenSize }) {
  const kit = kits[size];
  return (
    <Body kit={kit}>
      <Title kit={kit}>New pay link</Title>
      <Field kit={kit} label="For" value="Ankara dress deposit" />
      <Field kit={kit} label="Amount" value="₦40,000" />
      <Field
        kit={kit}
        label="Your link"
        value={<span className="text-green">kobo.ng/p/adaeze</span>}
      />
      <Toggle kit={kit} label="Customer picks amount" on={false} />
      <Button kit={kit}>Copy link</Button>
    </Body>
  );
}

const schedule = [
  { when: "3 days before", via: "Email", status: "Sent" },
  { when: "Due date", via: "WhatsApp", status: "Sent" },
  { when: "3 days after", via: "WhatsApp", status: "Mon" },
];

export function RemindersScreen({ size }: { size: ScreenSize }) {
  const kit = kits[size];
  return (
    <Body kit={kit}>
      <Title kit={kit}>Reminders</Title>
      <Field kit={kit} label="Invoice" value="Wedding shoot · ₦250,000" />
      <Label kit={kit}>Schedule</Label>
      {schedule.map((step) => (
        <Box key={step.when} kit={kit} style={{ marginBottom: u(kit.row) }}>
          {/* The small phone has no room for the channel. */}
          <span className="whitespace-nowrap">
            {step.when}
            {size === "lg" && <span className="text-soft"> · {step.via}</span>}
          </span>
          <span className={step.status === "Sent" ? "text-green" : "text-soft"}>{step.status}</span>
        </Box>
      ))}
      <Toggle kit={kit} label="Stop when paid" on />
      <Button kit={kit}>Save reminders</Button>
    </Body>
  );
}

const months = [
  { m: "May", v: 0.45 },
  { m: "Jun", v: 0.6 },
  { m: "Jul", v: 0.5 },
  { m: "Aug", v: 0.72 },
  { m: "Sep", v: 0.8 },
  { m: "Oct", v: 1 },
];

export function ReportsScreen({ size }: { size: ScreenSize }) {
  const kit = kits[size];
  const scale = kit.field[3] / 14;
  return (
    <Body kit={kit}>
      <Title kit={kit}>Reports</Title>
      <Label kit={kit}>Money in · October</Label>
      <p
        className="font-medium tracking-[-0.03em]"
        style={{ fontSize: u(30 * scale), lineHeight: 1.1 }}
      >
        ₦1.2m
      </p>
      <div
        className="flex items-end justify-between"
        style={{ height: u(96 * scale), marginTop: u(14 * scale), gap: u(8 * scale) }}
      >
        {months.map(({ m, v }, i) => (
          <div
            key={m}
            className="flex h-full flex-1 flex-col items-center justify-end"
            style={{ gap: u(4 * scale) }}
          >
            <div
              className={cn("w-full", i === months.length - 1 ? "bg-forest" : "bg-lime")}
              style={{ height: `${v * 80}%`, borderRadius: u(4 * scale) }}
            />
            <span className="font-mono text-soft" style={{ fontSize: u(8 * scale) }}>
              {m}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: u(14 * scale), fontSize: u(12 * scale) }}>
        {[
          ["Paid", "₦980,000"],
          ["Owed", "₦220,000"],
          ["Overdue", "₦45,000"],
        ].map(([label, amount]) => (
          <div
            key={label}
            className="flex justify-between border-t border-line"
            style={{ paddingBlock: u(7 * scale) }}
          >
            <span className="text-soft">{label}</span>
            <span className="font-mono font-medium">{amount}</span>
          </div>
        ))}
      </div>
      <Button kit={kit}>Export CSV</Button>
    </Body>
  );
}
