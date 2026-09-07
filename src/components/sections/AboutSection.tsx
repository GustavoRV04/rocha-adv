import Link from "next/link";
import { ArrowRight, Award, Eye, ShieldCheck } from "lucide-react";

export function AboutSection() {
  return (
    <section className="bg-[#EEF2F8] py-20 md:py-28">
      <div className="site-container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div
          className="relative min-h-[30rem] overflow-hidden bg-[#0E223D] shadow-xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#07172B]/85 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 border-l-2 border-[#C5A265] bg-[#07172B]/80 p-4 pl-4 text-white">
            <div>
              <span className="eyebrow">Rocha Advocacia</span>
              <p className="mt-1 font-heading text-xl">
                Uma prática construída sobre confiança.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 border-l border-white/20 pl-4">
              <Award size={20} className="text-[#C5A265]" />
              <span className="max-w-[7rem] text-[0.62rem] font-bold leading-4 tracking-wider">
                +15 ANOS DE ATUAÇÃO
              </span>
            </div>
          </div>
        </div>
        <div>
          <span className="eyebrow">Conheça o escritório</span>
          <h2 className="section-title mt-3 max-w-xl">
            Tradição e compromisso ético para decisões que importam.
          </h2>
          <p className="mt-6 text-sm leading-7 text-[#526071]">
            A Rocha Advocacia combina a atenção artesanal de uma banca boutique
            com a profundidade técnica necessária para conduzir demandas
            patrimoniais, familiares e empresariais de alta complexidade.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#526071]">
            Cada caso é acompanhado de perto, com comunicação clara, análise
            preventiva e foco em soluções que preservem o que realmente importa.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="border border-[#0E223D]/10 bg-white p-5">
              <ShieldCheck size={20} className="text-[#C5A265]" />
              <h3 className="mt-3 font-heading text-xl text-[#0E223D]">
                Missão
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#526071]">
                Proporcionar segurança jurídica com celeridade e respeito aos
                preceitos éticos mais estritos.
              </p>
            </div>
            <div className="border border-[#0E223D]/10 bg-white p-5">
              <Eye size={20} className="text-[#C5A265]" />
              <h3 className="mt-3 font-heading text-xl text-[#0E223D]">
                Visão
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#526071]">
                Ser referência em advocacia estratégica para famílias e
                corporações.
              </p>
            </div>
          </div>
          <Link
            href="/escitorio"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#765A24]"
          >
            Conheça nossa história <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
