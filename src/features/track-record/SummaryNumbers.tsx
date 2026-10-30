import type { TrackRecordSummary } from '../../data-contracts/models'
import { formatCalibrationError, formatPercentWhole } from '../../shared/formatting/formatters'
import { JargonTerm } from '../../shared/learning/JargonTerm'
import { StatCard } from '../../shared/ui/StatCard'

export function SummaryNumbers({ summary }: { summary: TrackRecordSummary }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <StatCard label="Graded" value={summary.gradedCount} />
      <StatCard label={<JargonTerm term="hitRate">Hit rate</JargonTerm>} value={formatPercentWhole(summary.hitRate)} />
      <StatCard label={<JargonTerm term="calibrationError">Calibration error</JargonTerm>} value={formatCalibrationError(summary.calibrationError)} />
      <StatCard label="Never triggered" value={summary.neverTriggeredCount} />
    </div>
  )
}
