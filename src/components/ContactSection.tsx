import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Instagram } from "lucide-react";

const ContactSection = () => {
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
    <section id="contato" ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="container relative z-10">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block font-body text-xs uppercase tracking-[0.3em] text-primary">
            Onde estamos
          </span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            <span className="text-gradient-gold">Localização</span> & Contato
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Info */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-start gap-4 rounded-lg border border-gold/10 bg-card p-6">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold uppercase text-foreground">
                  Endereço
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  QNO 16, Conjunto 47, Casa 10
                  <br />
                  Expansão do Setor O — Ceilândia Norte
                  <br />
                  Brasília — DF, CEP 72260-647
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-gold/10 bg-card p-6">
              <Phone className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold uppercase text-foreground">
                  WhatsApp
                </h3>
                <a
                  href="https://wa.me/5561992876054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-lg text-primary transition-colors hover:text-gold-light"
                >
                  (61) 99287-6054
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-gold/10 bg-card p-6">
              <Instagram className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold uppercase text-foreground">
                  Instagram
                </h3>
                <a
                  href="https://instagram.com/silvavleydson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-primary transition-colors hover:text-gold-light"
                >
                  @silvavleydson
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div
            className={`overflow-hidden rounded-lg border border-gold/10 transition-all duration-700 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <iframe
              title="Localização Vleydson Martelinho de Ouro"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.5!2d-48.11!3d-15.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ3JzI0LjAiUyA0OMKwMDYnMzYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr&q=QNO+16+Conjunto+47+Ceilandia+Norte+DF"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
