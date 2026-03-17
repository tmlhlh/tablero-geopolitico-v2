import { useRoute } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import ScenarioMap from '@/components/ScenarioMap';

export default function ScenarioDetail() {
  const [, params] = useRoute('/scenario/:id');
  const scenarioId = params?.id;

  const scenarios: Record<string, any> = {
    blindaje: {
      number: '01',
      title: 'EL BLINDAJE',
      subtitle: 'La Fortaleza Occidental',
      description: 'El hegemón no colapsa ni cede el control, sino que responde a la fragmentación replegándose y consolidando un bloque cerrado.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381802769/FDNJGFx97MLuc4QvHGeCrs/scenario-blindaje-8EDaGvwKjTTubJbax8SyHu.webp',
      cost: 'La soberanía',
      color: '#00ff88',
    },
    fractura: {
      number: '02',
      title: 'LA FRACTURA',
      subtitle: 'Multipolaridad Negociada',
      description: 'La pérdida de hegemonía se resuelve a través de una pluralidad de infraestructuras financieras que coexisten sin lograr hegemonía plena.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381802769/FDNJGFx97MLuc4QvHGeCrs/scenario-fractura-hR3ux9R56QTPRgZ9ys3Lcf.webp',
      cost: 'La incertidumbre',
      color: '#00d4ff',
    },
    abismo: {
      number: '03',
      title: 'EL ABISMO',
      subtitle: 'Colapso Sistémico',
      description: 'Ruptura simultánea de hegemonía, confianza y liquidez, llevando a reconfiguración brusca sin ancla estable.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381802769/FDNJGFx97MLuc4QvHGeCrs/scenario-abismo-KvsSfE8Xvf9YdUq8FFNY5e.webp',
      cost: 'La supervivencia',
      color: '#ff006e',
    },
    superposicion: {
      number: '04',
      title: 'LA SUPERPOSICIÓN',
      subtitle: 'Realidades Coexistentes',
      description: 'Múltiples sistemas financieros y políticos operan simultáneamente sin resolución clara, creando ambigüedad estratégica.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381802769/FDNJGFx97MLuc4QvHGeCrs/scenario-superposicion-KqXhWfDwbvMS3k2rLw52FL.webp',
      cost: 'La claridad',
      color: '#00ff88',
    },
  };

  const scenario = scenarioId ? scenarios[scenarioId] : null;

  if (!scenario) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Escenario no encontrado</h1>
          <a href="/" className="text-primary hover:underline">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Mapa Interactivo - Elemento Central */}
      <div className="flex-1 mt-16">
        <ScenarioMap
          scenarioId={scenarioId || 'blindaje'}
          scenarioTitle={scenario.title}
          accentColor={scenario.color}
        />
      </div>

      {/* Información Flotante - Esquina Inferior Izquierda */}
      <div className="fixed bottom-6 left-6 z-40 max-w-xs">
        <div
          className="p-4 rounded-lg border-2 backdrop-blur-md bg-background/80"
          style={{
            borderColor: scenario.color,
            boxShadow: `0 0 20px ${scenario.color}40`,
          }}
        >
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: scenario.color }}
          >
            {scenario.number} • {scenario.subtitle}
          </p>
          <h3 className="text-lg font-bold mb-2">{scenario.title}</h3>
          <p className="text-xs text-foreground/70 leading-relaxed">
            {scenario.description}
          </p>
        </div>
      </div>

      {/* Botón de Retorno - Esquina Superior Izquierda */}
      <div className="fixed top-24 left-6 z-40">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg border border-primary hover:bg-primary/10"
        >
          <ArrowLeft size={14} />
          Volver
        </a>
      </div>
    </div>
  );
}
