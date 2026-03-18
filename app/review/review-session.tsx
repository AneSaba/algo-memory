'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Problem = {
  id: string
  title: string
  topics: string[]
  difficulty: string
  source: string
  sourceId?: number
  slug: string
  notes: { summary: string; recallChecklist: string[]; commonMistakes: string[] }
  spacedRepetition: { memoryScore: number; intervalDays: number; struggling?: boolean; consecutiveFails?: number }
}

type ReviewResult = 'solved_clean' | 'solved_struggle' | 'needed_hint' | 'failed'

export function ReviewSession() {
  const [queue, setQueue] = useState<Problem[]>([])
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [justMastered, setJustMastered] = useState<string | null>(null)
  const [failNote, setFailNote] = useState('')
  const [showFailNote, setShowFailNote] = useState(false)
  const [pendingResult, setPendingResult] = useState<ReviewResult | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/due')
      .then((r) => r.json())
      .then((due: { id: string }[]) => {
        if (!due.length) { setDone(true); return }
        Promise.all(due.map((d) => fetch(`/api/problems/${d.id}`).then((r) => r.json()))).then(setQueue)
      })
  }, [])

  const problem = queue[current]

  async function submitResult(result: ReviewResult, note = '') {
    if (!problem || submitting) return
    setSubmitting(true)
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemId: problem.id, result, confidence: 3, timeMinutes: 20, notes: note }),
    })
    const data = await res.json()
    setSubmitting(false)
    setRevealed(false)
    setShowFailNote(false)
    setFailNote('')
    setPendingResult(null)
    if (data.mastered) {
      setJustMastered(problem.title)
      setTimeout(() => {
        setJustMastered(null)
        if (current + 1 >= queue.length) setDone(true)
        else setCurrent((c) => c + 1)
      }, 2500)
    } else {
      if (current + 1 >= queue.length) setDone(true)
      else setCurrent((c) => c + 1)
    }
  }

  function handleResultClick(result: ReviewResult) {
    if (result === 'failed') {
      setPendingResult('failed')
      setShowFailNote(true)
    } else {
      submitResult(result)
    }
  }

  if (done) return (
    <div className="rounded-lg border border-border bg-card p-8 text-center">
      <p className="text-xl font-semibold text-primary">All caught up!</p>
      <p className="text-muted-foreground mt-2">No more problems due. Come back tomorrow.</p>
      <Link href="/" className="mt-4 inline-block text-sm text-primary hover:underline">Back to dashboard</Link>
    </div>
  )

  if (justMastered) return (
    <div className="rounded-lg border border-primary/40 bg-primary/5 p-10 text-center space-y-2">
      <p className="text-3xl">🎓</p>
      <p className="text-xl font-bold text-primary">Mastered!</p>
      <p className="text-muted-foreground text-sm">{justMastered} has been removed from your review queue.</p>
    </div>
  )

  if (!problem) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div className="max-w-2xl space-y-4">
      <div className="rounded-lg border border-border bg-card p-6 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{problem.title}</h2>
              {problem.sourceId && (
                <a
                  href={`https://leetcode.com/problems/${problem.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  Open ↗
                </a>
              )}
              {problem.spacedRepetition.struggling && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/15 text-red-400 border border-destructive/30">Struggling</span>
              )}
            </div>
            <div className="flex gap-2 mt-1">
              {problem.topics.map((t) => (
                <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{t}</span>
              ))}
              <span className="text-xs text-muted-foreground capitalize">· {problem.difficulty}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => { setCurrent((c) => c - 1); setRevealed(false); setShowFailNote(false); setFailNote('') }}
              disabled={current === 0}
              className="px-2 py-0.5 rounded border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              ‹
            </button>
            <span className="text-sm text-muted-foreground">{current + 1} / {queue.length}</span>
            <button
              onClick={() => { setCurrent((c) => c + 1); setRevealed(false); setShowFailNote(false); setFailNote('') }}
              disabled={current === queue.length - 1}
              className="px-2 py-0.5 rounded border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              ›
            </button>
          </div>
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

      {/* Fail note panel */}
      {showFailNote && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 space-y-3">
          <p className="text-sm font-medium text-red-400">What tripped you up? (optional)</p>
          <textarea
            value={failNote}
            onChange={(e) => setFailNote(e.target.value)}
            rows={3}
            autoFocus
            placeholder="e.g. Forgot to handle edge case, blanked on the approach..."
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-destructive resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => submitResult('failed', failNote)}
              disabled={submitting}
              className="flex-1 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Submit'}
            </button>
            <button
              onClick={() => submitResult('failed', '')}
              disabled={submitting}
              className="px-4 py-2 rounded-md border border-border text-sm hover:bg-accent transition-colors disabled:opacity-50"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Result buttons — hidden while fail note is open */}
      {!showFailNote && (
        <div className="grid grid-cols-2 gap-3">
          {([
            ['solved_clean', 'Solved Clean', 'bg-green-600 hover:bg-green-500'],
            ['solved_struggle', 'Struggled', 'bg-yellow-600 hover:bg-yellow-500'],
            ['needed_hint', 'Needed Hint', 'bg-orange-600 hover:bg-orange-500'],
            ['failed', 'Failed', 'bg-red-700 hover:bg-red-600'],
          ] as [ReviewResult, string, string][]).map(([result, label, cls]) => (
            <button
              key={result}
              onClick={() => handleResultClick(result)}
              disabled={submitting}
              className={`py-3 rounded-md text-white text-sm font-medium transition-colors disabled:opacity-50 ${cls}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
