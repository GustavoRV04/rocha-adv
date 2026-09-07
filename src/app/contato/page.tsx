import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/shared/PageIntro";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { faq } from "@/data/faq";
import { site } from "@/data/site";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Prática jurídica sigilosa e personalizada"
          title="Agende uma consulta jurídica reservada"
          description="Escolha entre uma reunião em nossa sede ou uma videoconferência segura. Nossa equipe está pronta para ouvir o seu caso."
        />
        <section className="bg-[#F4F6FA] py-16 md:py-24">
          <div className="site-container grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-[#0E223D] p-8 text-white">
              <span className="eyebrow">Sede institucional</span>
              <h2 className="mt-3 font-heading text-3xl">
                Porto Alegre/RS · Porto Alegre
              </h2>
              <div className="mt-8 flex flex-col gap-5 text-sm leading-6 text-white/65">
                <span className="flex gap-3">
                  <MapPin size={18} className="mt-1 shrink-0 text-[#C5A265]" />{" "}
                  {site.address}
                  <br />
                  {site.city}
                </span>
                <a
                  href={`tel:${site.phone.replace(/\D/g, "")}`}
                  className="flex gap-3 hover:text-[#C5A265]"
                >
                  <Phone size={18} className="text-[#C5A265]" /> {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex gap-3 hover:text-[#C5A265]"
                >
                  <Mail size={18} className="text-[#C5A265]" /> {site.email}
                </a>
              </div>
              <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-5 text-white/55">
                Segunda a sexta, das 09:00 às 18:30.
                <br />
                Atendimentos mediante agendamento prévio.
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
        <section className="bg-[#EEF2F8] py-16">
          <div className="site-container">
            <h2 className="section-title text-3xl">Perguntas frequentes</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {faq.map((item) => (
                <article key={item.question} className="bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-xl text-[#0E223D]">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#526071]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
