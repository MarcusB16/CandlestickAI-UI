import type { ResultSource } from '../../data-contracts/models'

export function SourceBadge({ source }: { source: ResultSource }) {
  const tone = source === 'live' ? 'border-up text-up' : 'border-warn text-warn'
  return <span className={`rounded-full border px-2 py-0.5 text-[11px] ${tone}`}>{source === 'live' ? 'LIVE' : 'REPLAY'}</span>
}
