import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { timelineEvents, severityColors, eventTypeColors } from '@/data/timeline-events';

interface EventTimelineProps {
  scenarioId: string;
}

export default function EventTimeline({ scenarioId }: EventTimelineProps) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const events = timelineEvents[scenarioId as keyof typeof timelineEvents] || [];

  return (
    <div className="w-full space-y-4">
      <div className="border-b border-border pb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-secondary mb-2">
          Timeline de Eventos
        </h3>
        <p className="text-xs text-muted-foreground">
          Señales de alerta y hitos críticos del escenario
        </p>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => {
          const isExpanded = expandedEvent === event.id;
          const severityColor =
            severityColors[event.severity as keyof typeof severityColors];
          const typeColor =
            eventTypeColors[event.type as keyof typeof eventTypeColors];

          return (
            <div key={event.id} className="relative">
              {/* Línea conectora */}
              {index < events.length - 1 && (
                <div
                  className="absolute left-3 top-10 w-0.5 h-8"
                  style={{ backgroundColor: severityColor, opacity: 0.3 }}
                />
              )}

              {/* Evento */}
              <button
                onClick={() =>
                  setExpandedEvent(isExpanded ? null : event.id)
                }
                className="w-full text-left transition-all duration-300"
              >
                <div
                  className="p-3 rounded-lg border border-current transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: severityColor,
                    backgroundColor: `${severityColor}08`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Punto de timeline */}
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: severityColor }}
                    />

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p
                            className="text-xs font-mono uppercase tracking-wider"
                            style={{ color: severityColor }}
                          >
                            {event.date}
                          </p>
                          <h4 className="text-sm font-bold text-foreground">
                            {event.title}
                          </h4>
                        </div>
                        <ChevronDown
                          size={14}
                          className={`flex-shrink-0 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          style={{ color: severityColor }}
                        />
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded border"
                          style={{
                            color: severityColor,
                            borderColor: severityColor,
                          }}
                        >
                          {event.severity}
                        </span>
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded border"
                          style={{
                            color: typeColor,
                            borderColor: typeColor,
                          }}
                        >
                          {event.type}
                        </span>
                      </div>

                      {/* Descripción expandida */}
                      {isExpanded && (
                        <p className="text-xs text-foreground/70 leading-relaxed mt-2 animate-in fade-in duration-300">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="mt-6 pt-4 border-t border-border space-y-2">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
          Severidad
        </p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(severityColors).map(([severity, color]) => (
            <div key={severity} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-muted-foreground capitalize">
                {severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
