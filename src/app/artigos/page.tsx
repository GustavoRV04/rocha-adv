import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/shared/PageIntro";

const articles = [
  [
    "Planejamento sucessório",
    "Como estruturar decisões patrimoniais com previsibilidade e serenidade.",
  ],
  [
    "Contratos empresariais",
    "Clareza contratual como ferramenta de prevenção de conflitos e proteção do negócio.",
  ],
  [
    "Governança familiar",
    "A importância de alinhar patrimônio, relações e continuidade antes da urgência.",
  ],
  [
    "Direito imobiliário",
    "Pontos de atenção em operações imobiliárias de alto valor.",
  ],
];

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Publicações e pareceres"
          title="Análise jurídica para decisões mais seguras"
          description="Conteúdo objetivo sobre patrimônio, negócios, relações familiares e prevenção de riscos."
        />
        <section className="bg-white py-20">
          <div className="site-container grid gap-5 md:grid-cols-2">
            {articles.map(([title, description], index) => (
              <article key={title} className="border border-[#0E223D]/8 p-7">
                <span className="eyebrow">
                  Artigo 0{index + 1} · Rocha Advocacia
                </span>
                <h2 className="mt-4 font-heading text-2xl text-[#0E223D]">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#526071]">
                  {description}
                </p>
                <button
                  type="button"
                  className="mt-6 text-xs font-bold text-[#765A24]"
                >
                  Ler análise →
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
