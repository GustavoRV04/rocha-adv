import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PraticeAreas } from "@/components/sections/PraticeAreas";
import { AboutSection } from "@/components/sections/AboutSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { estatisticas } from "@/data/estatisticas";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="bg-[#0E223D] py-8 text-white">
          <div className="site-container grid grid-cols-2 gap-6 md:grid-cols-4">
            {estatisticas.map((statistic) => (
              <div key={statistic.label}>
                <strong className="font-heading text-3xl text-[#C5A265]">
                  {statistic.value}
                </strong>
                <span className="mt-1 block text-xs text-white/60">
                  {statistic.label}
                </span>
              </div>
            ))}
          </div>
        </section>
        <PraticeAreas />
        <AboutSection />
        <MethodologySection />
        <TestimonialSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
