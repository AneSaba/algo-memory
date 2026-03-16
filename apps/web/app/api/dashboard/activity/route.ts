import { NextResponse } from 'next/server'
import { loadAllReviews } from '@core/review-store'

export async function GET() {
  const reviews = loadAllReviews()

  // Build a map of date -> review count
  const activityMap: Record<string, number> = {}
  for (const r of reviews) {
    const date = r.reviewedAt.split('T')[0]
    activityMap[date] = (activityMap[date] ?? 0) + 1
  }

  const result = Object.entries(activityMap).map(([date, count]) => ({ date, count }))
  result.sort((a, b) => a.date.localeCompare(b.date))

  return NextResponse.json(result)
}
