'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Problem = {
  id: string
  title: string
  topics: string[]
  difficulty: string
  notes: { summary: string; recallChecklist: string[]; commonMistakes: string[] }
  spacedRepetition: { memoryScore: number; intervalDays: number }
}

type ReviewResult = 'solved_clean' | 'solved_struggle' | 'needed_hint' | 'failed'

export function ReviewSession() {
  const [queue, setQueue] = useState<Problem[]>([])
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/dashboard/due')
      .then((r) => r.json())
      .then((due: { id: string }[]) => {
        if (!due.length) { setDone(true); return }
        Promise.all(due.map((d) => fetch(`/api/problems/${d.id}`).then((r) => r.json()))).then(setQueue)
      })
  }, [])

  const problem = queue[current]

  async function submitResult(result: ReviewResult) {
    if (!problem || submitting) return
    setSubmitting(true)
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemId: problem.id, result, confidence: 3, timeMinutes: 20, notes: '' }),
    })
    setSubmitting(false)
    setRevealed(false)
    if (current + 1 >= queue.length) setDone(true)
    else setCurrent((c) => c + 1)
  }

  if (done) return (
    <div className="rounded-lg border border-border bg-card p-8 text-center">
      <p className="text-xl font-semibold text-primary">All caught up!</p>
      <p className="text-muted-foreground mt-2">No more problems due. Come back tomorrow.</p>
      <Link href="/" className="mt-4 inline-block text-sm text-primary hover:underline">Back to dashboard</Link>
    </div>
  )

  if (!problem) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div className="max-w-2xl space-y-4">
      <div className="rounded-lg border border-border bg-card p-6 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{problem.title}</h2>
            <div className="flex gap-2 mt-1">
              {problem.topics.map((t) => (
                <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{t}</span>
              ))}
              <span className="text-xs text-muted-foreground capitalize">· {problem.difficulty}</span>
            </div>
          </div>
          <span className="text-sm text-muted-foreground shrink-0">{current + 1} / {queue.length}</span>
        </div>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-3 rounded-md border border-primary/50 text-primary text-sm hover:bg-primary/10 transition-colors"
          >
            Reveal Notes
          </button>
        ) : (
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">{problem.notes.summary}</p>
            {problem.notes.recallChecklist.length > 0 && (
              <div>
                <p className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-1">Checklist</p>
                <ul className="space-y-1">
                  {problem.notes.recallChecklist.map((item, i) => (
                    <li key={i} className="flex gap-2 text-foreground/80">
                      <span className="text-primary">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {problem.notes.commonMistakes.length > 0 && (
              <div>
                <p className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-1">Common Mistakes</p>
                <ul className="space-y-1">
                  {problem.notes.commonMistakes.map((m, i) => (
                    <li key={i} className="flex gap-2 text-foreground/80">
                      <span className="text-destructive">✗</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {([
          ['solved_clean', 'Solved Clean', 'bg-green-600 hover:bg-green-500'],
          ['solved_struggle', 'Struggled', 'bg-yellow-600 hover:bg-yellow-500'],
          ['needed_hint', 'Needed Hint', 'bg-orange-600 hover:bg-orange-500'],
          ['failed', 'Failed', 'bg-red-700 hover:bg-red-600'],
        ] as [ReviewResult, string, string][]).map(([result, label, cls]) => (
          <button
            key={result}
            onClick={() => submitResult(result)}
            disabled={submitting}
            className={`py-3 rounded-md text-white text-sm font-medium transition-colors disabled:opacity-50 ${cls}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
