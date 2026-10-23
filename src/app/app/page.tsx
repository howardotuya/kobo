import type { Metadata } from "next";
import { DemoBanner } from "@/components/dashboard/demo-banner";
import { DueSoonCard, DueSoonList } from "@/components/dashboard/due-soon";
import { MoneyChartLg, MoneyChartSm } from "@/components/dashboard/money-chart";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { SearchField } from "@/components/dashboard/search-field";
import { Sidebar } from "@/components/dashboard/sidebar";
import { StatusPill } from "@/components/dashboard/status-pill";
import { TabBar } from "@/components/dashboard/tab-bar";
import { Icon } from "@/components/dashboard/icons";
import { Picture } from "@/components/picture";
import { filters, invoices, series, stats, today, user, type Tone } from "@/content/dashboard";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Demo dashboard — Kòbò",
  description: "A walk-through of the Kòbò dashboard with made-up clients and amounts.",
  alternates: { canonical: "/app" },
};

const noteTone: Record<Tone, string> = {
  green: "text-green-ink",
  soft: "text-soft",
  coral: "text-coral-ink",
};

function Avatar() {
  return (
    <Picture
      name="adaeze"
      alt=""
      width={40}
      height={40}
      loading="eager"
      className="size-10 rounded-full"
    />
  );
}

/** Desktop dashboard (Figma 5:3). */
function DesktopDashboard() {
  return (
    <div className="hidden min-h-dvh grid-cols-[248px_1fr] lg:grid">
      <Sidebar />
      <main className="min-w-0 pt-6 pr-6 pb-6 pl-8">
        <header className="flex items-center gap-5">
          <SearchField />
          {/* Shown, not wired: creating invoices isn't part of the demo. */}
          <span className="ml-auto flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[15px] font-medium text-white">
            <Icon name="plus" strokeWidth={1.6} className="size-4" />
            New invoice
          </span>
          <Icon name="bell" className="size-5" />
          <Avatar />
        </header>

        <h1 className="mt-9 text-[30px] leading-[1.3] font-semibold tracking-[-0.02em]">
          {user.greeting}, {user.name}
        </h1>
        <p className="mt-[3px] text-[15px] leading-[1.3] text-soft">{today}</p>

        <ul className="mt-[26px] grid grid-cols-2 gap-4 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={cn(
                "h-[140px] rounded-[20px] p-5 leading-[1.3] whitespace-nowrap",
                i === 0 ? "bg-lime-soft" : "border border-line bg-white p-[19px]",
              )}
            >
              <p className="text-sm font-medium text-soft">{stat.label}</p>
              <p className="mt-2.5 text-[32px] font-semibold tracking-[-0.03em]">{stat.value}</p>
              <p className={cn("mt-2.5 text-[13px] font-medium", noteTone[stat.tone])}>
                {stat.note}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid gap-4 xl:grid-cols-[736fr_384fr]">
          <section
            aria-labelledby="money-in"
            className="rounded-[20px] border border-line bg-white"
          >
            <MoneyChartLg series={series} />
          </section>
          <DueSoonCard />
        </div>

        <div className="mt-4">
          <RecentInvoices invoices={invoices} filters={filters} />
        </div>
      </main>
    </div>
  );
}

const quickActions = [
  { icon: "plus", primary: true },
  { icon: "link" },
  { icon: "bell" },
  { icon: "person" },
] as const;

/** Mobile dashboard (Figma 9:2). The device status bar and home indicator are left out. */
function MobileDashboard() {
  const [paid, unpaid, overdue] = stats;
  return (
    <main className="mx-auto max-w-[640px] px-5 pt-5 pb-[140px] lg:hidden">
      <header className="flex items-center gap-2.5">
        <Avatar />
        <div className="leading-[1.3]">
          <p className="text-[13px] text-soft">{user.greeting}</p>
          <h1 className="text-lg font-semibold tracking-[-0.01em]">{user.name}</h1>
        </div>
        <span className="ml-auto grid size-10 place-items-center rounded-xl border border-line bg-white">
          <Icon name="bell" strokeWidth={1.42} className="size-[22px]" />
        </span>
      </header>

      <section
        aria-label={paid!.label}
        className="mt-5 rounded-[18px] bg-forest px-5 pt-5 pb-[22px] text-white"
      >
        <p className="text-[13px] leading-[1.3] font-medium opacity-75">{paid!.label}</p>
        <p className="mt-[5px] text-[38px] leading-[1.3] font-semibold tracking-[-0.03em]">
          {paid!.value}
        </p>
        <p className="mt-1 w-fit rounded-full bg-lime px-[9px] py-[3px] text-[11px] font-medium text-forest">
          ↑ {paid!.note.replace("+", "")}
        </p>
        {/* Quick actions: shown, not wired in the demo. */}
        <div aria-hidden="true" className="mt-4 flex gap-11 pl-3">
          {quickActions.map((action) => (
            <span
              key={action.icon}
              className={cn(
                "grid size-9 place-items-center rounded-full",
                "primary" in action ? "bg-lime text-forest" : "bg-forest-2 text-lime",
              )}
            >
              <Icon name={action.icon} strokeWidth={1.42} className="size-5" />
            </span>
          ))}
        </div>
      </section>

      <ul className="mt-4 grid grid-cols-2 gap-2.5">
        {[unpaid!, overdue!].map((stat) => (
          <li
            key={stat.label}
            className="h-[104px] rounded-[18px] border border-line bg-white px-[15px] pt-[13px] leading-[1.3]"
          >
            <p className="text-xs font-medium text-soft">{stat.label}</p>
            <p className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em]">{stat.value}</p>
            <p className={cn("mt-[7px] text-xs font-medium", noteTone[stat.tone])}>
              {stat.mobileNote}
            </p>
          </li>
        ))}
      </ul>

      <section
        aria-labelledby="money-in-sm"
        className="mt-4 rounded-[18px] border border-line bg-white"
      >
        <MoneyChartSm points={series[0]!.points.slice(-6)} />
      </section>

      <div className="mt-[22px]">
        <DueSoonList />
      </div>

      <section id="recent-sm" aria-labelledby="recent-sm-title" className="mt-7">
        <h2 id="recent-sm-title" className="text-lg leading-[1.3] font-semibold tracking-[-0.01em]">
          Recent invoices
        </h2>
        <ul className="mt-3 rounded-[18px] border border-line bg-white px-[15px]">
          {invoices
            .filter((inv) => ["#0042", "#0040", "#0039"].includes(inv.number))
            .map((inv) => (
              <li
                key={inv.number}
                className="flex h-16 items-center justify-between border-b border-line leading-[1.3] last:border-0"
              >
                <div>
                  <p className="text-[15px] font-medium">{inv.client}</p>
                  <p className="mt-0.5 text-xs whitespace-pre text-soft">
                    {inv.number} · {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="font-mono text-[15px] font-semibold">{inv.amount}</p>
                  <StatusPill status={inv.status} variant="list" />
                </div>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}

export default function AppPage() {
  return (
    <div className="bg-paper">
      <DemoBanner />
      <DesktopDashboard />
      <MobileDashboard />
      <TabBar />
    </div>
  );
}
