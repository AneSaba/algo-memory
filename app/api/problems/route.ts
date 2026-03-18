import { NextResponse } from 'next/server'
import { loadAllProblems, saveProblem } from '@/packages/core/src/problem-store'
import { Problem } from '@/packages/core/src/types'
import { commitSolve } from '@/packages/git-client/src/index'

export async function GET() {
  const problems = loadAllProblems()
  return NextResponse.json(problems)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { title, source, sourceId, difficulty, topics, patternTags, notes } = body

  if (!title || !difficulty || !topics?.length) {
    return NextResponse.json({ error: 'title, difficulty, and topics are required' }, { status: 400 })
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const prefix = source === 'LeetCode' && sourceId ? `lc-${String(sourceId).padStart(4, '0')}` : 'custom'
  const id = `${prefix}-${slug}`

  const existing = loadAllProblems()
  if (existing.find((p) => p.id === id || p.slug === slug)) {
    return NextResponse.json({ error: 'Problem already exists' }, { status: 409 })
  }

  const today = new Date().toISOString().split('T')[0]

  const problem: Problem = {
    id,
    title,
    source: source ?? 'Custom',
    sourceId: sourceId ?? undefined,
    slug,
    difficulty,
    topics,
    patternTags: patternTags ?? [],
    languageSolutions: [],
    status: 'learning',
    dates: {
      firstSeen: today,
      firstSolved: today,
      lastReviewed: null,
      nextReview: today,
    },
    spacedRepetition: {
      intervalDays: 1,
      easeFactor: 2.5,
      stability: 0.1,
      memoryScore: 50,
      consecutiveFails: 0,
      struggling: false,
      cleanStreakAfterFail: 0,
    },
    performance: {
      totalReviews: 0,
      solvedClean: 0,
      solvedStruggle: 0,
      neededHint: 0,
      failed: 0,
      avgConfidence: 0,
      avgTimeMinutes: 0,
    },
    notes: {
      summary: notes?.summary ?? '',
      commonMistakes: notes?.commonMistakes ?? [],
      recallChecklist: notes?.recallChecklist ?? [],
      masteryNotes: [],
    },
    links: {
      solutionPath: null,
      notesPath: `problems/${topics[0]}/${slug}.yaml`,
    },
  }

  saveProblem(problem)

  try {
    await commitSolve(slug)
  } catch {
    // git not configured — ok
  }

  return NextResponse.json(problem, { status: 201 })
}
