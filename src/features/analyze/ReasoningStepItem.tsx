import type { ReasoningStep } from '../../data-contracts/models'

interface ReasoningStepItemProps {
  step: ReasoningStep
  stepNumber: number
  isLast: boolean
}

export function ReasoningStepItem({ step, stepNumber, isLast }: ReasoningStepItemProps) {
  const badgeTone = step.isPending ? 'border border-dashed border-muted bg-panel2 text-muted' : 'bg-accent text-white'
  const actorTone = step.actor === 'ai' ? 'border-accent text-accent' : 'border-border text-muted'
  return (
    <li className="relative list-none pb-[18px] pl-[38px]">
      <span className={`absolute left-0 top-0 grid h-6 w-6 place-items-center rounded-full text-xs font-semibold ${badgeTone}`}>{stepNumber}</span>
      {!isLast && <span className="absolute bottom-1 left-[11px] top-7 w-0.5 bg-border" />}
      <h4 className="m-0 flex items-center justify-between text-sm">
        {step.title}
        <span className={`rounded-full border px-[7px] py-px text-[10px] font-medium uppercase tracking-[0.6px] ${actorTone}`}>{step.actorLabel}</span>
      </h4>
      <p className="mb-1.5 mt-[3px] text-[13px] text-muted">{step.summary}</p>
      {step.dataLines.length > 0 && (
        <div className="rounded-md border border-border bg-bg px-2.5 py-1.5 font-mono text-xs leading-[1.6] text-[#c5d0de]">
          {step.dataLines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      )}
      {step.modelQuote && (
        <blockquote className="m-0 rounded-r-md border-l-[3px] border-accent bg-accent/10 px-2.5 py-2 text-[13px] text-[#c5d0de]">
          “{step.modelQuote}”
        </blockquote>
      )}
    </li>
  )
}
