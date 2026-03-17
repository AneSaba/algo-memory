import { ReviewResult } from './types'

export interface SchedulerUpdate {
  intervalDays: number
  easeFactor: number
  memoryScore: number
  consecutiveFails: number
  struggling: boolean
}

function cleanMultiplier(score: number): number {
  if (score >= 80) return 2.5
  if (score >= 60) return 2.0
  if (score >= 40) return 1.6
  return 1.3
}

function struggleMultiplier(score: number): number {
  return score >= 60 ? 1.4 : 1.1
}

export function updateSchedule(
  result: ReviewResult,
  current: { intervalDays: number; easeFactor: number; memoryScore: number; consecutiveFails?: number }
): SchedulerUpdate {
  let { intervalDays, easeFactor, memoryScore } = current
  let consecutiveFails = current.consecutiveFails ?? 0

  switch (result) {
    case 'solved_clean':
      intervalDays = Math.max(1, Math.round(intervalDays * cleanMultiplier(memoryScore)))
      easeFactor = Math.min(2.8, easeFactor + 0.1)
      memoryScore = Math.min(100, memoryScore + 10)
      consecutiveFails = 0
      break
    case 'solved_struggle':
      intervalDays = Math.max(1, Math.round(intervalDays * struggleMultiplier(memoryScore)))
      memoryScore = Math.min(100, memoryScore + 4)
      consecutiveFails = 0
      break
    case 'needed_hint':
      intervalDays = Math.max(1, Math.round(intervalDays * 0.6))
      easeFactor = Math.max(1.3, easeFactor - 0.1)
      memoryScore = Math.max(0, memoryScore - 8)
      consecutiveFails = 0
      break
    case 'failed':
      consecutiveFails++
      easeFactor = Math.max(1.3, easeFactor - 0.2)
      memoryScore = Math.max(0, memoryScore - 15)
      intervalDays = 0 // always back today
      break
  }

  const struggling = consecutiveFails >= 3

  return { intervalDays, easeFactor, memoryScore, consecutiveFails, struggling }
}

export function getNextReviewDate(intervalDays: number): string {
  const d = new Date()
  d.setDate(d.getDate() + Math.max(0, intervalDays))
  return d.toISOString().split('T')[0]
}

export function isOverdue(nextReview: string | null): boolean {
  if (!nextReview) return false
  return new Date(nextReview) < new Date(new Date().toISOString().split('T')[0])
}

export function isDueToday(nextReview: string | null): boolean {
  if (!nextReview) return false
  const today = new Date().toISOString().split('T')[0]
  return nextReview === today
}
