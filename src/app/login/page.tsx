import Link from "next/link";
import { ArrowLeft, BadgeCheck, LockKeyhole, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Acesso restrito | Rocha Advocacia",
  description: "Portal jurídico restrito da Rocha Advocacia.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#EEF2F8] p-4 sm:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden bg-white shadow-2xl sm:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-[#0E223D] p-8 text-white sm:p-12 lg:p-14">
          <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full border border-[#C5A265]/20" />
          <div className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full border border-[#C5A265]/10" />
          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-[#C5A265]"
            >
              <ArrowLeft size={14} /> Portal público
            </Link>
            <div className="mt-12 inline-flex items-center gap-2 bg-[#07172B] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#E2C58E]">
              <span className="h-2 w-2 rounded-full bg-[#C5A265]" /> Canal
              restrito de sócios e advogados
            </div>
            <div className="mt-16 h-0.5 w-12 bg-[#C5A265]" />
            <h1 className="mt-7 max-w-md font-heading text-5xl leading-[1.05] sm:text-6xl">
              Portal Jurídico{" "}
              <span className="italic font-normal text-[#E2C58E]">
                Diligência & Governança
              </span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#B7C4D8]">
              Acesso unificado aos autos processuais sigilosos, controladoria
              estratégica, pareceres consultivos e ativos institucionais.
            </p>
          </div>
          <div className="relative z-10 mt-12 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 bg-[#07172B]/70 px-3 py-3 text-xs text-[#D5E3FF]">
              <BadgeCheck size={16} className="text-[#C5A265]" /> Provimento OAB
              Federal
            </div>
            <div className="flex items-center gap-2 bg-[#07172B]/70 px-3 py-3 text-xs text-[#D5E3FF]">
              <ShieldCheck size={16} className="text-[#C5A265]" /> LGPD
              Compliance
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <div className="flex items-start justify-between gap-6">
            <div>
              <span className="eyebrow">Autenticação corporativa</span>
              <h2 className="mt-3 font-heading text-3xl text-[#0E223D] sm:text-4xl">
                Credenciamento mandatário
              </h2>
            </div>
            <LockKeyhole size={22} className="mt-1 shrink-0 text-[#765A24]" />
          </div>
          <div className="mt-8 flex gap-3 bg-[#EEF2F8] p-4 text-sm text-[#526071]">
            <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#765A24]" />
            <p>
              <strong className="block text-[#0E223D]">
                Ambiente monitorado e auditado
              </strong>
              Conexão protegida e acesso limitado a usuários autorizados.
            </p>
          </div>
          <LoginForm />
          <p className="mt-8 border-t border-[#0E223D]/10 pt-5 text-center text-xs text-[#748096]">
            Rocha Advogados Associados · Sessão segura SSL/TLS
          </p>
        </section>
      </div>
    </main>
  );
}
