import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, LockKeyhole } from "lucide-react";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F4F6FA] py-16 md:py-24">
      <div className="site-container grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="eyebrow flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C5A265]" />
            {site.hero.eyebrow}
          </div>
          <h1 className="mt-5 max-w-2xl font-heading text-5xl leading-[1.02] text-[#0E223D] sm:text-6xl">
            {site.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#526071]">
            {site.hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 bg-[#C5A265] px-6 py-3.5 text-sm font-bold text-[#07172B] transition-colors hover:bg-[#E2C58E]"
            >
              Agendar consulta <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/5511989214400"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#0E223D]/15 bg-white px-6 py-3.5 text-sm font-bold text-[#0E223D] hover:border-[#C5A265]"
            >
              Falar pelo WhatsApp
            </a>
          </div>
          <div className="mt-10 grid gap-4 border-t border-[#0E223D]/10 pt-5 text-xs font-semibold text-[#526071] sm:grid-cols-3">
            <span className="flex items-center gap-2">
              <LockKeyhole size={16} className="text-[#C5A265]" /> Atendimento
              sigiloso
            </span>
            <span className="flex items-center gap-2">
              <Building2 size={16} className="text-[#C5A265]" /> Atuação
              nacional
            </span>
            <span className="flex items-center gap-2">
              <BadgeCheck size={16} className="text-[#C5A265]" /> Estratégia sob
              medida
            </span>
          </div>
        </div>
        <div
          className="relative min-h-[28rem] overflow-hidden bg-[#0E223D] shadow-2xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#07172B]/90 via-[#07172B]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
            <span className="eyebrow">{site.hero.imageLabel}</span>
            <p className="mt-2 max-w-sm font-heading text-2xl leading-tight">
              {site.hero.imageTitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
