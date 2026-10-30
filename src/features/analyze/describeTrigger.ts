import type { Hypothesis } from '../../data-contracts/models'
import { formatPrice } from '../../shared/formatting/formatters'

export function describeTrigger(hypothesis: Hypothesis): string {
  const verb = hypothesis.direction === 'bullish' ? 'Close above' : 'Close below'
  return `${verb} ${formatPrice(hypothesis.trigger)}`
}
