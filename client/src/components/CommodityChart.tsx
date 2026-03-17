import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CommodityChartProps {
  name: string;
  data: number[];
  color: string;
  unit: string;
}

export default function CommodityChart({
  name,
  data,
  color,
  unit,
}: CommodityChartProps) {
  // Convertir array de números a formato de Recharts
  const chartData = data.map((value, index) => ({
    period: `T${index + 1}`,
    value: value,
  }));

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0, 255, 136, 0.1)"
          />
          <XAxis
            dataKey="period"
            stroke="rgba(224, 224, 224, 0.5)"
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis
            stroke="rgba(224, 224, 224, 0.5)"
            style={{ fontSize: '0.75rem' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20, 20, 40, 0.9)',
              border: `1px solid ${color}`,
              borderRadius: '0.5rem',
              boxShadow: `0 0 10px ${color}40`,
            }}
            labelStyle={{ color: color }}
            formatter={(value) => {
              const numValue = typeof value === 'number' ? value : parseFloat(value as string);
              return [`${numValue.toFixed(2)} ${unit}`, name];
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            dot={{ fill: color, r: 3 }}
            activeDot={{ r: 5 }}
            strokeWidth={2}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
