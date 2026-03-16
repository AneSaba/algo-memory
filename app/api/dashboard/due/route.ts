import { NextResponse } from 'next/server'
import { loadAllProblems } from '@/packages/core/src/problem-store'
import { isOverdue, isDueToday } from '@/packages/core/src/scheduler'

export async function GET() {
  const problems = loadAllProblems()
  const due = problems
    .filter((p) => isDueToday(p.dates.nextReview) || isOverdue(p.dates.nextReview))
    .map((p) => ({
      id: p.id,
      title: p.title,
      topics: p.topics,
      difficulty: p.difficulty,
      memoryScore: p.spacedRepetition.memoryScore,
      overdue: isOverdue(p.dates.nextReview),
    }))
    .sort((a, b) => a.memoryScore - b.memoryScore)

  return NextResponse.json(due)
}
