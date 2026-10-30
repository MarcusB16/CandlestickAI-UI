import type { Candle } from '../data-contracts/models'
import { createSeededRandom } from './createSeededRandom'

const SYNTHETIC_START_DATE = Date.UTC(2025, 0, 2)
const DAY_IN_MILLISECONDS = 86_400_000

function formatBusinessDay(index: number): string {
  let businessDaysLeft = index
  let timestamp = SYNTHETIC_START_DATE
  while (businessDaysLeft > 0) {
    timestamp += DAY_IN_MILLISECONDS
    const weekday = new Date(timestamp).getUTCDay()
    if (weekday !== 0 && weekday !== 6) businessDaysLeft -= 1
  }
  return new Date(timestamp).toISOString().slice(0, 10)
}

function roundToCents(value: number): number {
  return Math.round(value * 100) / 100
}

function applyBullishEngulfingFinish(candles: Candle[]): void {
  const previous = candles[candles.length - 2]
  const last = candles[candles.length - 1]
  previous.close = previous.open - 1.6
  previous.high = previous.open + 0.4
  previous.low = previous.close - 0.5
  last.open = previous.close - 0.3
  last.close = previous.open + 1.4
  last.high = last.close + 0.4
  last.low = last.open - 0.4
}

export function generateSyntheticCandles(seed: number, startPrice: number, count = 80): Candle[] {
  const nextRandom = createSeededRandom(seed)
  const candles: Candle[] = []
  let price = startPrice
  for (let index = 0; index < count; index++) {
    const drift = index < count * 0.69 ? -0.35 : 0.1
    const open = price
    const close = open + drift + (nextRandom() - 0.5) * 3.4
    candles.push({
      time: formatBusinessDay(index),
      open,
      high: Math.max(open, close) + nextRandom() * 1.4,
      low: Math.min(open, close) - nextRandom() * 1.4,
      close,
    })
    price = close
  }
  applyBullishEngulfingFinish(candles)
  return candles.map((candle) => ({
    time: candle.time,
    open: roundToCents(candle.open),
    high: roundToCents(candle.high),
    low: roundToCents(candle.low),
    close: roundToCents(candle.close),
  }))
}
