import Link from "next/link";
import { DEMO_HREF, nav } from "@/content/landing";
import { cn } from "@/lib/cn";
import { LogoMark } from "./icons";
import { MobileMenu } from "./mobile-menu";
import { buttonTone, MaybeLink, pressable, underline } from "./ui";

export function SiteHeader() {
  return (
    <header className="container-page flex items-center justify-between pt-[18px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:pt-7">
      <Link
        href="/"
        prefetch={false}
        className="flex w-fit items-center gap-2 text-xl font-semibold tracking-[-0.02em] lg:gap-2.5 lg:text-2xl"
      >
        <LogoMark className="size-7 lg:size-[34px]" />
        Kòbò
      </Link>

      <nav aria-label="Main" className="max-lg:hidden">
        <ul className="flex items-center font-medium">
          {nav.map((link, i) => (
            <li
              key={link.label}
              className={cn(
                "flex items-center",
                i > 0 && "before:mx-[15px] before:size-1 before:rounded-full before:bg-ink",
              )}
            >
              <MaybeLink href={link.href} className={link.href ? underline : undefined}>
                {link.label}
              </MaybeLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-end gap-3 max-lg:hidden">
        <Link
          href={DEMO_HREF}
          className={`${pressable} ${buttonTone.paper} rounded-full px-[22px] py-3.5 leading-[1.3]`}
        >
          Log in
        </Link>
        <Link
          href={DEMO_HREF}
          className={`${pressable} ${buttonTone.outline} rounded-full px-[22px] py-3.5 leading-[1.3]`}
        >
          Start free
        </Link>
      </div>

      <MobileMenu />
    </header>
  );
}
