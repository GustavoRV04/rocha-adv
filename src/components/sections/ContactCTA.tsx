import Link from "next/link";
import { ArrowRight, LockKeyhole, MessageCircle } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="bg-[#07172B] py-20 text-white md:py-24">
      <div className="site-container grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <span className="eyebrow">Atendimento personalizado</span>
          <h2 className="mt-3 max-w-2xl font-heading text-4xl leading-tight sm:text-5xl">
            Agende uma avaliação reservada do seu caso.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
            Preencha os dados iniciais e nossa coordenação jurídica entrará em
            contato para entender os contornos da sua demanda.
          </p>
          <div className="mt-7 flex items-center gap-2 text-xs text-white/60">
            <LockKeyhole size={15} className="text-[#C5A265]" /> Informações
            tratadas sob sigilo profissional.
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 bg-[#C5A265] px-6 py-3.5 text-sm font-bold text-[#07172B] hover:bg-[#E2C58E]"
          >
            Solicitar análise <ArrowRight size={16} />
          </Link>
          <a
            href="https://wa.me/5511989214400"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-3.5 text-sm font-bold hover:border-[#C5A265]"
          >
            <MessageCircle size={16} /> WhatsApp direto
          </a>
        </div>
      </div>
    </section>
  );
}
