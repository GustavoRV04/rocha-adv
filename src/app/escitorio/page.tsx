import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/shared/PageIntro";
import { AboutSection } from "@/components/sections/AboutSection";
import { MethodologySection } from "@/components/sections/MethodologySection";

export default function OfficePage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Institucional · O escritório"
          title="Tradição, rigor técnico e compromisso ético"
          description="Uma advocacia artesanal, próxima e preparada para as decisões jurídicas mais sensíveis."
        />
        <AboutSection />
        <section className="bg-[#0E223D] py-20 text-white">
          <div className="site-container grid gap-8 md:grid-cols-3">
            <div>
              <strong className="font-heading text-4xl text-[#C5A265]">
                15+
              </strong>
              <p className="mt-2 text-sm text-white/60">
                anos construindo confiança
              </p>
            </div>
            <div>
              <strong className="font-heading text-4xl text-[#C5A265]">
                1 a 1
              </strong>
              <p className="mt-2 text-sm text-white/60">atendimento próximo</p>
            </div>
            <div>
              <strong className="font-heading text-4xl text-[#C5A265]">
                100%
              </strong>
              <p className="mt-2 text-sm text-white/60">compromisso ético</p>
            </div>
          </div>
        </section>
        <MethodologySection />
      </main>
      <Footer />
    </>
  );
}
