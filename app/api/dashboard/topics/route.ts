import { NextResponse } from 'next/server'
import { loadAllProblems } from '@/packages/core/src/problem-store'
import { isOverdue } from '@/packages/core/src/scheduler'

export async function GET() {
  const problems = loadAllProblems()
  const topicMap: Record<string, { total: number; scoreSum: number; failCount: number; reviewCount: number; overdue: number }> = {}

  for (const p of problems) {
    for (const topic of p.topics) {
      if (!topicMap[topic]) topicMap[topic] = { total: 0, scoreSum: 0, failCount: 0, reviewCount: 0, overdue: 0 }
      const t = topicMap[topic]
      t.total++
      t.scoreSum += p.spacedRepetition.memoryScore
      t.failCount += p.performance.failed
      t.reviewCount += p.performance.totalReviews
      if (isOverdue(p.dates.nextReview)) t.overdue++
    }
  }

  const result = Object.entries(topicMap).map(([topic, t]) => ({
    topic,
    total: t.total,
    avgScore: t.total > 0 ? Math.round(t.scoreSum / t.total) : 0,
    failRate: t.reviewCount > 0 ? Math.round((t.failCount / t.reviewCount) * 100) : 0,
    overdue: t.overdue,
  }))

  return NextResponse.json(result)
}
