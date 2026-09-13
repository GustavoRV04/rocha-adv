import { UserRound, Mail, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CreateRecordButton } from "@/components/admin/CreateRecordButton";

type Client = {
  id: string;
  nome_completo?: string | null;
  cpf_cnpj?: string | null;
  telefone?: string | null;
  email?: string | null;
};

export default async function ClientsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("clientes").select("*");
  const clients = (data ?? []) as Client[];

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
            Supabase.
          </p>
        </div>
        <CreateRecordButton type="cliente" label="Novo cliente" />
      </div>
      {error && (
        <p className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Não foi possível carregar os clientes. Verifique as políticas RLS da
          tabela.
        </p>
      )}
      {!error && clients.length === 0 && (
        <div className="border border-dashed border-[#0E223D]/20 bg-white p-12 text-center">
          <UserRound size={30} className="mx-auto text-[#C5A265]" />
          <h2 className="mt-4 font-heading text-2xl text-[#0E223D]">
            Nenhum cliente cadastrado
          </h2>
          <p className="mt-2 text-sm text-[#526071]">
            Quando um registro for inserido no Supabase, ele aparecerá aqui.
          </p>
        </div>
      )}
      {clients.length > 0 && (
        <div className="overflow-x-auto border border-[#0E223D]/8 bg-white shadow-sm">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="bg-[#EEF2F8] text-xs uppercase tracking-wider text-[#526071]">
              <tr>
                <th className="px-5 py-4">Cliente</th>
                <th className="px-5 py-4">CPF / CNPJ</th>
                <th className="px-5 py-4">Telefone</th>
                <th className="px-5 py-4">E-mail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0E223D]/8">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-[#FBFBF9]">
                  <td className="px-5 py-4 font-semibold text-[#0E223D]">
                    {client.nome_completo || "Sem nome"}
                  </td>
                  <td className="px-5 py-4 text-[#526071]">
                    {client.cpf_cnpj || "Não informado"}
                  </td>
                  <td className="px-5 py-4 text-[#526071]">
                    <span className="flex items-center gap-2">
                      <Phone size={14} /> {client.telefone || "Não informado"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#526071]">
                    <span className="flex items-center gap-2">
                      <Mail size={14} /> {client.email || "Não informado"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
