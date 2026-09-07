import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Gavel,
  HeartPulse,
  Landmark,
  Users,
} from "lucide-react";
import { areas } from "@/data/areas";

const icons = {
  gavel: Gavel,
  users: Users,
  "building-2": Building2,
  landmark: Landmark,
  "briefcase-business": BriefcaseBusiness,
  "heart-pulse": HeartPulse,
};

export function PraticeAreas() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Expertise técnica e consultiva</span>
          <h2 className="section-title mt-3">
            Especialidades jurídicas estratégicas
          </h2>
          <div className="gold-rule mx-auto mt-6" />
          <p className="mt-6 text-sm leading-7 text-[#526071]">
            Abordagens multidisciplinares pensadas para blindar seus interesses,
            resguardar relações familiares e impulsionar negócios seguros.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => {
            const Icon = icons[area.icon as keyof typeof icons];
            return (
              <article
                key={area.slug}
                className="group flex min-h-[16rem] flex-col border border-[#0E223D]/8 bg-[#FBFBF9] p-7 transition-all hover:-translate-y-1 hover:border-[#C5A265] hover:shadow-xl"
              >
                <div className="h-0.5 w-10 bg-[#C5A265] transition-all group-hover:w-16" />
                <div className="mt-6 flex h-11 w-11 items-center justify-center bg-[#EEF2F8] text-[#0E223D] group-hover:bg-[#0E223D] group-hover:text-[#C5A265]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 font-heading text-xl text-[#0E223D]">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#526071]">
                  {area.description}
                </p>
                <Link
                  href="/areas-atuacao"
                  className="mt-auto flex items-center gap-2 pt-6 text-xs font-bold text-[#765A24]"
                >
                  Conhecer atuação <ArrowRight size={14} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
