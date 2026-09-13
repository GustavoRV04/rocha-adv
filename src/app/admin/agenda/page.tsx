import { CalendarClock, CheckCircle2, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CreateRecordButton } from "@/components/admin/CreateRecordButton";

type Commitment = Record<string, unknown> & { id?: string };

type WeekDay = {
  date: Date;
  isoDate: string;
  weekday: string;
};

function startOfWeek(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + mondayOffset);
  result.setHours(0, 0, 0, 0);
  return result;
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getWeekDays() {
  const firstDay = startOfWeek(new Date());

  return Array.from({ length: 7 }, (_, index): WeekDay => {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + index);

    return {
      date,
      isoDate: toIsoDate(date),
      weekday: date.toLocaleDateString("pt-BR", { weekday: "long" }),
    };
  });
}

function getCommitmentDate(commitment: Commitment) {
  const value = commitment.data ?? commitment.data_evento ?? commitment.date;
  return typeof value === "string" ? value.slice(0, 10) : "";
}

function getCommitmentTitle(commitment: Commitment) {
  return String(
    commitment.titulo ??
      commitment.nome ??
      commitment.descricao ??
      "Compromisso jurídico",
  );
}

function getCommitmentTime(commitment: Commitment) {
  return String(commitment.hora ?? commitment.horario ?? "Horário a definir");
}

export default async function AgendaPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("compromissos").select("*");
  const commitments = (data ?? []) as Commitment[];
  const weekDays = getWeekDays();
  const today = toIsoDate(new Date());

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">Controle processual e atos judiciais</span>
          <h1 className="mt-2 font-heading text-4xl text-[#0E223D]">
            Agenda & Prazos
          </h1>
          <p className="mt-3 text-sm text-[#526071]">
            Visualização semanal para identificar compromissos e horários
            livres.
          </p>
        </div>
        <CreateRecordButton type="compromisso" label="Novo compromisso" />
      </div>

      {error && (
        <p className="border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Não foi possível sincronizar os registros do Supabase. A agenda segue
          disponível para consulta, mas os compromissos existentes não puderam
          ser carregados.
        </p>
      )}

      <section className="border border-[#0E223D]/8 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex flex-col justify-between gap-3 border-b border-[#0E223D]/10 pb-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center bg-[#0E223D] text-[#E2C58E]">
              <CalendarClock size={20} />
            </span>
            <div>
              <span className="eyebrow">Agenda semanal</span>
              <h2 className="mt-1 font-heading text-2xl text-[#0E223D]">
                Semana atual
              </h2>
            </div>
          </div>
          <span className="text-sm text-[#526071]">
            {weekDays[0].date.toLocaleDateString("pt-BR")} até{" "}
            {weekDays[6].date.toLocaleDateString("pt-BR")}
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {weekDays.map((day) => {
            const dayCommitments = commitments.filter(
              (commitment) => getCommitmentDate(commitment) === day.isoDate,
            );
            const isToday = day.isoDate === today;

            return (
              <article
                key={day.isoDate}
                className={`min-h-64 border p-4 ${isToday ? "border-[#C5A265] bg-[#FFFDF7]" : "border-[#0E223D]/10 bg-[#F4F6FA]"}`}
              >
                <div className="flex items-start justify-between gap-2 border-b border-[#0E223D]/10 pb-3">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#526071]">
                      {day.weekday}
                    </span>
                    <strong className="mt-1 block font-heading text-2xl text-[#0E223D]">
                      {day.date.getDate()}
                    </strong>
                  </div>
                  {isToday && (
                    <span className="bg-[#C5A265] px-2 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-[#07172B]">
                      Hoje
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  {dayCommitments.length > 0 ? (
                    dayCommitments.map((commitment, index) => (
                      <div
                        key={String(commitment.id ?? `${day.isoDate}-${index}`)}
                        className="border-l-2 border-[#C5A265] bg-white p-3 shadow-sm"
                      >
                        <span className="flex items-center gap-1 text-xs font-bold text-[#765A24]">
                          <Clock size={12} /> {getCommitmentTime(commitment)}
                        </span>
                        <h3 className="mt-2 text-sm font-semibold leading-5 text-[#0E223D]">
                          {getCommitmentTitle(commitment)}
                        </h3>
                        <span className="mt-2 block text-[0.68rem] text-[#748096]">
                          {String(commitment.status ?? "Pendente")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex min-h-32 flex-col items-center justify-center border border-dashed border-[#0E223D]/15 px-3 text-center">
                      <CheckCircle2 size={18} className="text-[#C5A265]" />
                      <span className="mt-2 text-xs font-semibold text-[#526071]">
                        Dia livre
                      </span>
                      <span className="mt-1 text-[0.68rem] leading-4 text-[#748096]">
                        Nenhum compromisso registrado
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-5 text-xs text-[#526071]">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 bg-[#C5A265]" /> Compromisso registrado
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 border border-dashed border-[#0E223D]/30" />
          Horário livre
        </span>
        <span className="flex items-center gap-2">
          <CalendarClock size={14} className="text-[#765A24]" />
          {commitments.length} registro(s) carregado(s)
        </span>
      </div>
    </div>
  );
}
