import { useState } from 'react'
import type { ResultSource } from '../../data-contracts/models'
import { getMockTrackRecord } from '../../mock-data/trackRecordMock'
import { CalibrationChart } from '../../shared/charts/CalibrationChart'
import { SourceBadge } from '../../shared/ui/SourceBadge'
import { PageTabs } from '../../shared/ui/PageTabs'
import { Panel } from '../../shared/ui/Panel'
import { PatternHitRateTable } from './PatternHitRateTable'
import { SummaryNumbers } from './SummaryNumbers'

const sourceTabs: { id: ResultSource; label: string }[] = [
  { id: 'live', label: 'Live' },
  { id: 'replay', label: 'Replay' },
]

export function TrackRecordPage() {
  const [source, setSource] = useState<ResultSource>('live')
  const trackRecord = getMockTrackRecord(source)
  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-3.5 p-[18px]">
      <div className="flex items-center gap-3">
        <h1 className="m-0 text-xl font-semibold">Track Record</h1>
        <SourceBadge source={source} />
      </div>
      <Panel>
        <PageTabs tabs={sourceTabs} activeTabId={source} onSelect={setSource} />
      </Panel>
      <SummaryNumbers summary={trackRecord.summary} />
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-3.5">
        <Panel className="p-3.5">
          <div className="mb-2 text-[11px] uppercase tracking-[0.7px] text-muted">Calibration</div>
          <div className="h-[280px]">
            <CalibrationChart points={trackRecord.calibration} />
          </div>
        </Panel>
        <div>
          <div className="mb-2 text-[11px] uppercase tracking-[0.7px] text-muted">Hit rate by pattern</div>
          <PatternHitRateTable rows={trackRecord.patternHitRates} />
        </div>
      </div>
    </div>
  )
}
