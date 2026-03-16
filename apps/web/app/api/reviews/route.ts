import { NextResponse } from 'next/server'
import { loadProblem, saveProblem } from '@core/problem-store'
import { updateSchedule, getNextReviewDate } from '@core/scheduler'
import { ReviewResult } from '@core/types'
import { commitReview } from '@git-client/index'

export async function POST(req: Request) {
  const body = await req.json()
  const { problemId, result, confidence, timeMinutes, notes } = body as {
    problemId: string
    result: ReviewResult
    confidence: number
    timeMinutes: number
    notes: string
  }

  const problem = loadProblem(problemId)
  if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404 })

  const old = problem.spacedRepetition
  const updated = updateSchedule(result, {
    intervalDays: old.intervalDays,
    easeFactor: old.easeFactor,
    memoryScore: old.memoryScore,
  })

  problem.spacedRepetition.intervalDays = updated.intervalDays
  problem.spacedRepetition.easeFactor = updated.easeFactor
  problem.spacedRepetition.memoryScore = updated.memoryScore
  problem.dates.lastReviewed = new Date().toISOString().split('T')[0]
  problem.dates.nextReview = getNextReviewDate(updated.intervalDays)

  problem.performance.totalReviews++
  if (result === 'solved_clean') problem.performance.solvedClean++
  else if (result === 'solved_struggle') problem.performance.solvedStruggle++
  else if (result === 'needed_hint') problem.performance.neededHint++
  else if (result === 'failed') problem.performance.failed++

  saveProblem(problem)

  let gitCommit: string | undefined
  try {
    gitCommit = await commitReview(problem.slug, result)
  } catch {
    // git not configured yet — ok for local dev
  }

  return NextResponse.json({ success: true, gitCommit, nextReview: problem.dates.nextReview })
}
