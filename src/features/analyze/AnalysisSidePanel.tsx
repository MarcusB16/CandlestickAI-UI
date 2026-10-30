import { useState } from 'react'
import type { Analysis, TrackRecord } from '../../data-contracts/models'
import { PageTabs } from '../../shared/ui/PageTabs'
import { Panel } from '../../shared/ui/Panel'
import { HypothesesTab } from './HypothesesTab'
import { ReasoningTab } from './ReasoningTab'
import { TrackRecordTab } from './TrackRecordTab'

type SideTabId = 'hypotheses' | 'reasoning' | 'track-record'

const sideTabs: { id: SideTabId; label: string }[] = [
  { id: 'hypotheses', label: 'Hypotheses' },
  { id: 'reasoning', label: 'Reasoning' },
  { id: 'track-record', label: 'Track record' },
]

interface AnalysisSidePanelProps {
  analysis: Analysis
  trackRecord: TrackRecord
  selectedHypothesisId: string
  onSelectHypothesis: (hypothesisId: string) => void
}

export function AnalysisSidePanel({ analysis, trackRecord, selectedHypothesisId, onSelectHypothesis }: AnalysisSidePanelProps) {
  const [activeTabId, setActiveTabId] = useState<SideTabId>('hypotheses')
  return (
    <Panel className="flex min-h-0 flex-col overflow-hidden">
      <PageTabs tabs={sideTabs} activeTabId={activeTabId} onSelect={setActiveTabId} />
      <div className="flex-1 overflow-auto p-3.5">
        {activeTabId === 'hypotheses' && (
          <HypothesesTab
            hypotheses={analysis.hypotheses}
            selectedHypothesisId={selectedHypothesisId}
            modelRun={analysis.modelRun}
            onSelectHypothesis={onSelectHypothesis}
          />
        )}
        {activeTabId === 'reasoning' && <ReasoningTab steps={analysis.reasoningSteps} />}
        {activeTabId === 'track-record' && <TrackRecordTab trackRecord={trackRecord} />}
      </div>
    </Panel>
  )
}
