export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`
}

export function formatPercentWhole(fraction: number): string {
  return `${Math.round(fraction * 100)}%`
}

export function formatSignedPercent(percentValue: number): string {
  const sign = percentValue >= 0 ? '+' : '−'
  return `${sign}${Math.abs(percentValue).toFixed(1)}%`
}

export function formatCalibrationError(value: number): string {
  return value.toFixed(2)
}
