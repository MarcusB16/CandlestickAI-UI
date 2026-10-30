import type { ReactNode } from 'react'

interface PanelProps {
  children: ReactNode
  className?: string
}

export function Panel({ children, className = '' }: PanelProps) {
  return <div className={`rounded-[10px] border border-border bg-panel ${className}`}>{children}</div>
}
