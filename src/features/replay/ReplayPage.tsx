import { mockReplayRuns } from '../../mock-data/replayRunsMock'
import { SourceBadge } from '../../shared/ui/SourceBadge'
import { ReplayRunsTable } from './ReplayRunsTable'

export function ReplayPage() {
  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-3.5 p-[18px]">
      <div className="flex items-center gap-3">
        <h1 className="m-0 text-xl font-semibold">Replay</h1>
        <SourceBadge source="replay" />
      </div>
      <p className="m-0 text-muted">Replay runs re-analyze historical bars with a chosen model and prompt. They are scored separately from live results.</p>
      <ReplayRunsTable runs={mockReplayRuns} />
    </div>
  )
}
