async function getProblem(id: string) {
  const res = await fetch(`http://localhost:3000/api/problems/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function ProblemDetailPage({ params }: { params: { id: string } }) {
  const problem = await getProblem(params.id)
  if (!problem) return <p className="text-muted-foreground">Problem not found.</p>

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{problem.title}</h1>
        <div className="flex gap-2 mt-2">
          {problem.topics.map((t: string) => (
            <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{t}</span>
          ))}
          <span className="text-xs text-muted-foreground capitalize">· {problem.difficulty}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Memory Score</p>
          <p className="text-2xl font-bold text-primary">{problem.spacedRepetition.memoryScore}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Interval</p>
          <p className="text-2xl font-bold">{problem.spacedRepetition.intervalDays}d</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Reviews</p>
          <p className="text-2xl font-bold">{problem.performance.totalReviews}</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h2 className="font-semibold">Notes</h2>
        <p className="text-sm text-muted-foreground">{problem.notes.summary}</p>

        {problem.notes.recallChecklist.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">Recall Checklist</p>
            <ul className="space-y-1 text-sm">
              {problem.notes.recallChecklist.map((item: string, i: number) => (
                <li key={i} className="flex gap-2"><span className="text-primary">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {problem.notes.commonMistakes.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">Common Mistakes</p>
            <ul className="space-y-1 text-sm">
              {problem.notes.commonMistakes.map((m: string, i: number) => (
                <li key={i} className="flex gap-2"><span className="text-destructive">✗</span>{m}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="font-semibold mb-3">Performance</h2>
        <div className="grid grid-cols-4 gap-3 text-sm text-center">
          <div><p className="text-green-400 font-bold text-lg">{problem.performance.solvedClean}</p><p className="text-muted-foreground">Clean</p></div>
          <div><p className="text-yellow-400 font-bold text-lg">{problem.performance.solvedStruggle}</p><p className="text-muted-foreground">Struggle</p></div>
          <div><p className="text-orange-400 font-bold text-lg">{problem.performance.neededHint}</p><p className="text-muted-foreground">Hint</p></div>
          <div><p className="text-red-400 font-bold text-lg">{problem.performance.failed}</p><p className="text-muted-foreground">Failed</p></div>
        </div>
      </div>
    </div>
  )
}
