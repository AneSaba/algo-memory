import { NextResponse } from 'next/server'
import { loadAllProblems, saveProblem } from '@/packages/core/src/problem-store'
import { NEETCODE_150 } from '@/packages/core/src/neetcode-150'
import { Problem } from '@/packages/core/src/types'
import { commitSolve } from '@/packages/git-client/src/index'

export async function POST() {
  const existing = loadAllProblems()

  const trackedIds = new Set<string>()
  for (const p of existing) {
    if (p.sourceId) trackedIds.add(p.sourceId.toString())
    const match = p.id.match(/^lc-(\d+)/)
    if (match) trackedIds.add(parseInt(match[1], 10).toString())
  }

  const untracked = NEETCODE_150.filter((nc) => !trackedIds.has(nc.lcId.toString()))
  if (!untracked.length) {
    return NextResponse.json({ error: 'All NeetCode 150 problems are already tracked' }, { status: 400 })
  }

  const nc = untracked[Math.floor(Math.random() * untracked.length)]

  const slug = nc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const id = `lc-${String(nc.lcId).padStart(4, '0')}-${slug}`
  const today = new Date().toISOString().split('T')[0]

  const problem: Problem = {
    id,
    title: nc.title,
    source: 'LeetCode',
    sourceId: nc.lcId,
    slug,
    difficulty: nc.difficulty,
    topics: nc.topics,
    patternTags: [nc.pattern],
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
      summary: '',
      commonMistakes: [],
      recallChecklist: [],
      masteryNotes: [],
    },
    links: {
      solutionPath: null,
      notesPath: `problems/${nc.topics[0]}/${slug}.yaml`,
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
