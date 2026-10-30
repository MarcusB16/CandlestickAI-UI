import type { Hypothesis } from '../../data-contracts/models'
import { formatPercentWhole, formatPrice } from '../../shared/formatting/formatters'
import { JargonTerm } from '../../shared/learning/JargonTerm'
import type { GlossaryTerm } from '../../shared/learning/glossary'
import { ConfidenceBar } from '../../shared/ui/ConfidenceBar'
import { DirectionBadge } from '../../shared/ui/DirectionBadge'
import { describeTrigger } from './describeTrigger'

interface HypothesisCardProps {
  hypothesis: Hypothesis
  isSelected: boolean
  onSelect: () => void
}

function patternTerm(hypothesis: Hypothesis): GlossaryTerm {
  return hypothesis.pattern.toLowerCase().includes('engulfing') ? 'engulfing' : 'rejection'
}

export function HypothesisCard({ hypothesis, isSelected, onSelect }: HypothesisCardProps) {
  const border = isSelected ? 'border-accent shadow-[inset_0_0_0_1px_var(--color-accent)]' : 'border-border'
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onSelect}
      onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && onSelect()}
      className={`mb-3 cursor-pointer rounded-[10px] border bg-panel2 p-3 ${border}`}
    >
      <h3 className="m-0 flex items-center justify-between text-[15px]">
        <JargonTerm term={patternTerm(hypothesis)}>{hypothesis.pattern}</JargonTerm>
        <DirectionBadge direction={hypothesis.direction} confidence={hypothesis.confidence} />
      </h3>
      <ConfidenceBar confidence={hypothesis.confidence} />
      <dl className="m-0 grid grid-cols-[90px_1fr] gap-x-2 gap-y-[3px] text-[13px]">
        <dt className="text-muted"><JargonTerm term="trigger">Trigger</JargonTerm></dt>
        <dd className="m-0">{describeTrigger(hypothesis)}</dd>
        <dt className="text-muted"><JargonTerm term="target">Target</JargonTerm></dt>
        <dd className="m-0">{formatPrice(hypothesis.target)}</dd>
        <dt className="text-muted"><JargonTerm term="invalidation">Invalidation</JargonTerm></dt>
        <dd className="m-0">{formatPrice(hypothesis.invalidation)}</dd>
        <dt className="text-muted"><JargonTerm term="horizon">Horizon</JargonTerm></dt>
        <dd className="m-0">{hypothesis.horizonBars} bars</dd>
      </dl>
      <div className="mt-2 text-xs text-muted">
        Past accuracy for this pattern: <b className="text-text">{formatPercentWhole(hypothesis.pastAccuracy)}</b> (n={hypothesis.pastSampleSize})
      </div>
    </div>
  )
}
