import type { Direction } from '../../data-contracts/models'
import { formatPercentWhole } from '../formatting/formatters'

interface DirectionBadgeProps {
  direction: Direction
  confidence: number
}

export function DirectionBadge({ direction, confidence }: DirectionBadgeProps) {
  const isBullish = direction === 'bullish'
  const tone = isBullish ? 'bg-up/20 text-up' : 'bg-down/20 text-down'
  return (
    <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${tone}`}>
      {isBullish ? '▲ Bullish' : '▼ Bearish'} {formatPercentWhole(confidence)}
    </span>
  )
}
