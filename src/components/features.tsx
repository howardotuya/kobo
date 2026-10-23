import type { ComponentType } from "react";
import { DEMO_HREF, features, featureTabs, photoAlt, type FeatureTab } from "@/content/landing";
import {
  BuilderScreen,
  PayLinkScreen,
  ReportsScreen,
  RemindersScreen,
  type ScreenSize,
} from "./feature-screens";
import { Phone, u } from "./phone";
import { Picture } from "./picture";
import { FeatureTabs } from "./feature-tabs";
import { buttonTone, Dot, MaybeLink, pressable } from "./ui";

const screens: Record<string, ComponentType<{ size: ScreenSize }>> = {
  invoices: BuilderScreen,
  "pay-links": PayLinkScreen,
  reminders: RemindersScreen,
  reports: ReportsScreen,
};

/** Lime panel with a phone cropped by its bottom edge (Figma 4:2 / 8:66). */
function PhonePanel({ id }: { id: string }) {
  const Screen = screens[id]!;
  return (
    <div className="@container">
      <div className="relative aspect-[460/500] overflow-hidden rounded-u-32 bg-lime [--spacing:calc(100cqi/460)] max-md:hidden">
        <div className="absolute" style={{ left: u(90), top: u(40), width: u(280) }}>
          <Phone width={280} height={560}>
            <Screen size="lg" />
          </Phone>
        </div>
      </div>
      <div className="relative aspect-[350/360] overflow-hidden rounded-u-26 bg-lime [--spacing:calc(100cqi/350)] md:hidden">
        <div className="absolute" style={{ left: u(75), top: u(32), width: u(200) }}>
          <Phone width={200} height={420} frame="sm">
            <Screen size="sm" />
          </Phone>
        </div>
      </div>
    </div>
  );
}

/** Photo with a dark scrim and an amount (Figma 3:147, 15:2, 3:148–3:151). */
function PhotoCard({ photo }: { photo: FeatureTab["photo"] }) {
  return (
    <div className="@container">
      <div className="relative aspect-[250/330] overflow-hidden rounded-u-24 text-white [--spacing:calc(100cqi/250)]">
        <Picture
          name={photo.name}
          alt={photoAlt[photo.name]}
          width={250}
          height={330}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[rgb(10_20_15/0.85)] via-[rgb(10_20_15/0.45)] via-45% to-[rgb(10_20_15/0)] to-75%" />
        <p
          className="absolute text-u-13 leading-[1.3] font-medium opacity-85"
          style={{ left: u(22), top: u(201) }}
        >
          {photo.label}
        </p>
        <p
          className="absolute text-u-36 leading-[1.3] font-semibold tracking-[-0.02em] [text-shadow:0_2px_8px_rgb(0_0_0/0.25)]"
          style={{ left: u(22), top: u(222) }}
        >
          {photo.amount}
        </p>
        <p
          className="absolute flex items-center rounded-full bg-lime text-u-13 leading-[1.3] font-medium whitespace-nowrap text-forest"
          style={{ left: u(22), top: u(279), padding: `${u(6)} ${u(16)}`, gap: u(6) }}
        >
          <Dot />
          {photo.pill}
        </p>
      </div>
    </div>
  );
}

function FeaturePanel({ tab }: { tab: FeatureTab }) {
  return (
    // Desktop columns are Figma's 440 / 40 / 460 / 20 / 250, which run 10px past
    // the 1200px content width, as in the frame.
    <div className="mt-[clamp(1.813rem,0.791rem+4.19vw,4.563rem)] grid gap-[30px] md:grid-cols-2 md:gap-10 lg:w-[100.833%] lg:grid-cols-[440fr_40fr_460fr_20fr_250fr] lg:gap-0">
      <div className="md:self-center lg:col-start-1 lg:mb-[51px] lg:self-end">
        <p className="font-mono text-[11px] leading-[1.3] font-medium tracking-[0.04em] whitespace-pre-wrap text-soft lg:text-xs">
          {tab.eyebrow.join("  •  ")}
        </p>
        <h3 className="mt-3 max-w-[440px] text-h3 font-semibold lg:mt-3.5">{tab.title}</h3>
        <p className="mt-3 max-w-[400px] text-body text-soft lg:mt-[18px]">{tab.body}</p>
        <MaybeLink
          href={DEMO_HREF}
          className={`${pressable} ${buttonTone.forest} mt-5 h-[54px] w-full rounded-[14px] px-[22px] sm:w-auto lg:mt-[42px] lg:h-auto lg:rounded-xl lg:py-3.5 lg:leading-[1.3]`}
        >
          {tab.cta}
        </MaybeLink>
      </div>
      <div className="max-md:order-first lg:col-start-3">
        <PhonePanel id={tab.id} />
      </div>
      <div className="max-lg:hidden lg:col-start-5 lg:self-center">
        <PhotoCard photo={tab.photo} />
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="container-page pt-[clamp(2.625rem,0.791rem+7.524vw,7.563rem)]"
    >
      <h2 id="features-title" className="text-center text-h1 font-medium">
        <span className="lg:block">{features.title[0]}</span>{" "}
        <span className="lg:block">{features.title[1]}</span>
      </h2>
      <p className="mx-auto mt-4 max-w-[600px] text-center text-sub text-soft lg:mt-5">
        {features.lead}
      </p>
      <div className="mt-6 lg:mt-[15px]">
        <FeatureTabs
          tabs={featureTabs.map(({ id, label }) => ({ id, label }))}
          panels={featureTabs.map((tab) => (
            <FeaturePanel key={tab.id} tab={tab} />
          ))}
        />
      </div>
    </section>
  );
}
