// Zonas geopolíticas por escenario - GeoJSON
export const geopoliticalZones = {
  blindaje: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Bloque Occidental (SWIFT)',
          type: 'alliance',
          description: 'Alianza OTAN + Aliados económicos',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-125, 70],
              [-50, 70],
              [-50, 25],
              [-125, 25],
              [-125, 70],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Europa Occidental',
          type: 'core',
          description: 'Centro de poder occidental',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-10, 70],
              [40, 70],
              [40, 35],
              [-10, 35],
              [-10, 70],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Zona de Exclusión',
          type: 'exclusion',
          description: 'Países no alineados',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [40, 70],
              [180, 70],
              [180, -60],
              [40, -60],
              [40, 70],
            ],
          ],
        },
      },
    ],
  },
  fractura: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Bloque Occidental (SWIFT)',
          type: 'alliance',
          description: 'Occidente + Aliados',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-125, 70],
              [-50, 70],
              [-50, 25],
              [-125, 25],
              [-125, 70],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Bloque BRICS+ (mBridge)',
          type: 'alliance',
          description: 'China, Rusia, India, Brasil',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [40, 70],
              [180, 70],
              [180, -60],
              [40, -60],
              [40, 70],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Zona de Arbitraje',
          type: 'neutral',
          description: 'Potencias medias - Actores flexibles',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-50, 35],
              [40, 35],
              [40, -60],
              [-50, -60],
              [-50, 35],
            ],
          ],
        },
      },
    ],
  },
  abismo: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Zona de Conflicto Activo',
          type: 'conflict',
          description: 'Golfo Pérsico, Mar de China',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [30, 50],
              [150, 50],
              [150, -10],
              [30, -10],
              [30, 50],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Puntos de Recursos Críticos',
          type: 'resources',
          description: 'Litio, cobre, cobalto',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-80, 0],
              [-50, 0],
              [-50, -60],
              [-80, -60],
              [-80, 0],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Zona de Colapso Infraestructura',
          type: 'collapse',
          description: 'Sistemas financieros desintegrados',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-125, 70],
              [180, 70],
              [180, -60],
              [-125, -60],
              [-125, 70],
            ],
          ],
        },
      },
    ],
  },
  superposicion: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Sistema SWIFT (Superpuesto)',
          type: 'system',
          description: 'Infraestructura occidental',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-125, 70],
              [-50, 70],
              [-50, 25],
              [-125, 25],
              [-125, 70],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Sistema mBridge (Superpuesto)',
          type: 'system',
          description: 'Infraestructura BRICS+',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [40, 70],
              [180, 70],
              [180, -60],
              [40, -60],
              [40, 70],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Zonas de Ambigüedad',
          type: 'ambiguous',
          description: 'Múltiples realidades simultáneas',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-50, 35],
              [40, 35],
              [40, -60],
              [-50, -60],
              [-50, 35],
            ],
          ],
        },
      },
    ],
  },
};

// Colores por tipo de zona
export const zoneColors = {
  blindaje: {
    alliance: '#00ff88',
    core: '#00d4ff',
    exclusion: '#ff006e',
  },
  fractura: {
    alliance: '#00ff88',
    neutral: '#ffaa00',
  },
  abismo: {
    conflict: '#ff006e',
    resources: '#ffaa00',
    collapse: '#ff0000',
  },
  superposicion: {
    system: '#00ff88',
    ambiguous: '#00d4ff',
  },
};
