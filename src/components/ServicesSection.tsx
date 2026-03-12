import serviceDent from "@/assets/service-dent.jpg";
import serviceWindshield from "@/assets/service-windshield.jpg";
import serviceGlass from "@/assets/service-glass.jpg";
import imagemNova from "@/assets/imagem-nova.png";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Desamasso sem Pintar",
    description: "Técnica PDR que remove amassados preservando a pintura original do veículo.",
    image: serviceDent,
  },
  {
    title: "Parabrisa e Vidros",
    description: "Remoção e colocação de parabrisa com vedação perfeita e garantia total.",
    image: serviceWindshield,
  },
  {
    title: "Gravação de Vidros",
    description: "Gravação de segurança nos vidros do seu veículo conforme exigência legal.",
    image: serviceGlass,
  },
];

const extraServices = [
  "Colocação de faixa de porta",
  "Colagem de vidro",
  "Troca de para-choque",
  "Faixas e adesivos",
  "Regulagem de porta e para-choque",
  "Troca de airbag e painel",
  "Troca de cinto",
  "Retiramos infiltração de água",
];

const ServicesSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicos" ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-gradient-dark" />

      <div className="container relative z-10">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block font-body text-xs uppercase tracking-[0.3em] text-primary">
            O que fazemos
          </span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            Nossos <span className="text-gradient-gold">Serviços</span>
          </h2>
        </div>

        {/* Main services cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group overflow-hidden rounded-lg border border-gold/10 bg-card transition-all duration-500 hover:border-primary/30 hover:glow-gold ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="mb-2 font-display text-xl font-semibold uppercase text-foreground">
                  {service.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          ))}

          {/* Novo card abaixo do meio */}
          <div
            className={`group overflow-hidden rounded-lg border border-gold/10 bg-card transition-all duration-500 hover:border-primary/30 hover:glow-gold md:col-start-2 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={imagemNova}
                alt="Antes e Depois"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>

            <div className="p-6 text-center">
              <h3 className="font-display text-xl font-semibold uppercase text-foreground">
                Antes e Depois
              </h3>
            </div>
          </div>
        </div>

        {/* Extra services grid */}
        <div className="rounded-lg border border-gold/10 bg-card/50 p-8">
          <h3 className="mb-6 text-center font-display text-xl font-semibold uppercase text-foreground">
            Também trabalhamos com
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {extraServices.map((s, i) => (
              <div
                key={s}
                className={`flex items-center gap-3 rounded-md border border-gold/5 bg-secondary/50 px-4 py-3 transition-all duration-500 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${400 + i * 80}ms` }}
              >
                <span className="text-primary">✓</span>
                <span className="font-body text-sm text-foreground/80">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;