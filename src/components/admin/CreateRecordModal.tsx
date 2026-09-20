"use client";

import { FormEvent, useMemo, useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

type RecordType = "cliente" | "compromisso" | "processo";

type CreateRecordModalProps = {
  type: RecordType;
  onClose: () => void;
};

const configuration = {
  cliente: {
    title: "Novo cliente",
    subtitle: "Registro de dados cadastrais e contato",
    table: "clientes",
    fields: [
      {
        name: "nome_completo",
        label: "Nome completo",
        type: "text",
        placeholder: "Ex: Gustavo Rocha",
        required: true,
      },
      {
        name: "cpf_cnpj",
        label: "CPF / CNPJ",
        type: "text",
        placeholder: "000.000.000-00",
        required: false,
      },
      {
        name: "telefone",
        label: "Telefone",
        type: "tel",
        placeholder: "(11) 99992-2333",
        required: false,
      },
      {
        name: "email",
        label: "E-mail",
        type: "email",
        placeholder: "nome@empresa.com",
        required: false,
      },
      {
        name: "endereco",
        label: "Endereço",
        type: "text",
        placeholder: "Rua, número, bairro, cidade",
        required: false,
      },
    ],
  },
  compromisso: {
    title: "Novo compromisso",
    subtitle: "Agendamento e controle de audiência",
    table: "compromissos",
    fields: [
      {
        name: "titulo",
        label: "Título do compromisso",
        type: "text",
        placeholder: "Reunião com cliente",
        required: true,
      },
      { name: "data", label: "Data", type: "date", placeholder: "", required: false },
      { name: "hora", label: "Horário", type: "time", placeholder: "", required: false },
      {
        name: "local_audiencia",
        label: "Local da audiência",
        type: "text",
        placeholder: "Tribunal, sala ou videoconferência",
        required: false,
      },
      {
        name: "observacoes",
        label: "Observações",
        type: "textarea",
        placeholder: "Detalhes relevantes do compromisso",
        required: false,
      },
    ],
  },
  processo: {
    title: "Novo processo",
    subtitle: "Cadastro inicial do caso",
    table: "processos",
    fields: [
      {
        name: "numero_processo",
        label: "Número do processo",
        type: "text",
        placeholder: "0000000-00.2025.8.26.0000",
        required: true,
      },
      {
        name: "tribunal",
        label: "Tribunal",
        type: "text",
        placeholder: "TJSP",
        required: false,
      },
      {
        name: "vara_comarca",
        label: "Vara / Comarca",
        type: "text",
        placeholder: "7ª Vara Cível",
        required: false,
      },
      {
        name: "status",
        label: "Status",
        type: "text",
        placeholder: "Em andamento",
        required: false,
      },
    ],
  },
} as const;

export function CreateRecordModal({ type, onClose }: CreateRecordModalProps) {
  const router = useRouter();
  const current = configuration[type];
  const [values, setValues] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const placeholders = useMemo(
    () => current.fields.filter((field) => field.type !== "date" && field.type !== "time"),
    [current.fields],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    const payload = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value.trim() !== ""),
    );

    try {
      const normalizedValues = { ...payload };

      if (type === "compromisso") {
        const dateValue = normalizedValues.data;
        const timeValue = normalizedValues.hora;
        if (dateValue && timeValue) {
          const isoDate = new Date(`${dateValue}T${timeValue}:00`);
          if (!Number.isNaN(isoDate.getTime())) {
            normalizedValues.data_hora_inicio = isoDate.toISOString();
          }
        }
        delete normalizedValues.data;
        delete normalizedValues.hora;
      }

      if (type === "processo" && normalizedValues.numero_processo && !normalizedValues.numero_processo) {
        normalizedValues.numero_processo = normalizedValues.numero_processo;
      }

      const response = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          values: normalizedValues,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível salvar o registro.");
      }

      router.refresh();
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível salvar o registro.";
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07172B]/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-record-title"
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-[#0E223D]/10 bg-[#F5F7FB] shadow-[0_30px_80px_rgba(14,34,61,0.24)]">
        <div className="flex items-start justify-between border-b border-[#0E223D]/10 bg-white px-6 py-5">
          <div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#C5A265]">
              Registro administrativo
            </span>
            <h2 id="create-record-title" className="mt-2 font-heading text-[2.1rem] leading-none text-[#0E223D]">
              {current.title}
            </h2>
            <p className="mt-2 text-sm text-[#526071]">{current.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar formulário"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#526071] transition hover:bg-[#EEF2F8] hover:text-[#0E223D]"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            {current.fields.map((field) => {
              const isTextArea = field.type === "textarea";

              return (
                <label
                  key={field.name}
                  className={field.type === "date" || field.type === "time" ? "block" : "block md:col-span-1"}
                >
                  <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#0E223D]">
                    {field.label}
                    {field.required ? " *" : ""}
                  </span>
                  {isTextArea ? (
                    <textarea
                      required={field.required}
                      value={values[field.name] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        setValues((currentValues) => ({
                          ...currentValues,
                          [field.name]: event.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full border border-[#0E223D]/15 bg-[#F4F6FA] px-4 py-3 text-sm text-[#0E223D] outline-none transition focus:border-[#C5A265] focus:bg-white focus:ring-2 focus:ring-[#C5A265]/20"
                    />
                  ) : (
                    <input
                      required={field.required}
                      type={field.type}
                      value={values[field.name] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        setValues((currentValues) => ({
                          ...currentValues,
                          [field.name]: event.target.value,
                        }))
                      }
                      className="w-full border border-[#0E223D]/15 bg-[#F4F6FA] px-4 py-3 text-sm text-[#0E223D] outline-none transition focus:border-[#C5A265] focus:bg-white focus:ring-2 focus:ring-[#C5A265]/20"
                    />
                  )}
                </label>
              );
            })}
          </div>

          <div className="rounded-xl border border-[#0E223D]/10 bg-white p-4">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#0E223D]">
              Observações
            </p>
            <p className="mt-2 text-sm text-[#526071]">
              {placeholders.length > 0
                ? "Preencha os dados principais do registro e confirme o envio para sincronizar com o banco de dados do escritório."
                : "Confirme os dados do registro antes de salvar no sistema."}
            </p>
          </div>

          {errorMessage && (
            <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-[#0E223D]/10 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 text-sm font-semibold text-[#526071] transition hover:bg-[#EEF2F8]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-[#0E223D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#07172B] disabled:cursor-not-allowed disabled:opacity-70"
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
