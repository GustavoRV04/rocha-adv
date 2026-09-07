import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/shared/PageIntro";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { equipe } from "@/data/equipe";

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Liderança · sócios e associados"
          title="Corpo jurídico de alto desempenho"
          description="Formação acadêmica sólida aliada à experiência prática nos principais foros jurídicos nacionais."
        />
        <section className="bg-[#F4F6FA] py-20">
          <div className="site-container grid gap-5 md:grid-cols-2">
            {equipe.map(({ name, role, bio }, index) => (
              <article
                key={name}
                className={`border bg-white p-7 shadow-sm ${index === 0 ? "border-[#C5A265] md:col-span-2" : "border-[#0E223D]/8"}`}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="eyebrow">{role}</span>
                    <h2 className="mt-2 font-heading text-2xl text-[#0E223D]">
                      {name}
                    </h2>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center bg-[#0E223D] font-heading text-2xl text-[#C5A265]">
                    {name.split(" ")[1]?.[0] ?? "R"}
                  </span>
                </div>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#526071]">
                  {bio}
                </p>
              </article>
            ))}
          </div>
        </section>
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
