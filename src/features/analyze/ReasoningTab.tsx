import type { ReasoningStep } from '../../data-contracts/models'
import { ReasoningStepItem } from './ReasoningStepItem'

export function ReasoningTab({ steps }: { steps: ReasoningStep[] }) {
  return (
    <ol className="m-0 p-0">
      {steps.map((step, index) => (
        <ReasoningStepItem key={step.id} step={step} stepNumber={index + 1} isLast={index === steps.length - 1} />
      ))}
    </ol>
  )
}
