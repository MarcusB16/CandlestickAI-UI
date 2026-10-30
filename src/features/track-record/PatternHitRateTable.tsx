import type { PatternHitRate } from '../../data-contracts/models'
import { formatPercentWhole } from '../../shared/formatting/formatters'
import { JargonTerm } from '../../shared/learning/JargonTerm'
import { Panel } from '../../shared/ui/Panel'

const LOW_SAMPLE_THRESHOLD = 100

export function PatternHitRateTable({ rows }: { rows: PatternHitRate[] }) {
  return (
    <Panel className="overflow-hidden">
      <table className="w-full border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-border text-[11px] uppercase tracking-[0.7px] text-muted">
            <th className="px-4 py-2.5 font-medium">Pattern</th>
            <th className="px-4 py-2.5 font-medium">Graded (n)</th>
            <th className="px-4 py-2.5 font-medium"><JargonTerm term="hitRate">Hit rate</JargonTerm></th>
            <th className="px-4 py-2.5 font-medium">Sample</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.pattern} className="border-b border-border last:border-b-0">
              <td className="px-4 py-2.5">{row.pattern}</td>
              <td className="px-4 py-2.5">{row.sampleSize}</td>
              <td className="px-4 py-2.5">{formatPercentWhole(row.hitRate)}</td>
              <td className="px-4 py-2.5">
                {row.sampleSize < LOW_SAMPLE_THRESHOLD && (
                  <span className="rounded-full border border-warn px-2 py-0.5 text-[11px] text-warn">Low sample (n &lt; {LOW_SAMPLE_THRESHOLD})</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
}
