import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { Navbar } from "./Navbar";
import { site } from "@/data/site";

export function Header() {
  return (
    <header className="relative z-40 bg-[#0E223D] text-white shadow-lg">
      <div className="border-b border-white/10 bg-[#07172B] text-[0.65rem] text-white/70">
        <div className="site-container flex min-h-9 items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 sm:flex">
              <Phone size={12} className="text-[#C5A265]" /> {site.phone}
            </span>
            <span className="hidden md:inline">{site.hours}</span>
            <span className="hidden xl:inline">{site.oab}</span>
          </div>
          <a
            href={site.whatsappUrl}
            className="flex items-center gap-1.5 text-[#C5A265]"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={12} /> WhatsApp: {site.whatsapp}
          </a>
        </div>
      </div>
      <div className="site-container relative flex min-h-[4.75rem] items-center justify-between gap-5">
        <Link href="/" className="flex shrink-0 flex-col leading-none">
          <span className="font-heading text-xl tracking-[0.08em]">ROCHA</span>
          <span className="mt-1 text-[0.52rem] font-bold tracking-[0.23em] text-[#C5A265]">
            ADVOCACIA & CONSULTORIA
          </span>
        </Link>
        <Navbar />
        <div className="flex items-center gap-3">
          <Link
            href="/contato"
            className="hidden bg-[#C5A265] px-4 py-2.5 text-[0.68rem] font-bold text-[#07172B] transition-colors hover:bg-[#E2C58E] sm:inline-flex"
          >
            Agendar Consulta
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
