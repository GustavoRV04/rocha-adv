import {
  ClipboardCheck,
  FileSearch,
  Gavel,
  MessageSquareText,
} from "lucide-react";
import { metodologia } from "@/data/metodologia";

const icons = {
  message: MessageSquareText,
  search: FileSearch,
  gavel: Gavel,
  check: ClipboardCheck,
};

export function MethodologySection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Rigor operacional</span>
          <h2 className="section-title mt-3">Metodologia de atuação</h2>
          <p className="mt-5 text-sm leading-7 text-[#526071]">
            Cada caso segue um fluxo de governança e diligência que transforma
            informação em segurança para decidir.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metodologia.map(({ number, title, description, icon }) => {
            const Icon = icons[icon];

            return (
              <article
                key={number}
                className="border-t-2 border-[#C5A265] bg-[#F4F6FA] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center bg-[#0E223D] font-heading text-lg text-[#C5A265]">
                    {number}
                  </span>
                  <Icon size={20} className="text-[#765A24]" />
                </div>
                <h3 className="mt-7 font-heading text-xl text-[#0E223D]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#526071]">
                  {description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
