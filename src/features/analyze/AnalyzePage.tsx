import { useMemo, useState } from 'react'
import type { Timeframe } from '../../data-contracts/models'
import { getMockAnalysis } from '../../mock-data/analysisMock'
import { getMockTrackRecord } from '../../mock-data/trackRecordMock'
import { mockWatchlist } from '../../mock-data/watchlistMock'
import { AnalysisSidePanel } from './AnalysisSidePanel'
import { ContextStats } from './ContextStats'
import { HypothesisChart } from './HypothesisChart'
import { TickerBar } from './TickerBar'
import { Watchlist } from './Watchlist'

export function AnalyzePage() {
  const [ticker, setTicker] = useState('AAPL')
  const [timeframe, setTimeframe] = useState<Timeframe>('1D')
  const [isWatchlistCollapsed, setWatchlistCollapsed] = useState(false)
  const [selectedHypothesisId, setSelectedHypothesisId] = useState('bullish-engulfing')

  const analysis = useMemo(() => getMockAnalysis(ticker, timeframe), [ticker, timeframe])
  const trackRecord = useMemo(() => getMockTrackRecord('live'), [])
  const selectedHypothesis = analysis.hypotheses.find((hypothesis) => hypothesis.id === selectedHypothesisId) ?? analysis.hypotheses[0]
  const columns = isWatchlistCollapsed ? 'grid-cols-[34px_1fr_390px]' : 'grid-cols-[200px_1fr_390px]'

  return (
    <div className="flex h-full flex-col">
      <TickerBar analysis={analysis} timeframe={timeframe} onSelectTimeframe={setTimeframe} onSelectTicker={setTicker} />
      <div className={`grid min-h-0 flex-1 gap-3.5 p-3.5 ${columns}`}>
        <Watchlist
          entries={mockWatchlist}
          selectedTicker={ticker}
          isCollapsed={isWatchlistCollapsed}
          onSelectTicker={setTicker}
          onToggleCollapsed={() => setWatchlistCollapsed(!isWatchlistCollapsed)}
        />
        <div className="grid min-h-0 grid-rows-[1fr_auto] gap-3.5">
          <HypothesisChart candles={analysis.candles} hypothesis={selectedHypothesis} />
          <ContextStats context={analysis.context} />
        </div>
        <AnalysisSidePanel
          analysis={analysis}
          trackRecord={trackRecord}
          selectedHypothesisId={selectedHypothesis.id}
          onSelectHypothesis={setSelectedHypothesisId}
        />
      </div>
    </div>
  )
}
