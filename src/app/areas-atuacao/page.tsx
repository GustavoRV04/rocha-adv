import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/shared/PageIntro";
import { PraticeAreas } from "@/components/sections/PraticeAreas";

export default function AreasPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Excelência e rigor técnico"
          title="Soluções jurídicas estratégicas e preventivas"
          description="Atuação especializada para interesses corporativos, patrimoniais e familiares de alta complexidade."
        />
        <PraticeAreas />
      </main>
      <Footer />
    </>
  );
}
