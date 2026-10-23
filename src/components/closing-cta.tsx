import { cta, DEMO_HREF } from "@/content/landing";
import { buttonTone, MaybeLink, pressable } from "./ui";

export function ClosingCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="container-page mt-10 lg:mt-[clamp(2.5rem,0.643rem+7.619vw,7.5rem)]"
    >
      <div className="relative reveal overflow-hidden rounded-[26px] bg-lime-soft px-6 pt-10 pb-5 lg:min-h-[360px] lg:rounded-[32px] lg:px-[60px] lg:pt-[70px] lg:pb-9">
        <h2 id="cta-title" className="text-cta font-medium">
          {cta.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-[600px] text-[clamp(0.938rem,0.845rem+0.381vw,1.188rem)] leading-normal text-soft lg:mt-[25px] lg:leading-[1.3]">
          {cta.lead}
        </p>
        <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row sm:gap-3 lg:mt-[25px]">
          <MaybeLink
            href={DEMO_HREF}
            className={`${pressable} ${buttonTone.ink} h-[50px] rounded-[14px] px-[22px] sm:h-auto sm:py-4 sm:leading-[1.3]`}
          >
            {cta.primary}
          </MaybeLink>
          {/* No destination yet: styled as designed, but plain text. */}
          <span className="inline-flex h-[50px] items-center justify-center rounded-[14px] border-[1.5px] border-ink px-[22px] font-medium sm:h-auto sm:py-4 sm:leading-[1.3]">
            {cta.secondary}
          </span>
        </div>

        {/* Target mark (Figma 4:66–4:68): the logo, scaled up. */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-[60px] grid size-[260px] -translate-y-1/2 place-items-center rounded-full bg-lime max-lg:hidden"
        >
          <div className="grid size-[124px] place-items-center rounded-full bg-forest">
            <div className="size-[46px] rounded-full bg-lime" />
          </div>
        </div>
      </div>
    </section>
  );
}
