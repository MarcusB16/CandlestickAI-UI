import type { WatchlistEntry } from '../../data-contracts/models'
import { formatSignedPercent } from '../../shared/formatting/formatters'
import { Panel } from '../../shared/ui/Panel'

interface WatchlistProps {
  entries: WatchlistEntry[]
  selectedTicker: string
  isCollapsed: boolean
  onSelectTicker: (ticker: string) => void
  onToggleCollapsed: () => void
}

export function Watchlist({ entries, selectedTicker, isCollapsed, onSelectTicker, onToggleCollapsed }: WatchlistProps) {
  if (isCollapsed) {
    return (
      <Panel className="overflow-hidden">
        <button
          type="button"
          onClick={onToggleCollapsed}
          title="Show watchlist"
          className="h-full w-full cursor-pointer border-0 bg-transparent py-3.5 tracking-[0.5px] text-muted [writing-mode:vertical-rl] hover:text-text"
        >
          Watchlist »
        </button>
      </Panel>
    )
  }
  return (
    <Panel className="flex min-h-0 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <b>Watchlist</b>
        <button type="button" onClick={onToggleCollapsed} title="Hide watchlist" className="cursor-pointer border-0 bg-transparent text-muted hover:text-text">
          « Hide
        </button>
      </div>
      <ul className="m-0 flex-1 list-none overflow-auto p-0">
        {entries.map((entry) => {
          const rowTone = entry.ticker === selectedTicker ? 'border-accent bg-panel2' : 'border-transparent hover:bg-panel2'
          return (
            <li key={entry.ticker}>
              <button
                type="button"
                onClick={() => onSelectTicker(entry.ticker)}
                className={`flex w-full cursor-pointer items-center justify-between border-0 border-l-[3px] bg-transparent px-3 py-2 text-left text-text ${rowTone}`}
              >
                <span>
                  {entry.ticker}
                  <small className="block text-[11px] text-muted">{entry.companyName}</small>
                </span>
                <span className={entry.dailyChangePercent >= 0 ? 'text-up' : 'text-down'}>{formatSignedPercent(entry.dailyChangePercent)}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <button type="button" className="cursor-pointer border-0 border-t border-border bg-transparent px-3 py-2.5 text-left text-[13px] text-accent">
        + Add ticker
      </button>
    </Panel>
  )
}
