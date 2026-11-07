"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setErrorMessage(
        "Não foi possível validar suas credenciais. Confira os dados e tente novamente.",
      );
      setIsLoading(false);
      return;
    }

    setSuccessMessage("Credenciais verificadas. Acesso autorizado.");
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="eyebrow text-[#526071]">
          E-mail institucional
        </label>
        <div className="relative mt-2">
          <Mail
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#748096]"
          />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nome@rochaadvocacia.com.br"
            className="w-full border border-[#0E223D]/10 bg-[#EEF2F8] px-11 py-3.5 text-sm text-[#161C24] outline-none transition focus:border-[#C5A265] focus:bg-white focus:ring-2 focus:ring-[#C5A265]/20"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="password" className="eyebrow text-[#526071]">
            Senha corporativa
          </label>
          <button
            type="button"
            className="text-xs font-semibold text-[#765A24] hover:underline"
          >
            Esqueci minha senha
          </button>
        </div>
        <div className="relative mt-2">
          <LockKeyhole
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#748096]"
          />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua senha"
            className="w-full border border-[#0E223D]/10 bg-[#EEF2F8] px-11 py-3.5 pr-12 text-sm text-[#161C24] outline-none transition focus:border-[#C5A265] focus:bg-white focus:ring-2 focus:ring-[#C5A265]/20"
          />
          <button
            type="button"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center p-2 text-[#748096] hover:text-[#0E223D]"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p
          role="status"
          className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {successMessage}
        </p>
      )}

      <label className="flex items-start gap-3 text-sm leading-5 text-[#526071]">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[#0E223D]" />
        Reconhecer e confiar nesta estação de trabalho por 12 horas
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 bg-[#765A24] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#5C420E] disabled:cursor-wait disabled:opacity-70"
      >
        {isLoading && <LoaderCircle size={17} className="animate-spin" />}
        {isLoading ? "Validando credenciais..." : "Entrar no sistema jurídico"}
      </button>

      <Link
        href="/"
        className="block text-center text-xs font-semibold text-[#526071] hover:text-[#765A24]"
      >
        Voltar ao portal público
      </Link>
    </form>
  );
}
