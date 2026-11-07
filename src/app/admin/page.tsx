import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";
import { query } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [clients, processes, commitments] = await Promise.all([
    query<{ count: number }>("SELECT COUNT(*)::int AS count FROM clientes"),
    query<{ count: number }>("SELECT COUNT(*)::int AS count FROM processos"),
    query<{ count: number }>("SELECT COUNT(*)::int AS count FROM compromissos"),
  ]);

  const metrics = [
    {
      label: "Clientes ativos",
      value: clients.rows[0]?.count ?? 0,
      icon: Users,
      href: "/admin/clientes",
    },
    {
      label: "Processos e casos",
      value: processes.rows[0]?.count ?? 0,
      icon: FileText,
      href: "/admin/processos",
    },
    {
      label: "Compromissos",
      value: commitments.rows[0]?.count ?? 0,
      icon: CalendarClock,
      href: "/admin/agenda",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <section className="border border-[#0E223D]/8 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Gabinete de gestão jurídica</span>
            <h1 className="mt-2 font-heading text-4xl text-[#0E223D] sm:text-5xl">
              Dashboard Geral
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#526071]">
              Visão executiva dos dados registrados no seu workspace jurídico.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#526071]">
            <ShieldCheck size={17} className="text-[#C5A265]" /> Ambiente
            protegido
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group border border-[#0E223D]/8 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#C5A265]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#748096]">
                  {label}
                </span>
                <strong className="mt-3 block font-heading text-4xl text-[#0E223D]">
                  {value}
                </strong>
              </div>
              <span className="flex h-10 w-10 items-center justify-center bg-[#EEF2F8] text-[#765A24]">
                <Icon size={19} />
              </span>
            </div>
            <span className="mt-6 flex items-center gap-2 text-xs font-bold text-[#765A24]">
              Acessar módulo{" "}
              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="border border-[#0E223D]/8 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="eyebrow">Próximos compromissos</span>
              <h2 className="mt-2 font-heading text-2xl text-[#0E223D]">
                Agenda jurídica
              </h2>
            </div>
            <Link
              href="/admin/agenda"
              className="text-xs font-bold text-[#765A24]"
            >
              Ver agenda
            </Link>
          </div>
          <div className="mt-6 border-l-2 border-[#C5A265] bg-[#F4F6FA] p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#765A24]">
            Dados do Neon
            </span>
            <p className="mt-2 text-sm leading-6 text-[#526071]">
              A agenda está pronta para receber os registros da tabela{" "}
              <strong>compromissos</strong>.
            </p>
          </div>
        </div>
        <div className="border border-[#0E223D]/8 bg-[#0E223D] p-6 text-white">
          <span className="eyebrow">Segurança</span>
          <h2 className="mt-2 font-heading text-2xl">Sessão autenticada</h2>
          <p className="mt-3 text-sm leading-6 text-white/60">
            O acesso aos módulos administrativos depende da sessão autenticada
            configurada no ambiente local e no Vercel.
          </p>
        </div>
      </section>
    </div>
  );
}
