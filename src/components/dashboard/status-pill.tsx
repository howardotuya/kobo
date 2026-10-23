import type { Status } from "@/content/dashboard";
import { cn } from "@/lib/cn";
import { Dot } from "../ui";

const statusStyle: Record<Status, { label: string; className: string }> = {
  paid: { label: "Paid", className: "bg-mint text-green-ink" },
  overdue: { label: "Overdue", className: "bg-coral text-ink" },
  sent: { label: "Sent", className: "bg-sky text-ink" },
  draft: { label: "Draft", className: "bg-paper text-soft" },
};

/**
 * Invoice status pill. `table` is the desktop table (dot, 12px); `list` is the
 * mobile list (no dot, 11px, drafts on the darker line grey as in Figma 9:91).
 */
export function StatusPill({
  status,
  variant = "table",
}: {
  status: Status;
  variant?: "table" | "list";
}) {
  const { label, className: tone } = statusStyle[status];
  const list = variant === "list";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full leading-[1.3] font-medium whitespace-nowrap",
        list ? "px-[9px] py-[3px] text-[11px]" : "px-2.5 py-1 text-xs",
        list && status === "draft" ? "bg-line text-soft-ink" : tone,
      )}
    >
      {!list && <Dot />}
      {label}
    </span>
  );
}
