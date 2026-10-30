import { formatPercentWhole } from '../formatting/formatters'

export function ConfidenceBar({ confidence }: { confidence: number }) {
  return (
    <div
      role="meter"
      aria-label="Confidence"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(confidence * 100)}
      aria-valuetext={formatPercentWhole(confidence)}
      className="mb-2.5 mt-1.5 h-1.5 overflow-hidden rounded-[3px] bg-bg"
    >
      <div className="h-full bg-accent" style={{ width: formatPercentWhole(confidence) }} />
    </div>
  )
}
