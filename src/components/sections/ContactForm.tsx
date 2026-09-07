"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

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
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
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
          rows={5}
          className="mt-2 w-full resize-y border border-[#0E223D]/15 bg-[#FBFBF9] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#C5A265]"
        />
      </label>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <span className="flex items-center gap-2 text-xs text-[#526071]">
          <LockKeyhole size={14} className="text-[#C5A265]" /> Seus dados são
          tratados sob sigilo.
        </span>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#C5A265] px-5 py-3 text-sm font-bold text-[#07172B] hover:bg-[#E2C58E]"
        >
          Solicitar análise <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
