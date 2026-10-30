import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { TrackRecord } from '../../data-contracts/models'
import { CalibrationChart } from '../../shared/charts/CalibrationChart'
import { formatCalibrationError, formatPercentWhole } from '../../shared/formatting/formatters'
import { JargonTerm } from '../../shared/learning/JargonTerm'

function SummaryRow({ label, value }: { label: ReactNode; value: string | number }) {
  return (
    <div className="flex justify-between border-b border-border py-[9px] text-[13px]">
      <span className="text-muted">{label}</span>
      <b>{value}</b>
    </div>
  )
}

export function TrackRecordTab({ trackRecord }: { trackRecord: TrackRecord }) {
  const { summary } = trackRecord
  return (
    <div>
      <div className="h-[220px]">
        <CalibrationChart points={trackRecord.calibration} />
      </div>
      <SummaryRow label="Graded" value={summary.gradedCount} />
      <SummaryRow label={<JargonTerm term="hitRate">Hit rate</JargonTerm>} value={formatPercentWhole(summary.hitRate)} />
      <SummaryRow label={<JargonTerm term="calibrationError">Calibration error</JargonTerm>} value={formatCalibrationError(summary.calibrationError)} />
      <SummaryRow label="Never triggered" value={summary.neverTriggeredCount} />
      <p className="mt-2.5 text-xs text-muted">
        Full breakdown by pattern is on the <Link to="/track-record" className="text-accent">Track Record page</Link>.
      </p>
    </div>
  )
}
