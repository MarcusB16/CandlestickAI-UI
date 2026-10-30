import type { ReactNode } from 'react'
import { glossary, type GlossaryTerm } from './glossary'
import { useLearningMode } from './useLearningMode'

interface JargonTermProps {
  term: GlossaryTerm
  children: ReactNode
}

export function JargonTerm({ term, children }: JargonTermProps) {
  const { isLearningMode } = useLearningMode()
  if (!isLearningMode) return <>{children}</>
  return (
    <span className="group relative cursor-help border-b border-dotted border-muted" tabIndex={0}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-[130%] z-20 hidden w-60 rounded-md border border-border bg-black p-2 text-xs normal-case leading-snug tracking-normal text-text group-hover:block group-focus:block"
      >
        {glossary[term]}
      </span>
    </span>
  )
}
