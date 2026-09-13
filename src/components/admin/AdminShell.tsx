"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Search,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const modules = [
  { label: "Dashboard Geral", href: "/admin", icon: LayoutDashboard },
  { label: "Agenda & Prazos", href: "/admin/agenda", icon: CalendarDays },
  { label: "Gestão de Clientes", href: "/admin/clientes", icon: Users },
  { label: "Processos & Casos", href: "/admin/processos", icon: FileText },
];

export function AdminShell({
  children,
  commitmentsCount,
}: {
  children: React.ReactNode;
  commitmentsCount: number;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-[#161C24]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between bg-[#0E223D] p-5 text-white lg:flex">
        <div>
          <Link href="/admin" className="block border-b border-white/10 pb-6">
            <span className="font-heading text-xl tracking-[0.08em]">
              ROCHA
            </span>
            <span className="mt-1 block text-[0.5rem] font-bold tracking-[0.2em] text-[#C5A265]">
              ADVOCACIA & CONSULTORIA
            </span>
          </Link>
          <p className="mt-7 px-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#788AAA]">
            Módulos principais
          </p>
          <nav className="mt-3 space-y-1">
            {modules.map((module) => {
              const Icon = module.icon;
              const active =
                module.href === "/admin"
                  ? pathname === module.href
                  : pathname.startsWith(module.href);
              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className={`flex items-center gap-3 px-3 py-3 text-sm transition ${active ? "bg-[#07172B] text-[#E2C58E]" : "text-[#B7C4D8] hover:bg-[#07172B] hover:text-white"}`}
                >
                  <Icon size={17} />
                  <span>{module.label}</span>
                  {module.href === "/admin/agenda" && commitmentsCount > 0 && (
                    <span className="ml-auto rounded-full bg-[#BA1A1A] px-2 py-0.5 text-[0.62rem] text-white">
                      {commitmentsCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="space-y-4">
          <div className="border border-white/10 bg-[#07172B]/60 p-4 text-xs text-[#B7C4D8]">
            <div className="flex items-center justify-between uppercase tracking-wider">
              <span>Tribunais conectados</span>
              <span className="h-2 w-2 rounded-full bg-[#C5A265]" />
            </div>
            <p className="mt-2 leading-5">
              PJe, e-SAJ e Projudi sincronizados.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-3 text-sm text-[#B7C4D8] hover:bg-[#07172B] hover:text-white"
          >
            <LogOut size={17} /> Encerrar sessão
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-3 text-sm text-[#B7C4D8] hover:text-[#E2C58E]"
          >
            <ChevronRight size={17} /> Portal público
          </Link>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 border-b border-[#0E223D]/10 bg-white/90 px-5 backdrop-blur-xl lg:px-8">
          <div className="relative hidden max-w-xl flex-1 md:block">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#748096]"
            />
            <input
              placeholder="Pesquisar processo, cliente ou intimação..."
              className="w-full bg-[#EEF2F8] py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#C5A265]/30"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-right text-xs sm:block">
              <strong className="block text-[#0E223D]">
                Ambiente restrito
              </strong>
              <span className="text-[#748096]">Sessão autenticada</span>
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E223D] font-heading text-[#E2C58E]">
              R
            </div>
          </div>
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
