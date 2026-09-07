import Link from "next/link";
import { menuItems } from "@/data/menu";

export function Navbar() {
  return (
    <nav
      className="hidden items-center gap-6 lg:flex"
      aria-label="Navegação principal"
    >
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-[0.7rem] font-semibold tracking-wide text-white/65 transition-colors hover:text-[#C5A265]"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
