import { ReviewResult } from './types'

export interface SchedulerUpdate {
  intervalDays: number
  easeFactor: number
  memoryScore: number
}

export function updateSchedule(
  result: ReviewResult,
  current: { intervalDays: number; easeFactor: number; memoryScore: number }
): SchedulerUpdate {
  let { intervalDays, easeFactor, memoryScore } = current

  switch (result) {
    case 'solved_clean':
      intervalDays = Math.max(1, Math.round(intervalDays * 2.0))
      easeFactor = Math.min(2.8, easeFactor + 0.1)
      memoryScore = Math.min(100, memoryScore + 10)
      break
    case 'solved_struggle':
      intervalDays = Math.max(1, Math.round(intervalDays * 1.4))
      memoryScore = Math.min(100, memoryScore + 4)
      break
    case 'needed_hint':
      intervalDays = Math.max(1, Math.round(intervalDays * 0.6))
      easeFactor = Math.max(1.3, easeFactor - 0.1)
      memoryScore = Math.max(0, memoryScore - 8)
      break
    case 'failed':
      intervalDays = 1
      easeFactor = Math.max(1.3, easeFactor - 0.2)
      memoryScore = Math.max(0, memoryScore - 15)
      break
  }

  return { intervalDays, easeFactor, memoryScore }
}

export function getNextReviewDate(intervalDays: number): string {
  const d = new Date()
  d.setDate(d.getDate() + intervalDays)
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
