import { depoimentos } from "@/data/depoimentos";

export function TestimonialSection() {
  return (
    <section className="bg-[#EEF2F8] py-20 md:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Relações pautadas por confiança</span>
          <h2 className="section-title mt-3">
            A palavra de quem confia em nossa banca
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {depoimentos.map(({ name, quote }) => (
            <figure
              key={name}
              className="border border-[#0E223D]/8 bg-white p-7"
            >
              <div className="text-lg tracking-[0.2em] text-[#C5A265]">
                ★★★★★
              </div>
              <blockquote className="mt-5 font-heading text-lg leading-7 text-[#0E223D]">
                “{quote}”
              </blockquote>
              <figcaption className="mt-7 border-t border-[#0E223D]/10 pt-4 text-xs font-bold text-[#526071]">
                {name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
