import type { ReactNode } from 'react'
import { Panel } from './Panel'

interface StatCardProps {
  label: ReactNode
  value: ReactNode
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Panel className="px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.7px] text-muted">{label}</div>
      <div className="mt-0.5 whitespace-nowrap text-lg">{value}</div>
    </Panel>
  )
}
