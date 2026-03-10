import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-gold/20 bg-background/90 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logo} alt="Vleydson Martelinho de Ouro" className="h-12 w-auto" />
        </a>

        {/* Desktop */}
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-sm uppercase tracking-widest text-foreground/70 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/5561992876054"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-sm bg-gradient-gold px-6 py-2.5 font-display text-sm uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 md:inline-block"
        >
          Orçamento Grátis
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="text-foreground md:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gold/10 bg-background/95 backdrop-blur-md md:hidden">
          <ul className="container flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-lg uppercase tracking-widest text-foreground/80 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://wa.me/5561992876054"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block rounded-sm bg-gradient-gold px-6 py-2.5 font-display text-sm uppercase tracking-wider text-primary-foreground"
              >
                Orçamento Grátis
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
