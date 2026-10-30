import type { Analysis, Hypothesis, ReasoningStep, Timeframe } from '../data-contracts/models'
import { hashTextToSeed } from './createSeededRandom'
import { generateSyntheticCandles } from './generateSyntheticCandles'
import { mockWatchlist } from './watchlistMock'

const MOCK_ATR = 3.1
const MOCK_MODEL_NAME = 'qwen3:8b'

function roundToCents(value: number): number {
  return Math.round(value * 100) / 100
}

function buildHypotheses(lastHigh: number, lastLow: number): Hypothesis[] {
  const bullishTrigger = roundToCents(lastHigh + 0.1)
  const bearishTrigger = roundToCents(lastLow - 0.1)
  return [
    {
      id: 'bullish-engulfing',
      pattern: 'Bullish engulfing',
      direction: 'bullish',
      trigger: bullishTrigger,
      target: roundToCents(bullishTrigger + MOCK_ATR),
      invalidation: bearishTrigger,
      horizonBars: 5,
      confidence: 0.62,
      pastAccuracy: 0.57,
      pastSampleSize: 212,
    },
    {
      id: 'resistance-rejection',
      pattern: 'Resistance rejection',
      direction: 'bearish',
      trigger: bearishTrigger,
      target: roundToCents(bearishTrigger - MOCK_ATR),
      invalidation: bullishTrigger,
      horizonBars: 5,
      confidence: 0.28,
      pastAccuracy: 0.46,
      pastSampleSize: 98,
    },
  ]
}

function buildReasoningSteps(): ReasoningStep[] {
  return [
    {
      id: 'pattern-detected',
      title: 'Pattern detected',
      actor: 'code',
      actorLabel: 'Code',
      summary: 'Rule-based detector scanned the last 80 daily candles.',
      dataLines: ['Bullish engulfing @ last bar', 'Prev: red, body -$1.60', 'Last: green, body +$2.90 (covers prev)'],
      isPending: false,
    },
    {
      id: 'context-gathered',
      title: 'Context gathered',
      actor: 'code',
      actorLabel: 'Code',
      summary: 'Facts the model is allowed to see.',
      dataLines: ['Trend: down 55 bars, flattening', 'Support $184.9 · Resistance $196.2', 'Volume 1.4× avg · ATR $3.10', 'Earnings in 19 days'],
      isPending: false,
    },
    {
      id: 'model-interpreted',
      title: 'Model interpreted',
      actor: 'ai',
      actorLabel: `AI · ${MOCK_MODEL_NAME}`,
      summary: 'Proposed competing explanations, each with a confidence.',
      dataLines: [],
      modelQuote:
        'Engulfing on above-average volume after a long decline suggests buyers stepping in. Resistance overhead keeps a failed bounce plausible, so I rate it 62 / 28.',
      isPending: false,
    },
    {
      id: 'graded-later',
      title: 'Graded later',
      actor: 'code',
      actorLabel: 'Code',
      summary: 'After 5 bars, the grader checks trigger → target or invalidation and adds the result to the track record.',
      dataLines: ['Status: waiting · 0 of 5 bars'],
      isPending: true,
    },
  ]
}

export function getMockAnalysis(ticker: string, timeframe: Timeframe): Analysis {
  const seed = hashTextToSeed(`${ticker}:${timeframe}`)
  const startPrice = 150 + (seed % 90)
  const candles = generateSyntheticCandles(seed, startPrice)
  const last = candles[candles.length - 1]
  const watchlistEntry = mockWatchlist.find((entry) => entry.ticker === ticker)
  return {
    ticker,
    companyName: watchlistEntry?.companyName ?? ticker,
    lastPrice: last.close,
    dailyChangePercent: watchlistEntry?.dailyChangePercent ?? 0.6,
    candles,
    hypotheses: buildHypotheses(last.high, last.low),
    context: {
      trend: 'Down → turning',
      support: roundToCents(Math.min(...candles.slice(-20).map((candle) => candle.low))),
      resistance: roundToCents(Math.max(...candles.slice(-40).map((candle) => candle.high))),
      atr: MOCK_ATR,
      volumeRatio: 1.4,
      earningsInDays: 19,
    },
    reasoningSteps: buildReasoningSteps(),
    modelRun: { model: MOCK_MODEL_NAME, promptVersion: 'v3', latencySeconds: 34 },
  }
}
