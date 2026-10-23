import Link from "next/link";
import { nav, upgrade } from "@/content/dashboard";
import { cn } from "@/lib/cn";
import { LogoMark } from "../icons";
import { Icon, type DashIconName } from "./icons";
import { pressable } from "../ui";

const icons: Record<(typeof nav)[number], DashIconName> = {
  Overview: "overview",
  Invoices: "invoices",
  Clients: "clients",
  "Pay links": "link",
  Reminders: "bell",
  Reports: "reports",
  Settings: "settings",
};

/**
 * Desktop sidebar (Figma 5:4–5:38). Only Overview exists in the demo; the
 * other items are shown, not linked, so nothing pretends to work.
 */
export function Sidebar() {
  return (
    // Sits under the sticky 40px demo banner.
    <aside className="sticky top-10 flex h-[calc(100dvh-2.5rem)] flex-col border-r border-line bg-white px-4 pt-7 pb-[30px]">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 px-2 text-[22px] leading-[1.3] font-semibold tracking-[-0.02em]"
      >
        <LogoMark className="size-[30px]" />
        Kòbò
      </Link>

      <nav aria-label="App" className="mt-[38px]">
        <ul className="grid gap-2">
          {nav.map((item) => {
            const current = item === "Overview";
            const content = (
              <>
                <Icon name={icons[item]} className="size-5" />
                {item}
                {item === "Invoices" && (
                  <span className="-mr-2 ml-auto rounded-full bg-coral px-2.5 py-1 text-xs leading-none text-white">
                    3<span className="sr-only"> overdue or due soon</span>
                  </span>
                )}
              </>
            );
            const row =
              "flex h-10 items-center gap-2.5 rounded-[10px] px-4 text-[15px] leading-[1.3] font-medium";
            return (
              <li key={item}>
                {current ? (
                  <Link href="/app" aria-current="page" className={cn(row, "bg-lime")}>
                    {content}
                  </Link>
                ) : (
                  <span className={row}>{content}</span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto rounded-2xl bg-forest px-5 pt-[22px] pb-4 text-white surface-dark">
        <p className="text-lg leading-[1.3] font-semibold">{upgrade.title}</p>
        <p className="mt-1.5 w-[170px] text-[13px] leading-[1.45] opacity-75">{upgrade.body}</p>
        <Link
          href="/#pricing"
          className={`${pressable} mt-[26px] h-[38px] w-full rounded-[10px] bg-lime text-[13px] text-forest hover:bg-white`}
        >
          {upgrade.cta}
        </Link>
      </div>
    </aside>
  );
}
