import { NextResponse } from 'next/server'
import { loadAllProblems } from '@/packages/core/src/problem-store'
import { isOverdue, isDueToday } from '@/packages/core/src/scheduler'

export async function GET() {
  const problems = loadAllProblems()
  const today = new Date().toISOString().split('T')[0]

  let dueToday = 0
  let overdue = 0
  let totalReviews = 0
  let weightedCorrect = 0
  let totalScore = 0

  for (const p of problems) {
    const nr = p.dates.nextReview
    if (isDueToday(nr)) dueToday++
    else if (isOverdue(nr)) overdue++

    const perf = p.performance
    const reviews = perf.totalReviews
    if (reviews > 0) {
      totalReviews += reviews
      weightedCorrect +=
        perf.solvedClean * 1.0 +
        perf.solvedStruggle * 0.7 +
        perf.neededHint * 0.3
    }
    totalScore += p.spacedRepetition.memoryScore
  }

  const retentionRate = totalReviews > 0 ? Math.round((weightedCorrect / totalReviews) * 100) : 0
  const avgMemoryScore = problems.length > 0 ? Math.round(totalScore / problems.length) : 0

  return NextResponse.json({
    dueToday,
    overdue,
    retentionRate,
    currentStreak: 0, // TODO: implement streak from review history
    totalSolved: problems.filter((p) => p.dates.firstSolved).length,
    avgMemoryScore,
  })
}
