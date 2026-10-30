import { useState } from 'react'
import { mockDefaultSettings, mockModelOptions } from '../../mock-data/settingsMock'
import { JargonTerm } from '../../shared/learning/JargonTerm'
import { useLearningMode } from '../../shared/learning/useLearningMode'
import { Panel } from '../../shared/ui/Panel'
import { SettingsField } from './SettingsField'

const controlClass = 'rounded-md border border-border bg-bg px-3 py-1.5 text-text'

export function SettingsPage() {
  const [settings, setSettings] = useState(mockDefaultSettings)
  const { isLearningMode, setLearningMode } = useLearningMode()

  function updateGrader(change: Partial<typeof settings.grader>) {
    setSettings({ ...settings, grader: { ...settings.grader, ...change } })
  }

  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-3.5 p-[18px]">
      <h1 className="m-0 text-xl font-semibold">Settings</h1>
      <Panel className="px-4">
        <SettingsField label="Model" htmlFor="model">
          <select id="model" className={controlClass} value={settings.model} onChange={(event) => setSettings({ ...settings, model: event.target.value })}>
            {mockModelOptions.map((model) => (
              <option key={model}>{model}</option>
            ))}
          </select>
        </SettingsField>
        <SettingsField label="Thinking mode" htmlFor="thinking">
          <select
            id="thinking"
            className={controlClass}
            value={settings.thinkingMode}
            onChange={(event) => setSettings({ ...settings, thinkingMode: event.target.value as typeof settings.thinkingMode })}
          >
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
        </SettingsField>
        <SettingsField label="Learning mode" htmlFor="learning">
          <input id="learning" type="checkbox" className="h-4 w-4 accent-accent" checked={isLearningMode} onChange={(event) => setLearningMode(event.target.checked)} />
        </SettingsField>
      </Panel>
      <h2 className="m-0 mt-2 text-[11px] font-medium uppercase tracking-[0.7px] text-muted">Grader</h2>
      <Panel className="px-4">
        <SettingsField label="Trigger window (bars)" htmlFor="trigger-window">
          <input id="trigger-window" type="number" min={1} className={`${controlClass} w-24`} value={settings.grader.triggerWindowBars} onChange={(event) => updateGrader({ triggerWindowBars: Number(event.target.value) })} />
        </SettingsField>
        <SettingsField label={<>Target (multiples of <JargonTerm term="atr">ATR</JargonTerm>)</>} htmlFor="target-atr">
          <input id="target-atr" type="number" min={0.1} step={0.1} className={`${controlClass} w-24`} value={settings.grader.targetAtrMultiple} onChange={(event) => updateGrader({ targetAtrMultiple: Number(event.target.value) })} />
        </SettingsField>
        <SettingsField label={<><JargonTerm term="horizon">Horizon</JargonTerm> (bars)</>} htmlFor="horizon">
          <input id="horizon" type="number" min={1} className={`${controlClass} w-24`} value={settings.grader.horizonBars} onChange={(event) => updateGrader({ horizonBars: Number(event.target.value) })} />
        </SettingsField>
      </Panel>
    </div>
  )
}
