import { createContext } from 'react'

export interface LearningModeValue {
  isLearningMode: boolean
  setLearningMode: (enabled: boolean) => void
}

export const LearningModeContext = createContext<LearningModeValue>({
  isLearningMode: false,
  setLearningMode: () => {},
})
