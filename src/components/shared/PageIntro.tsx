type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="bg-[#0E223D] py-16 text-white md:py-24">
      <div className="site-container">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
          {description}
        </p>
      </div>
    </section>
  );
}
