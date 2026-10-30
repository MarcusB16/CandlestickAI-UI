import type { ReplayRun } from '../data-contracts/models'

export const mockReplayRuns: ReplayRun[] = [
  { id: 'run-1', model: 'qwen3:8b', promptVersion: 'v3', bars: 2000, barsProcessed: 2000, hitRate: 0.51, calibrationError: 0.09, status: 'complete' },
  { id: 'run-2', model: 'qwen3:8b', promptVersion: 'v2', bars: 2000, barsProcessed: 2000, hitRate: 0.48, calibrationError: 0.13, status: 'complete' },
  { id: 'run-3', model: 'llama3.1:8b', promptVersion: 'v3', bars: 2000, barsProcessed: 2000, hitRate: 0.47, calibrationError: 0.15, status: 'complete' },
  { id: 'run-4', model: 'qwen3:14b', promptVersion: 'v3', bars: 5000, barsProcessed: 1850, hitRate: null, calibrationError: null, status: 'in-progress' },
]
