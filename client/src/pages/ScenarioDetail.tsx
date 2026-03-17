import { useRoute } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';

interface ScenarioDetailProps {
  scenarioId: string;
}

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
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <div
        className="relative w-full h-96 overflow-hidden mt-16"
        style={{
          backgroundImage: `url(${scenario.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />

        <div className="relative h-full flex flex-col items-center justify-center px-4 z-10">
          <p
            className="text-sm font-mono uppercase tracking-widest mb-4"
            style={{ color: scenario.color }}
          >
            {scenario.number}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            {scenario.title}
          </h1>
          <p className="text-xl text-foreground/80 font-mono">{scenario.subtitle}</p>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-8 font-mono text-sm uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            Volver a Escenarios
          </a>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Main Description */}
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Descripción General</h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Análisis Detallado</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Este escenario representa una de las trayectorias posibles del orden
                  geopolítico global en la próxima década. Su probabilidad y consecuencias
                  dependen de múltiples factores sistémicos, decisiones políticas y eventos
                  contingentes que aún no se han materializado.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div
                className="p-6 rounded-lg border-2 mb-6"
                style={{
                  borderColor: scenario.color,
                  boxShadow: `0 0 20px ${scenario.color}40`,
                }}
              >
                <h3 className="text-sm font-mono uppercase tracking-wider mb-4">
                  Costo Estratégico
                </h3>
                <p
                  className="text-2xl font-bold"
                  style={{ color: scenario.color }}
                >
                  {scenario.cost}
                </p>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="text-sm font-mono uppercase tracking-wider mb-4">
                  Información
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Escenario</p>
                    <p className="font-bold">{scenario.number}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Tipo</p>
                    <p className="font-bold">{scenario.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12 border-t border-border">
            <p className="text-foreground/70 mb-6">
              Explora los otros escenarios para una visión completa del panorama
              geopolítico
            </p>
            <a
              href="/#scenarios"
              className="inline-block px-8 py-3 border-2 border-primary text-primary font-mono font-bold uppercase text-sm tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              style={{
                boxShadow: `0 0 10px ${scenario.color}`,
              }}
            >
              Ver Todos los Escenarios
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
