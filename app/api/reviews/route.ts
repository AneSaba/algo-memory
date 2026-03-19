import { NextResponse } from 'next/server'
import { loadProblem, saveProblem } from '@/packages/core/src/problem-store'
import { updateSchedule, getNextReviewDate } from '@/packages/core/src/scheduler'
import { ReviewResult } from '@/packages/core/src/types'
import { commitReview, getGit } from '@/packages/git-client/src/index'

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
    consecutiveFails: old.consecutiveFails ?? 0,
    cleanStreakAfterFail: old.cleanStreakAfterFail ?? 0,
  })

  problem.spacedRepetition.intervalDays = updated.intervalDays
  problem.spacedRepetition.easeFactor = updated.easeFactor
  problem.spacedRepetition.memoryScore = updated.memoryScore
  problem.spacedRepetition.consecutiveFails = updated.consecutiveFails
  problem.spacedRepetition.struggling = updated.struggling
  problem.spacedRepetition.cleanStreakAfterFail = updated.cleanStreakAfterFail
  problem.dates.lastReviewed = new Date().toISOString().split('T')[0]

  if (updated.mastered) {
    problem.status = 'mastered'
    problem.dates.nextReview = null
  } else {
    problem.dates.nextReview = getNextReviewDate(updated.intervalDays)
  }

  problem.performance.totalReviews++
  if (result === 'solved_clean') problem.performance.solvedClean++
  else if (result === 'solved_struggle') problem.performance.solvedStruggle++
  else if (result === 'needed_hint') problem.performance.neededHint++
  else if (result === 'failed') problem.performance.failed++

  if ((result === 'failed' || result === 'needed_hint') && notes && notes.trim()) {
    problem.notes.commonMistakes = [...problem.notes.commonMistakes, notes.trim()]
  }

  saveProblem(problem)

  let gitCommit: string | undefined
  try {
    gitCommit = await commitReview(problem.slug, result)
    await getGit().push()
  } catch {
    // git not configured yet — ok for local dev
  }

  return NextResponse.json({ success: true, gitCommit, nextReview: problem.dates.nextReview, mastered: updated.mastered })
}
