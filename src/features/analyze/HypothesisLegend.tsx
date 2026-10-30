import { JargonTerm } from '../../shared/learning/JargonTerm'

const legendItems = [
  { label: 'Trigger', term: 'trigger', color: 'text-accent' },
  { label: 'Target', term: 'target', color: 'text-up' },
  { label: 'Invalidation', term: 'invalidation', color: 'text-down' },
] as const

export function HypothesisLegend() {
  return (
    <div className="flex gap-4 text-xs text-muted">
      {legendItems.map((item) => (
        <span key={item.label}>
          <b className={`mr-1.5 inline-block w-[18px] border-t-2 border-dashed align-middle ${item.color}`} />
          <JargonTerm term={item.term}>{item.label}</JargonTerm>
        </span>
      ))}
    </div>
  )
}
