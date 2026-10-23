"use client";

import { useState } from "react";
import type { Filter, Invoice } from "@/content/dashboard";
import { cn } from "@/lib/cn";
import { useQuery } from "./search-store";
import { StatusPill } from "./status-pill";

const ROWS = 4;

/** Recent invoices table with status filters; the topbar search narrows it too (Figma 5:131). */
// Data arrives as props from the server page, so it ships in the HTML payload
// rather than in this island's JavaScript.
export function RecentInvoices({ invoices, filters }: { invoices: Invoice[]; filters: Filter[] }) {
  const [filter, setFilter] = useState<Filter["id"]>("all");
  const query = useQuery().trim().toLowerCase();
  const match = filters.find((f) => f.id === filter)!.match;

  const rows = invoices
    .filter((inv) => match.includes(inv.status))
    .filter((inv) => !query || `${inv.number} ${inv.client}`.toLowerCase().includes(query))
    .slice(0, query ? undefined : ROWS);

  return (
    <section
      id="recent-invoices"
      aria-labelledby="recent-title"
      className="overflow-hidden rounded-[20px] border border-line bg-white"
    >
      <div className="flex items-center justify-between px-6 pt-[19px] pb-4">
        <h2 id="recent-title" className="text-lg leading-[1.3] font-semibold tracking-[-0.01em]">
          Recent invoices
        </h2>
        <div role="group" aria-label="Filter by status" className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={f.id === filter}
              onClick={() => setFilter(f.id)}
              className={cn(
                "h-7 rounded-lg px-2.5 text-[13px] font-medium transition-colors duration-200 active:scale-[0.98]",
                f.id === filter ? "bg-paper text-ink" : "text-soft hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rows sit inside 24px padding (inset dividers); the header band paints out to the edges. */}
      <div className="overflow-x-auto px-6">
        <table className="w-full min-w-[880px] table-fixed text-left text-sm leading-[1.3]">
          <colgroup>
            <col className="w-[11.1%]" />
            <col className="w-[23.8%]" />
            <col className="w-[12.3%]" />
            <col className="w-[12.3%]" />
            <col className="w-[15.8%]" />
            <col className="w-[15.8%]" />
            <col />
          </colgroup>
          <thead className="bg-paper text-xs text-soft">
            <tr className="h-9 [&>th:first-child]:shadow-[-24px_0_0_var(--color-paper)] [&>th:last-child]:shadow-[24px_0_0_var(--color-paper)]">
              <th scope="col" className="font-medium">
                Invoice
              </th>
              <th scope="col" className="font-medium">
                Client
              </th>
              <th scope="col" className="font-medium">
                Issued
              </th>
              <th scope="col" className="font-medium">
                Due
              </th>
              <th scope="col" className="font-medium">
                Amount
              </th>
              <th scope="col" className="font-medium">
                Status
              </th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((inv) => (
              <tr key={inv.number} className="h-11 border-b border-line last:border-0">
                <td className="font-mono font-medium">{inv.number}</td>
                <td className="font-medium">{inv.client}</td>
                <td className="text-soft">{inv.issued}</td>
                <td className="text-soft">{inv.due}</td>
                <td className="font-mono font-medium">{inv.amount}</td>
                <td>
                  <StatusPill status={inv.status} />
                </td>
                <td aria-hidden="true" className="text-right tracking-[0.1em] text-soft">
                  •••
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr className="h-11">
                <td colSpan={7} className="text-soft">
                  No invoices match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
