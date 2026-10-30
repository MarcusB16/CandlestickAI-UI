import { useContext } from 'react'
import { LearningModeContext } from './LearningModeContext'

export function useLearningMode() {
  return useContext(LearningModeContext)
}
