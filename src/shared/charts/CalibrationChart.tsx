import type { CalibrationPoint } from '../../data-contracts/models'
import { chartColors } from '../theme'

const VIEW_WIDTH = 360
const VIEW_HEIGHT = 240
const PADDING_LEFT = 56
const PADDING_RIGHT = 14
const PADDING_TOP = 12
const PADDING_BOTTOM = 40
const GRID_STEPS = [0, 0.2, 0.4, 0.6, 0.8, 1]

function toX(fraction: number): number {
  return PADDING_LEFT + fraction * (VIEW_WIDTH - PADDING_LEFT - PADDING_RIGHT)
}

function toY(fraction: number): number {
  return VIEW_HEIGHT - PADDING_BOTTOM - fraction * (VIEW_HEIGHT - PADDING_TOP - PADDING_BOTTOM)
}

export function CalibrationChart({ points }: { points: CalibrationPoint[] }) {
  const linePath = points.map((point, index) => `${index ? 'L' : 'M'}${toX(point.statedConfidence)},${toY(point.actualWinRate)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} role="img" aria-label="Calibration chart: stated confidence versus actual win rate" className="h-full w-full">
      {GRID_STEPS.map((step) => (
        <g key={step} fontSize="11" fill={chartColors.muted}>
          <line x1={toX(0)} x2={toX(1)} y1={toY(step)} y2={toY(step)} stroke={chartColors.border} />
          <line x1={toX(step)} x2={toX(step)} y1={toY(0)} y2={toY(1)} stroke={chartColors.border} />
          <text x={PADDING_LEFT - 8} y={toY(step) + 4} textAnchor="end">{Math.round(step * 100)}%</text>
          <text x={toX(step)} y={VIEW_HEIGHT - PADDING_BOTTOM + 16} textAnchor="middle">{Math.round(step * 100)}%</text>
        </g>
      ))}
      <line x1={toX(0)} y1={toY(0)} x2={toX(1)} y2={toY(1)} stroke={chartColors.muted} strokeDasharray="5 5" />
      <path d={linePath} fill="none" stroke={chartColors.accent} strokeWidth={2} />
      {points.map((point) => (
        <circle key={point.statedConfidence} cx={toX(point.statedConfidence)} cy={toY(point.actualWinRate)} r={3 + point.sampleSize / 18} fill={chartColors.accent}>
          <title>{`Stated ${Math.round(point.statedConfidence * 100)}% · actual ${Math.round(point.actualWinRate * 100)}% · n=${point.sampleSize}`}</title>
        </circle>
      ))}
      <text x={toX(0.5)} y={VIEW_HEIGHT - 6} textAnchor="middle" fontSize="11" fill={chartColors.muted}>Stated confidence</text>
      <text transform={`translate(12 ${toY(0.5)}) rotate(-90)`} textAnchor="middle" fontSize="11" fill={chartColors.muted}>Actual win rate</text>
    </svg>
  )
}
