export const glossary = {
  trigger: 'The price that must be reached for the idea to count. If it never gets there, the idea is simply not tested.',
  target: 'The price the idea expects to reach after it triggers. Reaching it counts as a win.',
  invalidation: 'The price that proves the idea wrong. Cross it and the pattern failed.',
  horizon: 'How many bars the idea has to play out before the grader scores it.',
  atr: 'Average True Range: how far the price typically moves in one bar. A yardstick for how big a move is.',
  supportResistance: 'Support is a price where buyers have stepped in before; resistance is where sellers have. Price often stalls near them.',
  calibrationError: 'How far stated confidence is from reality. 0 means "62% confident" really wins 62% of the time.',
  hitRate: 'The share of graded ideas that reached their target before being invalidated.',
  engulfing: 'A candle whose body fully covers the previous one, often read as a shift in who is in control.',
  rejection: 'Price pushes into a level and gets pushed back, suggesting sellers defend it.',
} as const

export type GlossaryTerm = keyof typeof glossary
