import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import CommodityChart from './CommodityChart';
import EventTimeline from './EventTimeline';
import { commodityData, volatilityIndex } from '@/data/commodity-data';

interface AnalysisPanelProps {
  scenarioId: string;
  accentColor: string;
}

export default function AnalysisPanel({
  scenarioId,
  accentColor,
}: AnalysisPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string>('volatility');

  const scenario = scenarioId as keyof typeof commodityData;
  const commodities = commodityData[scenario];
  const volatility = volatilityIndex[scenario as keyof typeof volatilityIndex];

  const getVolatilityColor = (value: number) => {
    if (value < 30) return '#00ff88';
    if (value < 60) return '#ffaa00';
    return '#ff006e';
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  return (
    <div className="h-full bg-background z-40 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 px-4 pt-4">
      {/* Índice de Volatilidad */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('volatility')}
          className="w-full p-4 flex items-center justify-between hover:bg-background/50 transition-colors"
        >
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
              Índice de Volatilidad
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {volatility.description}
            </p>
          </div>
          <ChevronDown
            size={16}
            className={`flex-shrink-0 transition-transform duration-300 ${
              expandedSection === 'volatility' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedSection === 'volatility' && (
          <div className="p-4 border-t border-border space-y-4 bg-background/50">
            {/* Volatilidad General */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Volatilidad General
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: getVolatilityColor(volatility.overall) }}
                >
                  {volatility.overall}%
                </span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${volatility.overall}%`,
                    backgroundColor: getVolatilityColor(volatility.overall),
                    boxShadow: `0 0 10px ${getVolatilityColor(volatility.overall)}`,
                  }}
                />
              </div>
            </div>

            {/* Desglose por categoría */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Financiera', value: volatility.financial },
                { label: 'Energética', value: volatility.energy },
                { label: 'Minerales', value: volatility.minerals },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: getVolatilityColor(item.value) }}
                    >
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: getVolatilityColor(item.value),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Commodities */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('commodities')}
          className="w-full p-4 flex items-center justify-between hover:bg-background/50 transition-colors"
        >
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
              Precios de Commodities
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Tendencias de mercado por escenario
            </p>
          </div>
          <ChevronDown
            size={16}
            className={`flex-shrink-0 transition-transform duration-300 ${
              expandedSection === 'commodities' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedSection === 'commodities' && (
          <div className="p-4 border-t border-border space-y-6 bg-background/50">
            {Object.entries(commodities).map(([key, commodity]) => (
              <div key={key}>
                <div className="mb-3">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {commodity.name}
                      </p>
                      <p className="text-xs text-foreground/70 mt-1">
                        {commodity.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: accentColor }}>
                        {commodity.current.toFixed(2)}
                      </p>
                      <p
                        className="text-xs font-mono"
                        style={{
                          color: commodity.change >= 0 ? '#00ff88' : '#ff006e',
                        }}
                      >
                        {commodity.change >= 0 ? '+' : ''}
                        {commodity.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
                <CommodityChart
                  name={commodity.name}
                  data={commodity.trend}
                  color={accentColor}
                  unit={commodity.unit}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline de Eventos */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('timeline')}
          className="w-full p-4 flex items-center justify-between hover:bg-background/50 transition-colors"
        >
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
              Señales de Alerta
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Hitos críticos del escenario
            </p>
          </div>
          <ChevronDown
            size={16}
            className={`flex-shrink-0 transition-transform duration-300 ${
              expandedSection === 'timeline' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedSection === 'timeline' && (
          <div className="p-4 border-t border-border bg-background/50">
            <EventTimeline scenarioId={scenarioId} />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
