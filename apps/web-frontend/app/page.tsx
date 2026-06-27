import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Features } from "./_components/Features";
import { HowItWorks } from "./_components/HowItWorks";
import { Architecture } from "./_components/Architecture";
import { CodeShowcase } from "./_components/CodeShowcase";
import { LiveDemo } from "./_components/LiveDemo";
import { Pricing } from "./_components/Pricing";
import { FAQ } from "./_components/FAQ";
import { CTA } from "./_components/CTA";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Architecture />
        <CodeShowcase />
        <LiveDemo />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
