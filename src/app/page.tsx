import { ClosingCta } from "@/components/closing-cta";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { LogoStrip } from "@/components/logo-strip";
import { Pricing } from "@/components/pricing";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UseCases } from "@/components/use-cases";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <UseCases />
        <Pricing />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
