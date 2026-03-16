export function computeMemoryScore(params: {
  solvedClean: number
  solvedStruggle: number
  neededHint: number
  failed: number
  intervalDays: number
  overdueDays: number
}): number {
  const { solvedClean, solvedStruggle, neededHint, failed, intervalDays, overdueDays } = params
  const score =
    50 +
    8 * solvedClean +
    3 * solvedStruggle -
    6 * neededHint -
    10 * failed +
    Math.min(intervalDays, 30) * 0.5 -
    overdueDays * 1.5
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function memoryBand(score: number): 'strong' | 'decent' | 'shaky' | 'weak' {
  if (score >= 80) return 'strong'
  if (score >= 60) return 'decent'
  if (score >= 40) return 'shaky'
  return 'weak'
}
