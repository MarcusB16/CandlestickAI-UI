import { useState, type DragEvent, type FormEvent } from 'react'
import type { Analysis, Timeframe } from '../../data-contracts/models'
import { formatPrice, formatSignedPercent } from '../../shared/formatting/formatters'
import { Pill } from '../../shared/ui/Pill'
import { SourceBadge } from '../../shared/ui/SourceBadge'

const timeframes: Timeframe[] = ['1D', '1H', '15m']

interface TickerBarProps {
  analysis: Analysis
  timeframe: Timeframe
  onSelectTimeframe: (timeframe: Timeframe) => void
  onSelectTicker: (ticker: string) => void
}

export function TickerBar({ analysis, timeframe, onSelectTimeframe, onSelectTicker }: TickerBarProps) {
  const [searchText, setSearchText] = useState(analysis.ticker)
  const [shownTicker, setShownTicker] = useState(analysis.ticker)
  if (shownTicker !== analysis.ticker) {
    setShownTicker(analysis.ticker)
    setSearchText(analysis.ticker)
  }

  function submitSearch(event: FormEvent) {
    event.preventDefault()
    const ticker = searchText.trim().toUpperCase()
    if (ticker) onSelectTicker(ticker)
  }

  function acceptScreenshotDrop(event: DragEvent) {
    event.preventDefault()
    onSelectTicker('NVDA')
  }

  const changeTone = analysis.dailyChangePercent >= 0 ? 'text-up' : 'text-down'
  return (
    <div className="flex items-center gap-4 border-b border-border px-[18px] py-2.5">
      <h1 className="m-0 text-xl font-semibold">{analysis.ticker}</h1>
      <span>{formatPrice(analysis.lastPrice)}</span>
      <span className={changeTone}>{formatSignedPercent(analysis.dailyChangePercent)}</span>
      <SourceBadge source="live" />
      {timeframes.map((option) => (
        <Pill key={option} label={option} isOn={option === timeframe} onClick={() => onSelectTimeframe(option)} />
      ))}
      <div className="ml-auto flex items-center gap-2.5">
        <form onSubmit={submitSearch}>
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            aria-label="Ticker"
            className="w-[200px] rounded-md border border-border bg-panel px-3 py-1.5 text-text"
          />
        </form>
        <button
          type="button"
          onClick={() => onSelectTicker('NVDA')}
          onDragOver={(event) => event.preventDefault()}
          onDrop={acceptScreenshotDrop}
          className="cursor-pointer rounded-full border border-dashed border-border bg-panel px-3 py-1 text-xs text-muted hover:text-text"
        >
          Drop screenshot
        </button>
      </div>
    </div>
  )
}
