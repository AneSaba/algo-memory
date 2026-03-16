import { Problem } from './types'
import { NEETCODE_150, PATTERN_ORDER } from './neetcode-150'

export type ReasonTag =
  | 'weak-topic'
  | 'new-pattern'
  | 'pattern-building'
  | 'custom'

export interface Recommendation {
  ncProblem: NCProblem
  score: number
  reasons: ReasonTag[]
  reasonText: string
}

interface PatternStats {
  solved: number
  avgScore: number
  failRate: number
}

function buildPatternStats(problems: Problem[]): Record<string, PatternStats> {
  const stats: Record<string, PatternStats> = {}

  for (const p of problems) {
    for (const tag of p.patternTags ?? []) {
      if (!stats[tag]) stats[tag] = { solved: 0, avgScore: 0, failRate: 0 }
    }
    // also use topics as a proxy for patterns
    for (const t of p.topics) {
      if (!stats[t]) stats[t] = { solved: 0, avgScore: 0, failRate: 0 }
      stats[t].solved++
      stats[t].avgScore += p.spacedRepetition.memoryScore
      const total = p.performance.totalReviews
      if (total > 0) stats[t].failRate += p.performance.failed / total
    }
  }

  for (const key of Object.keys(stats)) {
    if (stats[key].solved > 0) {
      stats[key].avgScore = Math.round(stats[key].avgScore / stats[key].solved)
      stats[key].failRate = Math.round((stats[key].failRate / stats[key].solved) * 100)
    }
  }

  return stats
}

function patternCompletionRate(pattern: string, trackedIds: Set<string>): number {
  const inPattern = NEETCODE_150.filter((p) => p.pattern === pattern)
  if (!inPattern.length) return 0
  const done = inPattern.filter((p) => trackedIds.has(p.lcId.toString()) || trackedIds.has(p.id))
  return done.length / inPattern.length
}

function getPrerequisitePatternCompletion(patternIndex: number, trackedIds: Set<string>): number {
  if (patternIndex === 0) return 1
  // Require ~50% of the previous pattern before recommending this one
  const prevPattern = PATTERN_ORDER[patternIndex - 1]
  return patternCompletionRate(prevPattern, trackedIds)
}

export function getRecommendations(
  problems: Problem[],
  limit = 15
): Recommendation[] {
  const recommendations: Recommendation[] = []
  const patternStats = buildPatternStats(problems)

  // Build set of tracked lcIds from problems loaded via git/YAML
  const trackedIds = new Set<string>()
  for (const p of problems) {
    if (p.sourceId) trackedIds.add(p.sourceId.toString())
    const match = p.id.match(/^lc-(\d+)/)
    if (match) trackedIds.add(parseInt(match[1], 10).toString())
  }

  // Only suggest NeetCode 150 problems not yet tracked
  for (const nc of NEETCODE_150) {
    if (trackedIds.has(nc.lcId.toString())) continue

    let score = 0
    const reasons: ReasonTag[] = []
    const reasonParts: string[] = []

    // Check prerequisite pattern completion
    const prereqCompletion = getPrerequisitePatternCompletion(nc.patternIndex, trackedIds)
    if (prereqCompletion < 0.3 && nc.patternIndex > 0) continue // pattern not ready yet

    // Pattern completion rate — prefer completing started patterns
    const patternCompletion = patternCompletionRate(nc.pattern, trackedIds)

    if (patternCompletion === 0) {
      // Brand new pattern — recommend only first 1-2 problems
      if (nc.patternOrder <= 2) {
        score += 55
        reasons.push('new-pattern')
        reasonParts.push(`New pattern: ${nc.pattern}`)
      } else {
        continue
      }
    } else if (patternCompletion < 0.8) {
      // Pattern in progress — score by order
      score += 60 - nc.patternOrder * 2
      reasons.push('pattern-building')
      reasonParts.push(`Continue ${nc.pattern} (${Math.round(patternCompletion * 100)}% done)`)
    }

    // Boost for weak topics
    for (const topic of nc.topics) {
      const ts = patternStats[topic]
      if (ts && ts.avgScore < 55) {
        score += 15
        if (!reasons.includes('weak-topic')) {
          reasons.push('weak-topic')
          reasonParts.push(`Weak area: ${topic}`)
        }
      }
    }

    // Difficulty modifier — prefer easy/medium when starting a pattern
    if (nc.difficulty === 'easy') score += 10
    else if (nc.difficulty === 'hard') score -= 5

    if (score <= 0) continue

    recommendations.push({
      ncProblem: nc,
      score,
      reasons,
      reasonText: reasonParts.slice(0, 2).join(' · ') || `Next in ${nc.pattern}`,
    })
  }

  // Sort by score descending, deduplicate
  recommendations.sort((a, b) => b.score - a.score)

  return recommendations.slice(0, limit)
}
