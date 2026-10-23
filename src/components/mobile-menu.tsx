"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { DEMO_HREF, nav } from "@/content/landing";
import { CloseIcon, LogoMark, MenuIcon } from "./icons";
import { buttonTone, MaybeLink, pressable } from "./ui";

/**
 * Full-screen menu for small screens. A native modal <dialog> gives the focus
 * trap, inert page and Esc-to-close; CSS locks scroll while it's open.
 */
export function MobileMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    dialog.current?.showModal();
    close.current?.focus();
    setOpen(true);
  };

  // Links close the sheet first, then navigate as normal.
  const hide = () => dialog.current?.close();

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={show}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={`${pressable} ${buttonTone.paper} size-10 rounded-xl lg:hidden`}
      >
        <MenuIcon className="size-5" />
      </button>

      <dialog
        ref={dialog}
        id="mobile-menu"
        aria-label="Menu"
        onClose={() => {
          setOpen(false);
          // `close` fires after a link's hash scroll; don't yank the page back up.
          trigger.current?.focus({ preventScroll: true });
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink transition-[clip-path,display,overlay] transition-discrete duration-500 ease-out-expo [clip-path:inset(0_0_100%_0)] backdrop:bg-transparent open:[clip-path:inset(0)] motion-reduce:transition-none lg:hidden starting:open:[clip-path:inset(0_0_100%_0)]"
      >
        <div className="container-page flex h-full flex-col pt-[18px] pb-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              prefetch={false}
              onClick={hide}
              className="flex items-center gap-2 text-xl font-semibold tracking-[-0.02em]"
            >
              <LogoMark className="size-7" />
              Kòbò
            </Link>
            <button
              ref={close}
              type="button"
              onClick={hide}
              aria-label="Close menu"
              className={`${pressable} ${buttonTone.white} size-10 rounded-xl`}
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <nav aria-label="Main" className="mt-10">
            <ul>
              {nav.map((link, i) => (
                <li
                  key={link.label}
                  className="border-b border-line motion-safe:animate-[fade-up_500ms_var(--ease-out-expo)_both]"
                  style={{ animationDelay: `${120 + i * 50}ms` }}
                >
                  <MaybeLink
                    href={link.href}
                    onClick={hide}
                    className="flex min-h-16 items-center text-[2rem] font-medium tracking-[-0.025em]"
                  >
                    {link.label}
                  </MaybeLink>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="mt-auto grid gap-2.5 motion-safe:animate-[fade-up_500ms_var(--ease-out-expo)_both]"
            style={{ animationDelay: "320ms" }}
          >
            <Link
              href={DEMO_HREF}
              onClick={hide}
              className={`${pressable} ${buttonTone.white} h-[54px] rounded-[14px]`}
            >
              Log in
            </Link>
            <Link
              href={DEMO_HREF}
              onClick={hide}
              className={`${pressable} ${buttonTone.ink} h-[54px] rounded-[14px]`}
            >
              Start free
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
