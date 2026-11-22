"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          area: formData.get("area"),
          summary: formData.get("summary"),
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        setErrorMessage(
          result.error ?? "Não foi possível enviar. Tente novamente.",
        );
        return;
      }

      setSent(true);
    } catch {
      setErrorMessage(
        "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="flex min-h-[24rem] flex-col items-center justify-center bg-[#EEF2F8] p-8 text-center">
        <CheckCircle2 size={48} className="text-[#765A24]" />
        <h2 className="mt-5 font-heading text-3xl text-[#0E223D]">
          Solicitação recebida
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-[#526071]">
          Nossa equipe entrará em contato em até 2 horas úteis para confirmar os
          próximos passos.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-xs font-bold text-[#765A24] underline"
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-xl md:p-10"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="eyebrow">Protocolo de triagem</span>
          <h2 className="mt-2 font-heading text-3xl text-[#0E223D]">
            Solicitação de consulta reservada
          </h2>
        </div>
        <LockKeyhole size={20} className="shrink-0 text-[#C5A265]" />
      </div>
      <p className="mt-4 text-sm leading-6 text-[#526071]">
        Preencha os campos iniciais. O contato não constitui contratação ou
        mandato.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#0E223D]">
          Nome completo
          <input
            required
            name="name"
            className="mt-2 w-full border border-[#0E223D]/15 bg-[#FBFBF9] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#C5A265]"
          />
        </label>
        <label className="text-xs font-bold uppercase tracking-wider text-[#0E223D]">
          E-mail
          <input
            required
            type="email"
            name="email"
            className="mt-2 w-full border border-[#0E223D]/15 bg-[#FBFBF9] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#C5A265]"
          />
        </label>
        <label className="text-xs font-bold uppercase tracking-wider text-[#0E223D]">
          Telefone / WhatsApp
          <input
            required
            name="phone"
            className="mt-2 w-full border border-[#0E223D]/15 bg-[#FBFBF9] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#C5A265]"
          />
        </label>
        <label className="text-xs font-bold uppercase tracking-wider text-[#0E223D]">
          Área de interesse
          <select
            required
            name="area"
            defaultValue=""
            className="mt-2 w-full border border-[#0E223D]/15 bg-[#FBFBF9] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#C5A265]"
          >
            <option value="" disabled>
              Selecione uma área
            </option>
            <option>Direito Civil & Contratos</option>
            <option>Família & Sucessões</option>
            <option>Empresarial & Societário</option>
            <option>Direito Imobiliário</option>
            <option>Outra necessidade</option>
          </select>
        </label>
      </div>
      <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-[#0E223D]">
        Breve resumo do caso
        <textarea
          required
          name="summary"
          maxLength={2000}
          rows={5}
          className="mt-2 w-full resize-y border border-[#0E223D]/15 bg-[#FBFBF9] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#C5A265]"
        />
      </label>
      <p className="mt-2 text-xs leading-5 text-[#526071]">
        Para sua segurança, não inclua documentos, senhas ou informações
        sensíveis neste primeiro contato.
      </p>
      {errorMessage && (
        <p
          role="alert"
          className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}
      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <span className="flex items-center gap-2 text-xs text-[#526071]">
          <LockKeyhole size={14} className="text-[#C5A265]" /> Seus dados são
          tratados sob sigilo.
        </span>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-[#C5A265] px-5 py-3 text-sm font-bold text-[#07172B] hover:bg-[#E2C58E] disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              Enviando solicitação <LoaderCircle size={16} className="animate-spin" />
            </>
          ) : (
            <>
              Solicitar análise <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
