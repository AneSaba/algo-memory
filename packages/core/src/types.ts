export type Difficulty = 'easy' | 'medium' | 'hard'
export type ReviewResult = 'solved_clean' | 'solved_struggle' | 'needed_hint' | 'failed'
export type ProblemStatus = 'learning' | 'reviewing' | 'mastered' | 'forgotten'

export interface Problem {
  id: string
  title: string
  source: string
  sourceId?: number
  slug: string
  difficulty: Difficulty
  topics: string[]
  patternTags: string[]
  languageSolutions: string[]
  status: ProblemStatus
  dates: {
    firstSeen: string
    firstSolved: string | null
    lastReviewed: string | null
    nextReview: string | null
  }
  spacedRepetition: {
    intervalDays: number
    easeFactor: number
    stability: number
    memoryScore: number
  }
  performance: {
    totalReviews: number
    solvedClean: number
    solvedStruggle: number
    neededHint: number
    failed: number
    avgConfidence: number
    avgTimeMinutes: number
  }
  notes: {
    summary: string
    commonMistakes: string[]
    recallChecklist: string[]
    masteryNotes: string[]
  }
  links: {
    solutionPath: string | null
    notesPath: string
  }
}

export interface ReviewEvent {
  reviewId: string
  problemId: string
  reviewedAt: string
  result: ReviewResult
  confidence: number
  timeMinutes: number
  topicTags: string[]
  notes: string
  oldIntervalDays: number
  newIntervalDays: number
  oldMemoryScore: number
  newMemoryScore: number
  gitCommit?: string
}

export interface DashboardSummary {
  dueToday: number
  overdue: number
  retentionRate: number
  currentStreak: number
  totalSolved: number
  avgMemoryScore: number
}
