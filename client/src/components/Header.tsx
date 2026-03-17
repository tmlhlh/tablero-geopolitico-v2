import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">TG</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-mono uppercase tracking-widest text-primary">
              Tablero
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-secondary">
              Geopolítico
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => {
              const scenariosSection = document.getElementById('scenarios');
              scenariosSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm font-mono uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
          >
            Escenarios
          </button>
          <button
            onClick={() => {
              const contextSection = document.querySelector('section:nth-of-type(2)');
              contextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm font-mono uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
          >
            Contexto
          </button>
          <a
            href="#"
            className="text-sm font-mono uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
          >
            Análisis
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-primary hover:bg-card rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => {
                const scenariosSection = document.getElementById('scenarios');
                scenariosSection?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-mono uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors text-left"
            >
              Escenarios
            </button>
            <button
              onClick={() => {
                const contextSection = document.querySelector('section:nth-of-type(2)');
                contextSection?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-mono uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors text-left"
            >
              Contexto
            </button>
            <a
              href="#"
              className="text-sm font-mono uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
            >
              Análisis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
