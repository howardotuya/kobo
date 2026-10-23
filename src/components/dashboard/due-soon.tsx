import { dueSoon, type Due } from "@/content/dashboard";
import { cn } from "@/lib/cn";

const tones: Record<Due["tone"], string> = {
  late: "bg-coral text-white",
  soon: "bg-yellow text-ink",
  later: "bg-paper text-ink",
};

function Initial({ due, className }: { due: Due; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold",
        due.avatar,
        className,
      )}
    >
      {due.client.charAt(0)}
    </span>
  );
}

/** Desktop "Due soon" card (Figma 5:101). */
export function DueSoonCard() {
  return (
    <section
      aria-labelledby="due-title"
      className="rounded-[20px] border border-line bg-white px-6 pt-[21px]"
    >
      <div className="flex items-baseline justify-between">
        <h2 id="due-title" className="text-lg leading-[1.3] font-semibold tracking-[-0.01em]">
          Due soon
        </h2>
        <a
          href="#recent-invoices"
          className="text-[13px] font-medium text-soft transition-colors hover:text-ink"
        >
          See all
        </a>
      </div>
      <ul className="mt-[14px]">
        {dueSoon.map((due) => (
          <li
            key={due.client}
            className="flex h-[62px] items-center gap-3 border-b border-line last:border-0"
          >
            <Initial due={due} className="size-9 text-[15px]" />
            <div className="min-w-0 flex-1 leading-[1.3]">
              <p className="text-[15px] font-medium">{due.client}</p>
              <p className="font-mono text-[13px] text-soft">{due.amount}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs leading-[1.3] font-medium",
                tones[due.tone],
              )}
            >
              {due.when}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Mobile list: three cards with short labels (Figma 9:51–9:73). */
export function DueSoonList() {
  return (
    <section aria-labelledby="due-title-sm">
      <div className="flex items-baseline justify-between">
        <h2 id="due-title-sm" className="text-lg leading-[1.3] font-semibold tracking-[-0.01em]">
          Due soon
        </h2>
        <a href="#recent-sm" className="text-[13px] font-medium text-soft">
          See all
        </a>
      </div>
      <ul className="mt-3 grid gap-2.5">
        {dueSoon.slice(0, 3).map((due) => (
          <li
            key={due.client}
            className="flex h-[66px] items-center gap-3 rounded-[18px] border border-line bg-white px-3"
          >
            <Initial due={due} className="size-[38px] text-[15px]" />
            <div className="min-w-0 flex-1 leading-[1.3]">
              <p className="text-[15px] font-medium">{due.client}</p>
              <p className="mt-0.5 font-mono text-xs text-soft">{due.amount}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-[9px] py-[3px] text-[11px] font-medium",
                due.tone === "later" ? "border border-line bg-white text-ink" : tones[due.tone],
              )}
            >
              {due.whenShort}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
