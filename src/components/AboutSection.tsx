import { useEffect, useRef, useState } from "react";
import { Shield, Clock, Award } from "lucide-react";

const features = [
  { icon: Shield, title: "Garantia", desc: "Peças e serviços com garantia total de qualidade." },
  { icon: Clock, title: "Orçamento Rápido", desc: "Resposta ágil para resolver seu problema." },
  { icon: Award, title: "Experiência", desc: "Profissional altamente qualificado e experiente." },
];

const AboutSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre" ref={ref} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-background" />
      {/* Decorative gold line */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div className="container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-block font-body text-xs uppercase tracking-[0.3em] text-primary">
              Por que nos escolher
            </span>
            <h2 className="mb-6 font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              Qualidade que{" "}
              <span className="text-gradient-gold">Transforma</span>
            </h2>
            <p className="mb-8 font-body text-base leading-relaxed text-muted-foreground">
              Vleydson é referência em Martelinho de Ouro em Ceilândia e região.
              Com anos de experiência, oferecemos atendimento personalizado e
              resultados impecáveis. Seu carro como novo, sem precisar repintar.
            </p>
            <a
              href="https://wa.me/5561992876054"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-sm bg-gradient-gold px-8 py-3.5 font-display text-sm uppercase tracking-wider text-primary-foreground shadow-gold transition-transform hover:scale-105"
            >
              Fale Conosco
            </a>
          </div>

          <div className="grid gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`flex items-start gap-5 rounded-lg border border-gold/10 bg-card p-6 transition-all duration-600 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gradient-gold">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold uppercase text-foreground">
                    {f.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
