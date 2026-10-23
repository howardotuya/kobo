import { logos } from "@/content/landing";

export function LogoStrip() {
  return (
    <section
      aria-label="Customers"
      className="mt-[clamp(3.125rem,2.429rem+2.857vw,5rem)] border-t border-line"
    >
      <div className="container-page pt-6 lg:pt-10">
        <p className="text-center text-[13px] leading-[1.3] text-soft lg:text-[15px]">
          {logos.caption}
        </p>
        <ul className="mt-[23px] grid grid-cols-2 gap-y-3.5 lg:mt-[31px] lg:flex lg:justify-between">
          {logos.names.map((name) => (
            <li key={name} className="text-center last:odd:col-span-2">
              {/* Muted wordmarks stand in for customer logos (WCAG exempts logotypes from contrast). */}
              <span
                role="img"
                aria-label={name}
                className="text-[17px] leading-[1.3] font-semibold tracking-[-0.02em] text-soft/60 lg:text-[22px]"
              >
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
