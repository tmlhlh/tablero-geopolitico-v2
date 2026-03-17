interface RiskIndicatorProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
}

export default function RiskIndicator({
  label,
  value,
  max = 100,
  color = '#00ff88',
  showLabel = true,
}: RiskIndicatorProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <span
            className="text-sm font-bold data-text"
            style={{ color }}
          >
            {value.toFixed(1)}%
          </span>
        </div>
      )}
      <div className="h-2 bg-border rounded-full overflow-hidden relative">
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: color,
            opacity: 0.1,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
        {/* Progress bar */}
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}, inset 0 0 5px ${color}`,
          }}
        />
      </div>
    </div>
  );
}
