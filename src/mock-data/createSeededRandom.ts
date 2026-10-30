export function createSeededRandom(seed: number): () => number {
  let state = seed % 2147483647
  if (state <= 0) state += 2147483646
  return () => {
    state = (state * 16807) % 2147483647
    return state / 2147483647
  }
}

export function hashTextToSeed(text: string): number {
  let hash = 7
  for (const character of text) hash = (hash * 31 + character.charCodeAt(0)) % 2147483647
  return hash
}
