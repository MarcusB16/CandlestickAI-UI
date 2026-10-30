import type { MarketContext } from '../../data-contracts/models'
import { formatPrice } from '../../shared/formatting/formatters'
import { JargonTerm } from '../../shared/learning/JargonTerm'
import { StatCard } from '../../shared/ui/StatCard'

export function ContextStats({ context }: { context: MarketContext }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <StatCard label="Trend" value={context.trend} />
      <StatCard
        label={<JargonTerm term="supportResistance">Support / Resistance</JargonTerm>}
        value={`${formatPrice(context.support)} / ${formatPrice(context.resistance)}`}
      />
      <StatCard
        label={<JargonTerm term="atr">ATR</JargonTerm>}
        value={`${formatPrice(context.atr)} · Vol ${context.volumeRatio.toFixed(1)}×`}
      />
      <StatCard label="Earnings" value={`in ${context.earningsInDays} days`} />
    </div>
  )
}
