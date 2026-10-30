import type { ReplayRun } from '../../data-contracts/models'
import { formatCalibrationError, formatPercentWhole } from '../../shared/formatting/formatters'
import { Panel } from '../../shared/ui/Panel'

function describeStatus(run: ReplayRun): string {
  if (run.status === 'complete') return 'Complete'
  return `In progress · ${run.barsProcessed} of ${run.bars} bars`
}

export function ReplayRunsTable({ runs }: { runs: ReplayRun[] }) {
  return (
    <Panel className="overflow-hidden">
      <table className="w-full border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-border text-[11px] uppercase tracking-[0.7px] text-muted">
            <th className="px-4 py-2.5 font-medium">Model</th>
            <th className="px-4 py-2.5 font-medium">Prompt version</th>
            <th className="px-4 py-2.5 font-medium">Bars</th>
            <th className="px-4 py-2.5 font-medium">Hit rate</th>
            <th className="px-4 py-2.5 font-medium">Calibration error</th>
            <th className="px-4 py-2.5 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className="border-b border-border last:border-b-0">
              <td className="px-4 py-2.5">{run.model}</td>
              <td className="px-4 py-2.5">{run.promptVersion}</td>
              <td className="px-4 py-2.5">{run.bars}</td>
              <td className="px-4 py-2.5">{run.hitRate === null ? '—' : formatPercentWhole(run.hitRate)}</td>
              <td className="px-4 py-2.5">{run.calibrationError === null ? '—' : formatCalibrationError(run.calibrationError)}</td>
              <td className={`px-4 py-2.5 ${run.status === 'in-progress' ? 'text-warn' : ''}`}>{describeStatus(run)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
}
