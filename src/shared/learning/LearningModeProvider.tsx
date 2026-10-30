import { useMemo, useState, type ReactNode } from 'react'
import { LearningModeContext } from './LearningModeContext'

export function LearningModeProvider({ children }: { children: ReactNode }) {
  const [isLearningMode, setLearningMode] = useState(true)
  const value = useMemo(() => ({ isLearningMode, setLearningMode }), [isLearningMode])
  return <LearningModeContext.Provider value={value}>{children}</LearningModeContext.Provider>
}
