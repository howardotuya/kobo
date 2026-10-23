import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared press/hover behaviour for every button-like element. */
export const pressable =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap select-none " +
  "transition-[background-color,color,border-color,scale] duration-200 ease-out-expo active:scale-[0.98]";

export const buttonTone = {
  ink: "bg-ink text-white hover:bg-forest",
  forest: "bg-forest text-white hover:bg-forest-2",
  paper: "bg-paper text-ink hover:bg-line",
  white: "bg-white text-ink hover:bg-paper",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink/6",
} as const;

/** Animated underline for text links. */
export const underline =
  "bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] " +
  "transition-[background-size,color] duration-300 ease-out-expo hover:bg-[length:100%_1px]";

type MaybeLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string | null;
  children: ReactNode;
};

/**
 * A link, or plain text when the destination doesn't exist yet. Plain text
 * keeps the visual design without shipping dead links.
 */
export function MaybeLink({ href, className, children, ...rest }: MaybeLinkProps) {
  if (href === null) return <span className={className}>{children}</span>;
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

/** "Paid" status dot that stands in for the ● glyph Geist doesn't have. */
export function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block size-[0.5em] rounded-full bg-current", className)}
    />
  );
}
