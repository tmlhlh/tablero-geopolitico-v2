import { useState } from 'react';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import ScenarioCard from '@/components/ScenarioCard';

interface Scenario {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cost: string;
  mainTheme: string;
  keyPoints: Array<{ title: string; description: string }>;
  indicators: {
    dollarHegemony: number;
    systemicRisk: string;
    probability: string;
  };
  consequences: string[];
  signals: string[];
}

const scenariosData = {
  scenarios: [
    {
      id: 'blindaje',
      number: '01',
      title: 'EL BLINDAJE',
      subtitle: 'La Fortaleza Occidental',
      description: 'El hegemón no colapsa ni cede el control, sino que responde a la fragmentación replegándose y consolidando un bloque cerrado.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381802769/FDNJGFx97MLuc4QvHGeCrs/scenario-blindaje-8EDaGvwKjTTubJbax8SyHu.webp',
      cost: 'La soberanía',
      mainTheme: 'El sistema financiero (SWIFT) deja de ser un bien público global para convertirse en una herramienta punitiva.',
      keyPoints: [
        {
          title: 'La Armafización',
          description: 'Congelamientos masivos fuerzan a los no-alineados a elegir entre disciplina financiera occidental o la expulsión del sistema.'
        },
        {
          title: 'El Dilema Argentino',
          description: 'La presión por un alineamiento incondicional al bloque SWIFT amenaza directamente la arquitectura de reservas del BCRA.'
        },
        {
          title: 'Project Vault',
          description: 'Iniciativa de seguridad nacional estadounidense con $12.000 millones para mitigar choques de suministro de minerales críticos.'
        }
      ],
      indicators: {
        dollarHegemony: 85.0,
        systemicRisk: 'SISTEMÁTICO',
        probability: '30-35%'
      },
      consequences: [
        'Bloque cerrado comercial controlado por Washington',
        'Neutralidad imposible - alineamiento absoluto requerido',
        'Pérdida de autonomía para países periféricos',
        'Fragmentación de alianzas europeas'
      ],
      signals: [
        'Victoria de candidato aislacionista-agresivo en 2028',
        'Anuncio de acuerdo comercial full OTAN con cláusulas anti-China',
        'Condicionalidad del FMI atada a alineamiento estratégico'
      ]
    },
    {
      id: 'fractura',
      number: '02',
      title: 'LA FRACTURA',
      subtitle: 'Multipolaridad Negociada',
      description: 'La pérdida de hegemonía se resuelve a través de una pluralidad de infraestructuras financieras que coexisten sin lograr hegemonía plena.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381802769/FDNJGFx97MLuc4QvHGeCrs/scenario-fractura-hR3ux9R56QTPRgZ9ys3Lcf.webp',
      cost: 'La incertidumbre',
      mainTheme: 'Emerge un vacío de poder ocupado por potencias medias, como países europeos y no alineados del sur global.',
      keyPoints: [
        {
          title: 'Autonomía Estratégica Europea',
          description: 'Europa profundiza autonomía a través de ReArmar Europa, movilizando 800.000 millones de euros para defensa.'
        },
        {
          title: 'Bimodalidad Financiera',
          description: 'Coexisten SWIFT/Ágora para Occidente y mBridge para BRICS+, comunicándose a través de terceros países.'
        },
        {
          title: 'Oportunidad para Potencias Medias',
          description: 'Argentina y otros actores pueden actuar como árbitros entre bloques, maximizando inversiones de múltiples fuentes.'
        }
      ],
      indicators: {
        dollarHegemony: 56.92,
        systemicRisk: 'FRAGMENTADO',
        probability: '50-60%'
      },
      consequences: [
        'Múltiples infraestructuras financieras coexistiendo',
        'Oportunidades de arbitraje para potencias medias',
        'Necesidad de diplomacia de múltiples infraestructuras',
        'Riesgo de sanciones secundarias'
      ],
      signals: [
        'Negativa de aliados OTAN a participar en operaciones estadounidenses',
        'Inversión europea masiva en defensa independiente',
        'Acuerdos comerciales entre bloques sin exclusividad'
      ]
    },
    {
      id: 'abismo',
      number: '03',
      title: 'EL ABISMO',
      subtitle: 'Colapso Sistémico',
      description: 'Ruptura simultánea de hegemonía, confianza y liquidez, llevando a reconfiguración brusca sin ancla estable.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381802769/FDNJGFx97MLuc4QvHGeCrs/scenario-abismo-KvsSfE8Xvf9YdUq8FFNY5e.webp',
      cost: 'La supervivencia',
      mainTheme: 'Ninguna divisa es capaz de afrontar la posición de moneda fiduciaria internacional, desintegrando el concepto mismo.',
      keyPoints: [
        {
          title: 'Trampa de Kindleberger',
          description: 'Ausencia de liderazgo hegemónico provoca caos global, cierre de economías y carrera de devaluación.'
        },
        {
          title: 'Fuga a Activos Físicos',
          description: 'Estados se vuelcan masivamente a oro y activos físicos para resguardo de valor, buscando soberanía y anonimato.'
        },
        {
          title: 'Riesgo Existencial para Periferias',
          description: 'Recursos sin defensa se convierten en vulnerabilidades - litio, cobre, gas y alimentos son botín de potencias.'
        }
      ],
      indicators: {
        dollarHegemony: 0,
        systemicRisk: 'COLAPSO TOTAL',
        probability: '5-10%'
      },
      consequences: [
        'Desintegración del sistema económico-financiero global',
        'Nacionalización unilateral de activos extranjeros',
        'Intervenciones militares por recursos estratégicos',
        'Desaparición de marcos jurídicos internacionales'
      ],
      signals: [
        'Abandono definitivo de la OMC',
        'Aumento de escaramuzas navales en corredores marítimos críticos',
        'Nacionalización de activos extranjeros en Sur Global',
        'Compras masivas de oro por bancos centrales (863 toneladas en 2025)'
      ]
    },
    {
      id: 'superposicion',
      number: '04',
      title: 'LA SUPERPOSICIÓN',
      subtitle: 'Realidades Coexistentes',
      description: 'Múltiples sistemas financieros y políticos operan simultáneamente sin resolución clara, creando ambigüedad estratégica.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381802769/FDNJGFx97MLuc4QvHGeCrs/scenario-superposicion-KqXhWfDwbvMS3k2rLw52FL.webp',
      cost: 'La claridad',
      mainTheme: 'Estados y actores operan en múltiples realidades simultáneamente, adaptándose dinámicamente a contextos cambiantes.',
      keyPoints: [
        {
          title: 'Ambigüedad Estratégica',
          description: 'Actores mantienen opciones abiertas, evitando compromisos exclusivos con cualquier bloque.'
        },
        {
          title: 'Infraestructuras Superpuestas',
          description: 'SWIFT, mBridge, CIPS y otros sistemas operan en paralelo, con actores seleccionando según conveniencia.'
        },
        {
          title: 'Volatilidad Permanente',
          description: 'Sin ancla clara, los mercados fluctúan según percepciones y eventos, creando oportunidades y riesgos constantes.'
        }
      ],
      indicators: {
        dollarHegemony: 40,
        systemicRisk: 'INDETERMINADO',
        probability: '35-45%'
      },
      consequences: [
        'Incertidumbre permanente en mercados financieros',
        'Necesidad de adaptabilidad constante',
        'Oportunidades para actores ágiles',
        'Riesgo de cascadas de decisiones impredecibles'
      ],
      signals: [
        'Alternancia de políticas según cambios de gobierno',
        'Empresas operando en múltiples sistemas de pago',
        'Volatilidad extrema en mercados de divisas y commodities',
        'Alianzas fluidas y no permanentes'
      ]
    }
  ]
};



export default function Home() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [scenarios] = useState<Scenario[]>(scenariosData.scenarios as Scenario[]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Scenarios Section */}
      <section
        id="scenarios"
        className="relative py-20 md:py-32 px-4 md:px-8 bg-background"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(0deg, transparent 24%, rgba(0, 255, 136, 0.1) 25%, rgba(0, 255, 136, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, 0.1) 75%, rgba(0, 255, 136, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 136, 0.1) 25%, rgba(0, 255, 136, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, 0.1) 75%, rgba(0, 255, 136, 0.1) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">
              Cuatro Futuros Posibles
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Escenarios</span>{' '}
              <span className="text-secondary">Geopolíticos</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Análisis de probabilidades y riesgos sistémicos para la próxima década
            </p>
          </div>

          {/* Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {scenarios.map((scenario, index) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                isActive={activeScenario === scenario.id}
                onClick={() =>
                  setActiveScenario(
                    activeScenario === scenario.id ? null : scenario.id
                  )
                }
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">El Contexto</span>
            </h3>
            <p className="text-foreground/70">
              Fundamentos del análisis geopolítico contemporáneo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div className="neon-border p-6 rounded-lg">
                <h4 className="text-primary font-bold uppercase tracking-wider mb-3">
                  De Yeda al Pos-Dólar
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  El pacto del petrodólar establecido en 1974 en Yeda ha sido el
                  fundamento del orden financiero global durante cinco décadas. Hoy,
                  ese orden cruje bajo presiones geopolíticas, financieras y
                  energéticas sin precedentes.
                </p>
              </div>

              <div className="neon-border-cyan p-6 rounded-lg">
                <h4 className="text-secondary font-bold uppercase tracking-wider mb-3">
                  Fragmentación Financiera
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  La emergencia de sistemas paralelos como mBridge, CIPS y Ágora
                  desafía el monopolio de SWIFT. La visibilidad financiera se
                  fragmenta, y con ella, la capacidad de coerción del hegemón.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div className="neon-border-magenta p-6 rounded-lg">
                <h4 className="text-accent font-bold uppercase tracking-wider mb-3">
                  Transición Energética
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  La transición hacia energías renovables reconfigura la matriz
                  geopolítica. Minerales críticos como litio, cobre y cobalto
                  reemplazan al petróleo como activos estratégicos de poder.
                </p>
              </div>

              <div className="neon-border p-6 rounded-lg">
                <h4 className="text-primary font-bold uppercase tracking-wider mb-3">
                  Multipolaridad Emergente
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Potencias medias como Europa, India y el Sur Global ganan
                  relevancia. La capacidad de arbitraje entre bloques se convierte
                  en un activo estratégico fundamental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 md:px-8 bg-background/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                Sobre Este Análisis
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Prospectiva estratégica basada en análisis de tendencias
                geopolíticas, financieras y energéticas contemporáneas.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-3">
                Metodología
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Escenarios construidos mediante análisis de drivers sistémicos,
                probabilidades relativas y señales de alerta tempranas.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-3">
                Descargo de Responsabilidad
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Este análisis es prospectivo, no predictivo. Los escenarios
                presentan posibilidades, no certezas.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © 2026 Tablero Geopolítico. Análisis de Prospectiva Estratégica.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
