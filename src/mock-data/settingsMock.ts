import type { AppSettings } from '../data-contracts/models'

export const mockModelOptions = ['qwen3:8b', 'qwen3:14b', 'llama3.1:8b']

export const mockDefaultSettings: AppSettings = {
  model: 'qwen3:8b',
  thinkingMode: 'off',
  grader: { triggerWindowBars: 3, targetAtrMultiple: 1, horizonBars: 5 },
}
