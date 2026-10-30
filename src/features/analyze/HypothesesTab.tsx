import type { Hypothesis, ModelRunInfo } from '../../data-contracts/models'
import { HypothesisCard } from './HypothesisCard'

interface HypothesesTabProps {
  hypotheses: Hypothesis[]
  selectedHypothesisId: string
  modelRun: ModelRunInfo
  onSelectHypothesis: (hypothesisId: string) => void
}

export function HypothesesTab({ hypotheses, selectedHypothesisId, modelRun, onSelectHypothesis }: HypothesesTabProps) {
  return (
    <div>
      {hypotheses.map((hypothesis) => (
        <HypothesisCard
          key={hypothesis.id}
          hypothesis={hypothesis}
          isSelected={hypothesis.id === selectedHypothesisId}
          onSelect={() => onSelectHypothesis(hypothesis.id)}
        />
      ))}
      <div className="text-xs text-muted">
        {modelRun.model} · prompt {modelRun.promptVersion} · {modelRun.latencySeconds} s
      </div>
    </div>
  )
}
