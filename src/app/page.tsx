import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { LogoStrip } from "@/components/logo-strip";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
      </main>
    </>
  );
}
