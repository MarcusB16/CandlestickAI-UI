import type { ResultSource, TrackRecord } from '../data-contracts/models'

const liveTrackRecord: TrackRecord = {
  source: 'live',
  summary: { gradedCount: 418, hitRate: 0.54, calibrationError: 0.07, neverTriggeredCount: 31 },
  calibration: [
    { statedConfidence: 0.25, actualWinRate: 0.3, sampleSize: 30 },
    { statedConfidence: 0.35, actualWinRate: 0.38, sampleSize: 55 },
    { statedConfidence: 0.45, actualWinRate: 0.43, sampleSize: 80 },
    { statedConfidence: 0.55, actualWinRate: 0.52, sampleSize: 96 },
    { statedConfidence: 0.65, actualWinRate: 0.58, sampleSize: 70 },
    { statedConfidence: 0.75, actualWinRate: 0.66, sampleSize: 44 },
    { statedConfidence: 0.85, actualWinRate: 0.71, sampleSize: 20 },
  ],
  patternHitRates: [
    { pattern: 'Bullish engulfing', sampleSize: 212, hitRate: 0.57 },
    { pattern: 'Resistance rejection', sampleSize: 98, hitRate: 0.46 },
    { pattern: 'Hammer', sampleSize: 64, hitRate: 0.55 },
    { pattern: 'Bearish engulfing', sampleSize: 31, hitRate: 0.48 },
    { pattern: 'Morning star', sampleSize: 13, hitRate: 0.69 },
  ],
}

const replayTrackRecord: TrackRecord = {
  source: 'replay',
  summary: { gradedCount: 2640, hitRate: 0.51, calibrationError: 0.09, neverTriggeredCount: 204 },
  calibration: [
    { statedConfidence: 0.25, actualWinRate: 0.31, sampleSize: 180 },
    { statedConfidence: 0.35, actualWinRate: 0.36, sampleSize: 340 },
    { statedConfidence: 0.45, actualWinRate: 0.42, sampleSize: 520 },
    { statedConfidence: 0.55, actualWinRate: 0.49, sampleSize: 610 },
    { statedConfidence: 0.65, actualWinRate: 0.55, sampleSize: 430 },
    { statedConfidence: 0.75, actualWinRate: 0.6, sampleSize: 380 },
    { statedConfidence: 0.85, actualWinRate: 0.64, sampleSize: 180 },
  ],
  patternHitRates: [
    { pattern: 'Bullish engulfing', sampleSize: 980, hitRate: 0.53 },
    { pattern: 'Resistance rejection', sampleSize: 610, hitRate: 0.47 },
    { pattern: 'Hammer', sampleSize: 520, hitRate: 0.52 },
    { pattern: 'Bearish engulfing', sampleSize: 430, hitRate: 0.5 },
    { pattern: 'Morning star', sampleSize: 100, hitRate: 0.58 },
  ],
}

export function getMockTrackRecord(source: ResultSource): TrackRecord {
  return source === 'live' ? liveTrackRecord : replayTrackRecord
}
