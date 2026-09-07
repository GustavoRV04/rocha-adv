import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { menuItems } from "@/data/menu";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-[#07172B] py-14 text-white">
      <div className="site-container grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr]">
        <div>
          <Link href="/" className="font-heading text-xl tracking-[0.08em]">
            ROCHA
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
            Advocacia estratégica pautada por discrição, rigor técnico e
            proximidade real em decisões que protegem patrimônios e relações.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg">Institucional</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/55">
            {menuItems.slice(1, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#C5A265]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-heading text-lg">Áreas de Atuação</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/55">
            <Link href="/areas-atuacao">Direito Civil & Contratos</Link>
            <Link href="/areas-atuacao">Família & Sucessões</Link>
            <Link href="/areas-atuacao">Empresarial & Societário</Link>
            <Link href="/areas-atuacao">Direito Imobiliário</Link>
          </div>
        </div>
        <div>
          <h2 className="font-heading text-lg">Atendimento & Sede</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm leading-6 text-white/55">
            <span className="flex gap-2">
              <MapPin size={16} className="mt-1 shrink-0 text-[#C5A265]" /> Av.
              Brigadeiro Faria Lima, 3477, 14º andar
              <br />
              Itaim Bibi, São Paulo - SP
            </span>
            <a
              href={`tel:${site.phone.replace(/\D/g, "")}`}
              className="flex gap-2 hover:text-[#C5A265]"
            >
              <Phone size={16} className="mt-1 text-[#C5A265]" /> {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex gap-2 hover:text-[#C5A265]"
            >
              <Mail size={16} className="mt-1 text-[#C5A265]" /> {site.email}
            </a>
          </div>
        </div>
      </div>
      <div className="site-container mt-12 border-t border-white/10 pt-5 text-xs text-white/40">
        © 2026 Rocha Advocacia e Consultoria Jurídica. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
