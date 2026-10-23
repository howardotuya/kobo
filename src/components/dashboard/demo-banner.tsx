import Link from "next/link";
import { demoBanner } from "@/content/dashboard";
import { ArrowRightIcon } from "../icons";

/** Not in Figma: the brief asks for /app to be clearly labelled as a demo. */
export function DemoBanner() {
  return (
    <div className="bg-forest text-white surface-dark lg:sticky lg:top-0 lg:z-30">
      <div className="flex min-h-10 items-center justify-between gap-4 px-5 py-2 text-[13px] leading-[1.3] lg:h-10 lg:px-6">
        <p className="text-white/80">
          <strong className="mr-1.5 rounded-full bg-lime px-2 py-0.5 text-xs font-medium text-forest">
            Demo
          </strong>
          {demoBanner.text.replace(/^Demo · /, "")}
        </p>
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-1.5 font-medium text-lime transition-colors hover:text-white"
        >
          <ArrowRightIcon className="size-3.5 rotate-180 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />
          {demoBanner.back}
        </Link>
      </div>
    </div>
  );
}
