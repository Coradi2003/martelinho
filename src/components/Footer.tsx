const Footer = () => {
  return (
    <footer className="border-t border-gold/10 bg-background py-8">
      <div className="container text-center">
        <p className="font-display text-sm uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Vleydson — Martelinho de Ouro. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
