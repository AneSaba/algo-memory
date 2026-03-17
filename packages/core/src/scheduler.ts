import { ReviewResult } from './types'

export interface SchedulerUpdate {
  intervalDays: number
  easeFactor: number
  memoryScore: number
  consecutiveFails: number
  struggling: boolean
}

export function updateSchedule(
  result: ReviewResult,
  current: { intervalDays: number; easeFactor: number; memoryScore: number; consecutiveFails?: number }
): SchedulerUpdate {
  let { intervalDays, easeFactor, memoryScore } = current
  let consecutiveFails = current.consecutiveFails ?? 0

  switch (result) {
    case 'solved_clean':
      intervalDays = Math.max(1, Math.round(intervalDays * 2.0))
      easeFactor = Math.min(2.8, easeFactor + 0.1)
      memoryScore = Math.min(100, memoryScore + 10)
      consecutiveFails = 0
      break
    case 'solved_struggle':
      intervalDays = Math.max(1, Math.round(intervalDays * 1.4))
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
      // 1st fail → tomorrow, 2nd fail → same day, 3rd+ → pinned (interval 0 = today)
      if (consecutiveFails === 1) intervalDays = 1
      else if (consecutiveFails === 2) intervalDays = 0
      else intervalDays = 0
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
