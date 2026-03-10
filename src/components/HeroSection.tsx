import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="container relative z-10 pt-20">
        <div className="max-w-2xl">
          <div
            className="mb-4 inline-block rounded-sm border border-gold/30 px-4 py-1.5 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-primary">
              Ceilândia Norte • DF
            </span>
          </div>

          <h1
            className="mb-6 font-display text-5xl font-bold uppercase leading-tight tracking-tight opacity-0 animate-fade-up md:text-7xl"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-gradient-gold">Martelinho</span>
            <br />
            <span className="text-foreground">de Ouro</span>
          </h1>

          <p
            className="mb-8 max-w-md font-body text-lg leading-relaxed text-foreground/70 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            Recupere a lataria do seu veículo sem perder a pintura original.
            Profissional experiente com peças e serviços com garantia.
          </p>

          <div
            className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            <a
              href="https://wa.me/5561992876054?text=Olá! Gostaria de solicitar um orçamento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-gradient-gold px-8 py-3.5 font-display text-sm uppercase tracking-wider text-primary-foreground shadow-gold transition-transform hover:scale-105"
            >
              Solicitar Orçamento
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 rounded-sm border border-gold/30 px-8 py-3.5 font-display text-sm uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Nossos Serviços
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default HeroSection;
