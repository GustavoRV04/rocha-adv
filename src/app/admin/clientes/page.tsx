import { UserRound, Mail, Phone } from "lucide-react";
import { CreateRecordButton } from "@/components/admin/CreateRecordButton";
import { query } from "@/lib/db";

type Client = {
  id: string;
  nome_completo?: string | null;
  cpf_cnpj?: string | null;
  telefone?: string | null;
  email?: string | null;
  endereco?: string | null;
};

function formatValue(value?: string | null, fallback = "Não informado") {
  return value && value.trim().length > 0 ? value : fallback;
}

export default async function ClientsPage() {
  const { rows } = await query<Client>("SELECT * FROM clientes ORDER BY created_at DESC");
  const clients = rows;

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">Gestão de clientes</span>
          <h1 className="mt-2 font-heading text-4xl text-[#0E223D]">
            Clientes cadastrados
          </h1>
          <p className="mt-3 text-sm text-[#526071]">
            Registros sincronizados com a tabela <strong>clientes</strong> do
            Neon.
          </p>
        </div>
        <CreateRecordButton type="cliente" label="Novo cliente" />
      </div>

      {clients.length === 0 && (
        <div className="border border-dashed border-[#0E223D]/20 bg-white p-12 text-center">
          <UserRound size={30} className="mx-auto text-[#C5A265]" />
          <h2 className="mt-4 font-heading text-2xl text-[#0E223D]">
            Nenhum cliente cadastrado
          </h2>
          <p className="mt-2 text-sm text-[#526071]">
            Quando um registro for inserido no Neon, ele aparecerá aqui.
          </p>
        </div>
      )}

      {clients.length > 0 && (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-[#0E223D]/8 bg-white shadow-sm">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <thead className="bg-[#EEF2F8] text-xs uppercase tracking-wider text-[#526071]">
                <tr>
                  <th className="px-5 py-4">Cliente</th>
                  <th className="px-5 py-4">CPF / CNPJ</th>
                  <th className="px-5 py-4">Telefone</th>
                  <th className="px-5 py-4">E-mail</th>
                  <th className="px-5 py-4">Endereço</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0E223D]/8">
                {clients.map((client: Client) => (
                  <tr key={client.id} className="align-top hover:bg-[#FBFBF9]">
                    <td className="px-5 py-4 font-semibold text-[#0E223D]">
                      {formatValue(client.nome_completo, "Sem nome")}
                    </td>
                    <td className="px-5 py-4 text-[#526071]">
                      {formatValue(client.cpf_cnpj)}
                    </td>
                    <td className="px-5 py-4 text-[#526071]">
                      <span className="flex items-center gap-2">
                        <Phone size={14} /> {formatValue(client.telefone)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#526071]">
                      <span className="flex items-center gap-2">
                        <Mail size={14} /> {formatValue(client.email)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#526071]">
                      {formatValue(client.endereco)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {clients.map((client: Client) => (
              <article
                key={client.id}
                className="rounded-2xl border border-[#0E223D]/10 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="eyebrow">Cliente</span>
                    <h2 className="mt-2 font-heading text-2xl text-[#0E223D]">
                      {formatValue(client.nome_completo, "Cliente sem nome")}
                    </h2>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF2F8] text-[#0E223D]">
                    <UserRound size={18} />
                  </div>
                </div>

                <dl className="mt-5 space-y-3 text-sm text-[#526071]">
                  <div>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#748096]">
                      CPF / CNPJ
                    </dt>
                    <dd className="mt-1">{formatValue(client.cpf_cnpj)}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#748096]">
                      Telefone
                    </dt>
                    <dd className="mt-1">{formatValue(client.telefone)}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#748096]">
                      E-mail
                    </dt>
                    <dd className="mt-1 break-all">{formatValue(client.email)}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#748096]">
                      Endereço
                    </dt>
                    <dd className="mt-1">{formatValue(client.endereco)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
