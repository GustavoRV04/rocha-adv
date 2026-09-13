import { FileText, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CreateRecordButton } from "@/components/admin/CreateRecordButton";

type Process = Record<string, unknown> & { id?: string };

export default async function ProcessesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("processos").select("*");
  const processes = (data ?? []) as Process[];

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">Processos e casos</span>
          <h1 className="mt-2 font-heading text-4xl text-[#0E223D]">
            Prontuário processual
          </h1>
          <p className="mt-3 text-sm text-[#526071]">
            Casos sincronizados com a tabela <strong>processos</strong> do
            Supabase.
          </p>
        </div>
        <CreateRecordButton type="processo" label="Novo processo" />
      </div>
      <div className="flex max-w-xl items-center gap-3 border border-[#0E223D]/10 bg-white px-4 py-3 text-sm text-[#748096]">
        <Search size={17} /> Pesquisar por número, cliente ou assunto...
      </div>
      {error && (
        <p className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Não foi possível carregar os processos. Verifique as políticas RLS da
          tabela.
        </p>
      )}
      {!error && processes.length === 0 && (
        <div className="border border-dashed border-[#0E223D]/20 bg-white p-12 text-center">
          <FileText size={32} className="mx-auto text-[#C5A265]" />
          <h2 className="mt-4 font-heading text-2xl text-[#0E223D]">
            Nenhum processo cadastrado
          </h2>
          <p className="mt-2 text-sm text-[#526071]">
            Os registros inseridos no Supabase aparecerão nesta área.
          </p>
        </div>
      )}
      {processes.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {processes.map((item, index) => (
            <article
              key={String(item.id ?? index)}
              className="border border-[#0E223D]/8 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow">Caso {index + 1}</span>
                  <h2 className="mt-3 font-heading text-xl text-[#0E223D]">
                    {String(
                      item.titulo ??
                        item.assunto ??
                        item.nome ??
                        "Processo sem título",
                    )}
                  </h2>
                </div>
                <FileText size={19} className="text-[#C5A265]" />
              </div>
              <dl className="mt-5 grid gap-3 text-sm text-[#526071]">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#748096]">
                    Número
                  </dt>
                  <dd className="mt-1">
                    {String(
                      item.numero ?? item.numero_processo ?? "Não informado",
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#748096]">
                    Status
                  </dt>
                  <dd className="mt-1">
                    {String(item.status ?? "Em andamento")}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
