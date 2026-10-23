import type { CSSProperties } from "react";
import { DEMO_HREF, pricing } from "@/content/landing";
import { cn } from "@/lib/cn";
import { CheckIcon } from "./icons";
import { buttonTone, MaybeLink, pressable } from "./ui";

type Plan = (typeof pricing.plans)[number];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const pro = "popular" in plan;
  return (
    <li
      className={cn(
        "flex reveal flex-col rounded-[22px] p-6 lg:min-h-[470px] lg:rounded-3xl lg:p-8 lg:pb-7",
        pro ? "bg-lime text-ink surface-lime max-lg:order-first" : "bg-forest-2 text-white",
      )}
      style={{ "--reveal-i": index } as CSSProperties}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-[17px] leading-[1.3] font-medium lg:text-lg">{plan.name}</h3>
        {pro && (
          <p className="-mt-0.5 rounded-full bg-forest px-3 py-[5px] text-xs leading-[1.3] font-medium text-lime lg:mt-0 lg:px-2.5 lg:py-1">
            {plan.popular}
          </p>
        )}
      </div>
      <p className="mt-2.5 text-price font-medium lg:mt-[21px]">{plan.price}</p>
      <p className="text-sm leading-[1.3] lg:text-[15px]">{plan.note}</p>
      <hr className={cn("mt-[26px] h-px border-0 max-lg:hidden", pro ? "bg-ink" : "bg-white")} />
      <ul className="mt-5 grid gap-3.5 text-[15px] leading-[1.3] lg:mt-6 lg:gap-[17px] lg:text-base">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-[9px]">
            <CheckIcon className="size-4 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <MaybeLink
        href={DEMO_HREF}
        className={cn(
          pressable,
          pro ? buttonTone.ink : buttonTone.white,
          "mt-[18px] h-12 rounded-xl text-[15px] lg:mt-auto lg:h-[52px] lg:text-base",
        )}
      >
        {plan.cta}
      </MaybeLink>
    </li>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="mt-[clamp(3.25rem,1.671rem+6.476vw,7.5rem)] bg-forest pt-[clamp(3.75rem,2.821rem+3.81vw,6.25rem)] pb-[60px] text-white surface-dark lg:pb-[50px]"
    >
      <div className="container-page">
        <div className="reveal text-center">
          <p className="font-mono text-xs leading-[1.3] font-medium tracking-[0.06em] text-lime lg:text-[13px]">
            {pricing.eyebrow}
          </p>
          <h2 id="pricing-title" className="mt-3 text-h2 leading-[1.3] font-medium lg:mt-[13px]">
            {pricing.title}
          </h2>
          <p className="mt-1 text-sub leading-[1.3] opacity-70 lg:mt-[7px]">{pricing.lead}</p>
        </div>
        <ul className="mx-auto mt-[clamp(2.5rem,1.804rem+2.857vw,4.375rem)] grid max-w-[480px] gap-4 lg:max-w-none lg:grid-cols-3 lg:gap-[30px]">
          {pricing.plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
