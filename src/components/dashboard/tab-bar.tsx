import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type DashIconName } from "./icons";

const tabs: { label: string; icon: DashIconName }[] = [
  { label: "Home", icon: "overview" },
  { label: "Invoices", icon: "invoices" },
  { label: "Clients", icon: "person" },
  { label: "Settings", icon: "settings" },
];

/**
 * Mobile tab bar with the raised lime "new invoice" button (Figma 9:93–9:107).
 * Only Home exists in the demo, so the rest are shown, not linked.
 */
export function TabBar() {
  const item = "flex flex-col items-center gap-1.5 pt-3.5 text-[11px] leading-[1.3] font-medium";
  return (
    <nav
      aria-label="App"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <ul className="mx-auto grid max-w-[640px] grid-cols-5">
        {tabs.slice(0, 2).map((tab, i) => (
          <li key={tab.label}>
            {i === 0 ? (
              <Link href="/app" aria-current="page" className={cn(item, "text-ink")}>
                <Icon name={tab.icon} strokeWidth={1.42} className="size-[22px]" />
                {tab.label}
              </Link>
            ) : (
              <span className={cn(item, "text-soft")}>
                <Icon name={tab.icon} strokeWidth={1.42} className="size-[22px]" />
                {tab.label}
              </span>
            )}
          </li>
        ))}
        <li aria-hidden="true" className="relative">
          <span className="absolute -top-[22px] left-1/2 grid size-[60px] -translate-x-1/2 place-items-center rounded-full bg-lime text-forest shadow-[0_8px_20px_rgb(15_41_33/0.25)]">
            <Icon name="plus" strokeWidth={1.42} className="size-[26px]" />
          </span>
        </li>
        {tabs.slice(2).map((tab) => (
          <li key={tab.label}>
            <span className={cn(item, "text-soft")}>
              <Icon name={tab.icon} strokeWidth={1.42} className="size-[22px]" />
              {tab.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
