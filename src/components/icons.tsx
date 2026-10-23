import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Paths are the Figma exports. Strokes use currentColor so the parent sets colour.

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 34 34" aria-hidden="true" {...props}>
      <circle cx="17" cy="17" r="17" className="fill-lime" />
      <circle cx="17" cy="17" r="8" className="fill-forest" />
      <circle cx="17" cy="17" r="3" className="fill-lime" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.167 4.167h11.666c.92 0 1.667.746 1.667 1.666v8.334c0 .92-.746 1.666-1.667 1.666H4.167c-.92 0-1.667-.746-1.667-1.666V5.833c0-.92.746-1.666 1.667-1.666Z" />
      <path d="M2.917 5 10 10.833 17.083 5" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m14 3.5 2.1 6.067 6.067 2.1-6.067 2.1L14 19.833l-2.1-6.066-6.067-2.1 6.067-2.1L14 3.5Z" />
    </svg>
  );
}

export function BankIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3.5 10.5 14 4.667 24.5 10.5M5.833 11.667V21m5.25-9.333V21m5.834-9.333V21m5.25-9.333V21M3.5 23.333h21" />
    </svg>
  );
}

export function ReceiptIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.625"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9.75 8.667h6.5M9.75 13h6.5M6.5 3.25h13v19.5l-3.25-2.167L13 22.75l-3.25-2.167L6.5 22.75V3.25Z" />
    </svg>
  );
}

export function UpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 12" aria-hidden="true" {...props}>
      <path d="M8 0 16 12H0L8 0Z" className="fill-mint" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3.333 5.833h13.334M3.333 10h13.334M3.333 14.167h8.334" />
    </svg>
  );
}

/* Hand-drawn arrows around the hero phone. */
export function CurveArrowLeft(props: IconProps) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      overflow="visible"
      aria-hidden="true"
      {...props}
    >
      <path d="M118 58C80 10 40 4 6 20" />
      <path d="M14 14 6 20l9 4" />
    </svg>
  );
}

export function CurveArrowRight(props: IconProps) {
  return (
    <svg
      viewBox="0 0 120 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      overflow="visible"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 40C40 2 80 2 114 26" />
      <path d="m104 24 10 2-4-10" />
    </svg>
  );
}

/*
 * Geist has no →, ✓ or ✕, which Figma drew with a fallback font. Drawn here to
 * Geist's stroke weight instead of mixing in another typeface.
 */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m2.5 8.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}
