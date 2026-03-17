import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AnalysisPanel from './AnalysisPanel';
import { geopoliticalZones, zoneColors } from '@/data/geopolitical-zones';

interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  color: string;
}

interface ScenarioMapProps {
  scenarioId: string;
  scenarioTitle: string;
  accentColor: string;
}

export default function ScenarioMap({
  scenarioId,
  scenarioTitle,
  accentColor,
}: ScenarioMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [layers, setLayers] = useState<MapLayer[]>([]);
  const geoJsonLayers = useRef<L.GeoJSON[]>([]);

  // Definir capas por escenario
  const scenarioLayers: Record<string, MapLayer[]> = {
    blindaje: [
      {
        id: 'swift-network',
        name: 'Red SWIFT (Occidental)',
        visible: true,
        color: '#00ff88',
      },
      {
        id: 'nato-alliance',
        name: 'Alianza OTAN',
        visible: true,
        color: '#00d4ff',
      },
      {
        id: 'us-bases',
        name: 'Bases Militares USA',
        visible: true,
        color: '#ff006e',
      },
      {
        id: 'critical-minerals',
        name: 'Minerales Críticos',
        visible: false,
        color: '#ffaa00',
      },
    ],
    fractura: [
      {
        id: 'swift-network',
        name: 'Red SWIFT',
        visible: true,
        color: '#00ff88',
      },
      {
        id: 'mbridge-network',
        name: 'Red mBridge (BRICS+)',
        visible: true,
        color: '#00d4ff',
      },
      {
        id: 'europe-autonomy',
        name: 'Autonomía Europea',
        visible: true,
        color: '#ff006e',
      },
      {
        id: 'trade-routes',
        name: 'Rutas Comerciales',
        visible: false,
        color: '#ffaa00',
      },
    ],
    abismo: [
      {
        id: 'conflict-zones',
        name: 'Zonas de Conflicto',
        visible: true,
        color: '#ff006e',
      },
      {
        id: 'resource-hotspots',
        name: 'Puntos de Recursos',
        visible: true,
        color: '#ffaa00',
      },
      {
        id: 'naval-chokepoints',
        name: 'Puntos de Estrangulamiento',
        visible: true,
        color: '#00ff88',
      },
      {
        id: 'collapsed-infrastructure',
        name: 'Infraestructura Colapsada',
        visible: false,
        color: '#ff0000',
      },
    ],
    superposicion: [
      {
        id: 'multiple-systems',
        name: 'Sistemas Superpuestos',
        visible: true,
        color: '#00ff88',
      },
      {
        id: 'ambiguous-zones',
        name: 'Zonas Ambiguas',
        visible: true,
        color: '#00d4ff',
      },
      {
        id: 'fluid-alliances',
        name: 'Alianzas Fluidas',
        visible: true,
        color: '#ff006e',
      },
      {
        id: 'volatility-index',
        name: 'Índice de Volatilidad',
        visible: false,
        color: '#ffaa00',
      },
    ],
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Inicializar mapa
    if (!map.current) {
      map.current = L.map(mapContainer.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
        attributionControl: true,
      });

      // Agregar CartoDB Dark Matter
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        }
      ).addTo(map.current);

      // Agregar polígonos GeoJSON
      addGeopoliticalZones(scenarioId);

      // Agregar marcadores de ejemplo según el escenario
      addScenarioMarkers(scenarioId);
    }

    // Cargar capas del escenario
    const scenarioLayersList = scenarioLayers[scenarioId] || [];
    setLayers(scenarioLayersList);

    return () => {
      // Cleanup si es necesario
    };
  }, [scenarioId]);

  const addGeopoliticalZones = (scenario: string) => {
    if (!map.current) return;

    const zones = geopoliticalZones[scenario as keyof typeof geopoliticalZones];
    const colors = zoneColors[scenario as keyof typeof zoneColors];

    if (!zones) return;

    // Limpiar capas anteriores
    geoJsonLayers.current.forEach((layer) => map.current?.removeLayer(layer));
    geoJsonLayers.current = [];

    const geoJsonLayer = L.geoJSON(zones as any, {
      style: (feature) => {
        const featureType = feature?.properties?.type;
        const color = colors[featureType as keyof typeof colors] || '#00ff88';
        return {
          color: color,
          weight: 2,
          opacity: 0.6,
          fillColor: color,
          fillOpacity: 0.1,
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties;
        const popup = `<div style="color: #e0e0e0; font-family: monospace; font-size: 0.75rem;">
          <strong>${props.name}</strong><br/>
          ${props.description}
        </div>`;
        layer.bindPopup(popup);
      },
    }).addTo(map.current);

    geoJsonLayers.current.push(geoJsonLayer);
  };

  const addScenarioMarkers = (scenario: string) => {
    if (!map.current) return;

    const markers: Record<string, Array<[number, number, string, string]>> = {
      blindaje: [
        [40.7128, -74.006, 'Nueva York', 'Centro Financiero'],
        [51.5074, -0.1278, 'Londres', 'Alianza OTAN'],
        [48.8566, 2.3522, 'París', 'Alianza OTAN'],
        [35.6762, 139.6503, 'Tokio', 'Aliado Estratégico'],
      ],
      fractura: [
        [40.7128, -74.006, 'Nueva York', 'SWIFT'],
        [39.9042, 116.4074, 'Beijing', 'mBridge'],
        [51.5074, -0.1278, 'Londres', 'Autonomía Europea'],
        [55.7558, 37.6173, 'Moscú', 'Sistema Alternativo'],
      ],
      abismo: [
        [26.0667, 50.5577, 'Golfo Pérsico', 'Conflicto Activo'],
        [-33.8688, 151.2093, 'Sídney', 'Recursos Críticos'],
        [1.3521, 103.8198, 'Singapur', 'Chokepoint'],
        [35.6762, 139.6503, 'Tokio', 'Zona de Tensión'],
      ],
      superposicion: [
        [20, 0, 'Centro Global', 'Ambigüedad Estratégica'],
        [40.7128, -74.006, 'Nueva York', 'Sistema Múltiple'],
        [39.9042, 116.4074, 'Beijing', 'Sistema Múltiple'],
        [51.5074, -0.1278, 'Londres', 'Sistema Múltiple'],
      ],
    };

    const scenarioMarkers = markers[scenario] || [];
    scenarioMarkers.forEach(([lat, lng, title, description]) => {
      const marker = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: accentColor,
        color: accentColor,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7,
      })
        .addTo(map.current!)
        .bindPopup(`<div style="color: #e0e0e0; font-family: monospace;">
          <strong>${title}</strong><br/>
          ${description}
        </div>`);
    });
  };

  const toggleLayer = (layerId: string) => {
    setLayers(
      layers.map((layer) =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Panel Izquierdo - Capas */}
      <div className="w-64 bg-card border-r border-border overflow-y-auto">
        <div className="p-4 border-b border-border sticky top-0 bg-card/95 backdrop-blur">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
            Capas
          </h3>
          <p className="text-xs text-muted-foreground">{scenarioTitle}</p>
        </div>

        <div className="p-4 space-y-3">
          {layers.map((layer) => (
            <label
              key={layer.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={layer.visible}
                onChange={() => toggleLayer(layer.id)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-xs font-mono uppercase tracking-wider group-hover:text-primary transition-colors">
                  {layer.name}
                </p>
                <div
                  className="h-1 mt-1 rounded"
                  style={{
                    backgroundColor: layer.color,
                    opacity: layer.visible ? 1 : 0.3,
                  }}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Mapa Central */}
      <div className="flex-1 flex flex-col">
        <div
          ref={mapContainer}
          className="flex-1"
          style={{ minHeight: '100%' }}
        />
      </div>

      {/* Panel Derecho - Análisis Completo */}
      <div className="w-96 bg-card border-l border-border">
        <div className="p-4 border-b border-border sticky top-0 bg-card/95 backdrop-blur z-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
            Análisis del Escenario
          </h3>
        </div>

        <AnalysisPanel scenarioId={scenarioId} accentColor={accentColor} />
      </div>
    </div>
  );
}
