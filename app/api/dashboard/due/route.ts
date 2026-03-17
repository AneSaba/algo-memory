import { NextResponse } from 'next/server'
import { loadAllProblems } from '@/packages/core/src/problem-store'
import { isOverdue, isDueToday } from '@/packages/core/src/scheduler'

export async function GET() {
  const problems = loadAllProblems()
  const due = problems
    .filter((p) => p.status !== 'mastered' && (isDueToday(p.dates.nextReview) || isOverdue(p.dates.nextReview)))
    .map((p) => ({
      id: p.id,
      title: p.title,
      topics: p.topics,
      difficulty: p.difficulty,
      memoryScore: p.spacedRepetition.memoryScore,
      overdue: isOverdue(p.dates.nextReview),
      struggling: p.spacedRepetition.struggling ?? false,
      consecutiveFails: p.spacedRepetition.consecutiveFails ?? 0,
    }))
    .sort((a, b) => {
      // struggling always first
      if (a.struggling !== b.struggling) return a.struggling ? -1 : 1
      // then overdue
      if (a.overdue !== b.overdue) return a.overdue ? -1 : 1
      // then lowest score
      return a.memoryScore - b.memoryScore
    })

  return NextResponse.json(due)
}
