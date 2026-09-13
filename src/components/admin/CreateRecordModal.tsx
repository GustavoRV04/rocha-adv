"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type RecordType = "cliente" | "compromisso" | "processo";

type CreateRecordModalProps = {
  type: RecordType;
  onClose: () => void;
};

const configuration = {
  cliente: {
    title: "Novo cliente",
    table: "clientes",
    fields: [
      {
        name: "nome_completo",
        label: "Nome completo",
        type: "text",
        required: true,
      },
      { name: "cpf_cnpj", label: "CPF / CNPJ", type: "text", required: false },
      { name: "telefone", label: "Telefone", type: "tel", required: false },
      { name: "email", label: "E-mail", type: "email", required: false },
    ],
  },
  compromisso: {
    title: "Novo compromisso",
    table: "compromissos",
    fields: [
      {
        name: "titulo",
        label: "Título do compromisso",
        type: "text",
        required: true,
      },
      { name: "data", label: "Data", type: "date", required: false },
      { name: "hora", label: "Horário", type: "time", required: false },
      { name: "status", label: "Status", type: "text", required: false },
    ],
  },
  processo: {
    title: "Novo processo",
    table: "processos",
    fields: [
      {
        name: "titulo",
        label: "Título do processo",
        type: "text",
        required: true,
      },
      {
        name: "numero",
        label: "Número do processo",
        type: "text",
        required: false,
      },
      { name: "status", label: "Status", type: "text", required: false },
    ],
  },
} as const;

export function CreateRecordModal({ type, onClose }: CreateRecordModalProps) {
  const router = useRouter();
  const current = configuration[type];
  const [values, setValues] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    const payload = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value.trim() !== ""),
    );
    const { error } = await createClient().from(current.table).insert(payload);

    if (error) {
      setErrorMessage(
        `Não foi possível salvar. Confira as colunas da tabela ${current.table} e as políticas RLS.`,
      );
      setIsSaving(false);
      return;
    }

    router.refresh();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07172B]/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-record-title"
    >
      <div className="w-full max-w-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#0E223D]/10 p-6">
          <div>
            <span className="eyebrow">Registro administrativo</span>
            <h2
              id="create-record-title"
              className="mt-2 font-heading text-3xl text-[#0E223D]"
            >
              {current.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar formulário"
            className="p-2 text-[#526071] hover:bg-[#EEF2F8]"
          >
            <X size={19} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {current.fields.map((field) => (
              <label
                key={field.name}
                className="text-xs font-bold uppercase tracking-wider text-[#0E223D]"
              >
                {field.label}
                {field.required ? " *" : ""}
                <input
                  required={field.required}
                  type={field.type}
                  value={values[field.name] ?? ""}
                  onChange={(event) =>
                    setValues((currentValues) => ({
                      ...currentValues,
                      [field.name]: event.target.value,
                    }))
                  }
                  className="mt-2 w-full border border-[#0E223D]/15 bg-[#F4F6FA] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#C5A265] focus:bg-white"
                />
              </label>
            ))}
          </div>
          {errorMessage && (
            <p
              role="alert"
              className="border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}
          <div className="flex justify-end gap-3 border-t border-[#0E223D]/10 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 text-sm font-semibold text-[#526071] hover:bg-[#EEF2F8]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-[#0E223D] px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
            >
              {isSaving && <LoaderCircle size={16} className="animate-spin" />}
              {isSaving ? "Salvando..." : "Salvar registro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
