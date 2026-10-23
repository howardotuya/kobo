import { DEMO_HREF, hero } from "@/content/landing";
import { ArrowRightIcon, MailIcon, UpIcon } from "./icons";
import { HeroStageLg, HeroStageSm } from "./hero-stage";
import { ParallaxStage } from "./parallax-stage";
import { Picture } from "./picture";
import { buttonTone, pressable } from "./ui";

// Load reveal: everything is in place by 900ms. Delays are per element.
const FADE_UP = "motion-safe:animate-[fade-up_600ms_var(--ease-out-expo)_both]";
const LINE_UP = "motion-safe:animate-[line-up_800ms_var(--ease-out-expo)_both]";

const avatars = ["avatar-1", "avatar-2", "avatar-3"] as const;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="@container container-page pt-[clamp(2.375rem,1.4rem+4vw,5rem)] lg:grid lg:grid-cols-[570fr_630fr] lg:items-start"
    >
      <div className="relative z-10 lg:pt-[0.833cqi]">
        <a
          href="#pay-links"
          className={`${FADE_UP} group inline-flex items-center gap-1.5 rounded-full bg-lime-soft px-3 py-1.5 text-xs font-medium text-forest transition-colors duration-200 hover:bg-lime lg:gap-2 lg:px-3.5 lg:py-2 lg:text-sm`}
        >
          <span className="font-mono text-xs lg:text-[13px]">{hero.eyebrow.tag}</span>
          {hero.eyebrow.text}
          <ArrowRightIcon className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
        </a>

        <h1
          id="hero-title"
          className="mt-[clamp(0.75rem,0.611rem+0.571vw,1.125rem)] -ml-[0.035em] text-display font-medium lg:-ml-[0.055em] lg:text-[9cqi] lg:tracking-[-0.05em]"
        >
          {hero.title.map((line, i) => (
            // Each line rises out of its own mask; padding keeps descenders unclipped.
            <span key={line} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span className={`${LINE_UP} block`} style={{ animationDelay: `${60 + i * 90}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          className={`${FADE_UP} mt-[clamp(1.25rem,1.018rem+0.952vw,1.875rem)] max-w-[560px] text-lead text-soft`}
          style={{ animationDelay: "220ms" }}
        >
          {hero.lead}
        </p>

        <form
          action={DEMO_HREF}
          className={`${FADE_UP} mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3 lg:max-w-[501px]`}
          style={{ animationDelay: "300ms" }}
        >
          <label className="flex h-[54px] min-w-0 items-center gap-3 rounded-[14px] bg-paper px-4 text-soft transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_var(--color-focus)] sm:h-[60px] sm:flex-1 sm:px-5 lg:max-w-[360px]">
            <MailIcon className="size-5 shrink-0 text-ink" />
            <span className="sr-only">Email address</span>
            {/* No name attribute: the address never ends up in the URL. */}
            <input
              type="email"
              required
              autoComplete="email"
              placeholder={hero.emailPlaceholder}
              className="w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-soft sm:text-[17px]"
            />
          </label>
          <button
            type="submit"
            className={`${pressable} ${buttonTone.ink} h-[54px] rounded-[14px] px-[26px] text-base sm:h-[60px] sm:text-[17px]`}
          >
            {hero.cta}
          </button>
        </form>

        <p
          className={`${FADE_UP} mt-[clamp(0.75rem,0.657rem+0.381vw,1rem)] text-center text-[13px] leading-[1.3] text-soft sm:text-left lg:text-sm`}
          style={{ animationDelay: "360ms" }}
        >
          {hero.note}
        </p>

        <div className={FADE_UP} style={{ animationDelay: "360ms" }}>
          <div className="mt-[clamp(1.8125rem,1.093rem+2.952vw,3.75rem)] flex items-center">
            <div className="flex -space-x-3 lg:-space-x-3.5">
              {avatars.map((name) => (
                <Picture
                  key={name}
                  name={name}
                  alt=""
                  width={48}
                  height={48}
                  loading="eager"
                  className="size-10 rounded-full lg:size-12"
                />
              ))}
            </div>
            <UpIcon className="ml-3.5 h-3 w-4 max-sm:hidden" />
            <p className="ml-4 text-stat font-medium sm:ml-2.5">{hero.stat}</p>
          </div>
          <p className="mt-3 max-w-[360px] text-sm leading-[1.3] text-soft lg:mt-2.5 lg:text-[15px] lg:leading-normal">
            {hero.statCaption}
          </p>
        </div>
      </div>

      <ParallaxStage className="mt-10 lg:mt-0 lg:w-[111.11%]">
        <div className="mx-auto max-w-[420px] md:hidden">
          <HeroStageSm />
        </div>
        <div className="mx-auto max-w-[560px] max-md:hidden lg:max-w-none">
          <HeroStageLg />
        </div>
      </ParallaxStage>
    </section>
  );
}
