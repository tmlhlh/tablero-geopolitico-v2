import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';

interface Indicator {
  title: string;
  description: string;
}

interface ScenarioData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cost: string;
  mainTheme: string;
  keyPoints: Indicator[];
  indicators: {
    dollarHegemony: number;
    systemicRisk: string;
    probability: string;
  };
  consequences: string[];
  signals: string[];
}

interface ScenarioCardProps {
  scenario: ScenarioData;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export default function ScenarioCard({
  scenario,
  isActive,
  onClick,
  index,
}: ScenarioCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const borderColor =
    index === 0
      ? 'neon-border'
      : index === 1
        ? 'neon-border-cyan'
        : index === 2
          ? 'neon-border-magenta'
          : 'neon-border';

  const accentColor =
    index === 0
      ? '#00ff88'
      : index === 1
        ? '#00d4ff'
        : index === 2
          ? '#ff006e'
          : '#00ff88';

  return (
    <div
      className={`transition-all duration-500 cursor-pointer ${
        isActive ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      onClick={() => {
        onClick();
        setIsExpanded(!isExpanded);
      }}
    >
      <div
        className={`relative h-full overflow-hidden bg-card rounded-lg ${borderColor} transition-all duration-500 hover:shadow-lg`}
        style={{
          boxShadow: isActive
            ? `0 0 30px ${accentColor}40, inset 0 0 20px ${accentColor}20`
            : undefined,
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${scenario.image})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-card via-card/80 to-background" />

        {/* Content */}
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="mb-4">
              <p
                className="text-xs font-mono uppercase tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                {scenario.number}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {scenario.title}
              </h3>
              <p className="text-sm text-muted-foreground font-mono">
                {scenario.subtitle}
              </p>
            </div>

            {/* Cost Badge */}
            <div className="inline-block mb-4">
              <div
                className="px-3 py-1 border border-current rounded text-xs font-mono uppercase tracking-wider"
                style={{ color: accentColor }}
              >
                Costo: {scenario.cost}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              {scenario.description}
            </p>

            {/* Main Theme */}
            <p className="text-xs text-muted-foreground italic mb-6 border-l-2 border-current pl-3">
              "{scenario.mainTheme}"
            </p>
          </div>

          {/* Indicators */}
          <div className="space-y-3 mb-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Hegemonía Dólar
                </span>
                <span
                  className="text-sm font-bold data-text"
                  style={{ color: accentColor }}
                >
                  {scenario.indicators.dollarHegemony.toFixed(1)}%
                </span>
              </div>
              <div className="h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${scenario.indicators.dollarHegemony}%`,
                    backgroundColor: accentColor,
                    boxShadow: `0 0 10px ${accentColor}`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Riesgo Sistémico
              </span>
              <span
                className="text-xs font-bold data-text"
                style={{ color: accentColor }}
              >
                {scenario.indicators.systemicRisk}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Probabilidad
              </span>
              <span
                className="text-xs font-bold data-text"
                style={{ color: accentColor }}
              >
                {scenario.indicators.probability}
              </span>
            </div>
          </div>

          {/* Expand Button + Map Link */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 hover:gap-3 flex-1"
              style={{ color: accentColor }}
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? 'Ocultar Detalles' : 'Ver Detalles'}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            <Link
              href={`/scenario/${scenario.id}`}
              className="text-xs font-mono uppercase tracking-wider px-3 py-2 border border-current rounded hover:bg-current hover:text-background transition-all"
              style={{ color: accentColor }}
              onClick={(e) => e.stopPropagation()}
            >
              Mapa
            </Link>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 p-6 bg-card rounded-lg neon-border">
          <div className="space-y-6">
            {/* Key Points */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">
                Puntos Clave
              </h4>
              <div className="space-y-3">
                {scenario.keyPoints.map((point, idx) => (
                  <div key={idx} className="border-l-2 border-secondary pl-4">
                    <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-1">
                      {point.title}
                    </p>
                    <p className="text-sm text-foreground/80">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Consequences */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent">
                Consecuencias
              </h4>
              <ul className="space-y-2">
                {scenario.consequences.map((consequence, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-foreground/80">
                    <span className="text-accent">▸</span>
                    {consequence}
                  </li>
                ))}
              </ul>
            </div>

            {/* Signals */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">
                Señales de Alerta
              </h4>
              <ul className="space-y-2">
                {scenario.signals.map((signal, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-foreground/80">
                    <span className="text-primary">◆</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
