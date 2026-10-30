import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AnalyzePage } from './features/analyze/AnalyzePage'
import { ReplayPage } from './features/replay/ReplayPage'
import { SettingsPage } from './features/settings/SettingsPage'
import { TrackRecordPage } from './features/track-record/TrackRecordPage'
import { AppShell } from './shared/layout/AppShell'
import { LearningModeProvider } from './shared/learning/LearningModeProvider'

export function App() {
  return (
    <LearningModeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<AnalyzePage />} />
            <Route path="track-record" element={<TrackRecordPage />} />
            <Route path="replay" element={<ReplayPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LearningModeProvider>
  )
}
