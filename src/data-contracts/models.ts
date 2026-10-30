export type Timeframe = '1D' | '1H' | '15m'
export type ResultSource = 'live' | 'replay'
export type Direction = 'bullish' | 'bearish'
export type StepActor = 'code' | 'ai'
export type ThinkingMode = 'off' | 'on'

export interface Candle {
  time: string
  open: number
  high: number
  low: number
  close: number
}

export interface Hypothesis {
  id: string
  pattern: string
  direction: Direction
  trigger: number
  target: number
  invalidation: number
  horizonBars: number
  confidence: number
  pastAccuracy: number
  pastSampleSize: number
}

export interface MarketContext {
  trend: string
  support: number
  resistance: number
  atr: number
  volumeRatio: number
  earningsInDays: number
}

export interface ReasoningStep {
  id: string
  title: string
  actor: StepActor
  actorLabel: string
  summary: string
  dataLines: string[]
  modelQuote?: string
  isPending: boolean
}

export interface ModelRunInfo {
  model: string
  promptVersion: string
  latencySeconds: number
}

export interface Analysis {
  ticker: string
  companyName: string
  lastPrice: number
  dailyChangePercent: number
  candles: Candle[]
  hypotheses: Hypothesis[]
  context: MarketContext
  reasoningSteps: ReasoningStep[]
  modelRun: ModelRunInfo
}

export interface WatchlistEntry {
  ticker: string
  companyName: string
  dailyChangePercent: number
}

export interface CalibrationPoint {
  statedConfidence: number
  actualWinRate: number
  sampleSize: number
}

export interface TrackRecordSummary {
  gradedCount: number
  hitRate: number
  calibrationError: number
  neverTriggeredCount: number
}

export interface PatternHitRate {
  pattern: string
  sampleSize: number
  hitRate: number
}

export interface TrackRecord {
  source: ResultSource
  summary: TrackRecordSummary
  calibration: CalibrationPoint[]
  patternHitRates: PatternHitRate[]
}

export type ReplayRunStatus = 'complete' | 'in-progress'

export interface ReplayRun {
  id: string
  model: string
  promptVersion: string
  bars: number
  barsProcessed: number
  hitRate: number | null
  calibrationError: number | null
  status: ReplayRunStatus
}

export interface GraderSettings {
  triggerWindowBars: number
  targetAtrMultiple: number
  horizonBars: number
}

export interface AppSettings {
  model: string
  thinkingMode: ThinkingMode
  grader: GraderSettings
}
