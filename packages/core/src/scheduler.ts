import { ReviewResult } from './types'

export interface SchedulerUpdate {
  intervalDays: number
  easeFactor: number
  memoryScore: number
  consecutiveFails: number
  struggling: boolean
  mastered: boolean
  cleanStreakAfterFail: number
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
  current: {
    intervalDays: number
    easeFactor: number
    memoryScore: number
    consecutiveFails?: number
    cleanStreakAfterFail?: number
  }
): SchedulerUpdate {
  let { intervalDays, easeFactor, memoryScore } = current
  let consecutiveFails = current.consecutiveFails ?? 0
  let cleanStreakAfterFail = current.cleanStreakAfterFail ?? 0

  // If there's a fail history, cap the clean multiplier until 2 clean solves in a row
  const hasFailHistory = consecutiveFails > 0 || cleanStreakAfterFail > 0
  const recoveredFromFail = cleanStreakAfterFail >= 2

  switch (result) {
    case 'solved_clean': {
      const multiplier = (hasFailHistory && !recoveredFromFail)
        ? 1.3
        : cleanMultiplier(memoryScore)
      intervalDays = Math.max(1, Math.round(intervalDays * multiplier))
      easeFactor = Math.min(2.8, easeFactor + 0.1)
      memoryScore = Math.min(100, memoryScore + 10)
      consecutiveFails = 0
      cleanStreakAfterFail = hasFailHistory ? cleanStreakAfterFail + 1 : 0
      // Clear recovery tracking once fully recovered
      if (cleanStreakAfterFail >= 2) cleanStreakAfterFail = 0
      break
    }
    case 'solved_struggle':
      intervalDays = Math.max(1, Math.round(intervalDays * struggleMultiplier(memoryScore)))
      memoryScore = Math.min(100, memoryScore + 4)
      consecutiveFails = 0
      cleanStreakAfterFail = 0 // struggle doesn't count toward recovery
      break
    case 'needed_hint':
      intervalDays = Math.max(1, Math.round(intervalDays * 0.6))
      easeFactor = Math.max(1.3, easeFactor - 0.1)
      memoryScore = Math.max(0, memoryScore - 8)
      consecutiveFails = 0
      cleanStreakAfterFail = 0
      break
    case 'failed':
      consecutiveFails++
      easeFactor = Math.max(1.3, easeFactor - 0.2)
      memoryScore = Math.max(0, memoryScore - 15)
      intervalDays = 0
      cleanStreakAfterFail = 0
      break
  }

  const struggling = consecutiveFails >= 3
  const mastered = memoryScore >= 100

  return { intervalDays, easeFactor, memoryScore, consecutiveFails, struggling, mastered, cleanStreakAfterFail }
}

function localDateString(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getNextReviewDate(intervalDays: number): string {
  const d = new Date()
  d.setDate(d.getDate() + Math.max(0, intervalDays))
  return localDateString(d)
}

export function isOverdue(nextReview: string | null): boolean {
  if (!nextReview) return false
  return nextReview < localDateString()
}

export function isDueToday(nextReview: string | null): boolean {
  if (!nextReview) return false
  return nextReview === localDateString()
}
