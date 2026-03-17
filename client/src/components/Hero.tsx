import { useEffect, useState } from 'react';

interface HeroProps {
  onReady?: () => void;
}

export default function Hero({ onReady }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    onReady?.();
  }, [onReady]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663381802769/FDNJGFx97MLuc4QvHGeCrs/hero-geopolitical-map-4eNZQuVcDYCHZ7fZumCV5z.webp)',
          opacity: 0.4,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 scan-effect pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 z-10">
        {/* Top Label */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase">
            Prospectiva Estratégica
          </p>
        </div>

        {/* Main Title */}
        <div
          className={`text-center mb-6 transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 neon-text">
            <span className="text-primary">TABLERO</span>
            <br />
            <span className="text-secondary">GEOPOLÍTICO</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className={`text-center mb-12 max-w-2xl transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <p className="text-lg md:text-xl text-foreground/80 font-mono">
            Simulador de Riesgo: El Orden Pos-Yeda
          </p>
          <p className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed">
            Análisis prospectivo de escenarios geopolíticos para la próxima década
            basado en la fragmentación del sistema financiero internacional
          </p>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <button
            onClick={() => {
              const scenariosSection = document.getElementById('scenarios');
              scenariosSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 border-2 border-primary text-primary font-mono font-bold uppercase text-sm tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300 neon-border"
          >
            Explorar Escenarios
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Desplaza
            </span>
            <svg
              className="w-5 h-5 text-primary animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
