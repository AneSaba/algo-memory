'use client'
import Link from 'next/link'

interface Problem {
  id: string
  title: string
  topics: string[]
  difficulty: string
  status: string
  spacedRepetition: { memoryScore: number }
  dates: { nextReview: string | null; lastReviewed: string | null }
}

function difficultyColor(d: string) {
  if (d === 'easy') return 'text-green-400'
  if (d === 'medium') return 'text-yellow-400'
  return 'text-red-400'
}

export function ProblemTable({ problems }: { problems: Problem[] }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="text-left px-4 py-3 font-medium">Title</th>
            <th className="text-left px-4 py-3 font-medium">Topics</th>
            <th className="text-left px-4 py-3 font-medium">Difficulty</th>
            <th className="text-left px-4 py-3 font-medium">Score</th>
            <th className="text-left px-4 py-3 font-medium">Next Review</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p.id} className="border-b border-border/50 hover:bg-accent/30">
              <td className="px-4 py-3">
                <Link href={`/problems/${p.id}`} className="hover:text-primary transition-colors">
                  {p.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{p.topics.join(', ')}</td>
              <td className={`px-4 py-3 capitalize ${difficultyColor(p.difficulty)}`}>{p.difficulty}</td>
              <td className="px-4 py-3">{p.spacedRepetition.memoryScore}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.dates.nextReview ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!problems.length && (
        <p className="text-center text-muted-foreground py-8">No problems found.</p>
      )}
    </div>
  )
}
