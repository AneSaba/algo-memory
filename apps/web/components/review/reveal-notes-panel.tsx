'use client'

interface RevealNotesPanelProps {
  summary: string
  recallChecklist: string[]
  commonMistakes: string[]
  revealed: boolean
  onReveal: () => void
}

export function RevealNotesPanel({
  summary,
  recallChecklist,
  commonMistakes,
  revealed,
  onReveal,
}: RevealNotesPanelProps) {
  if (!revealed) {
    return (
      <button
        onClick={onReveal}
        className="w-full py-3 rounded-md border border-primary/50 text-primary text-sm hover:bg-primary/10 transition-colors"
      >
        Reveal Notes
      </button>
    )
  }

  return (
    <div className="space-y-3 text-sm">
      <p className="text-muted-foreground">{summary}</p>

      {recallChecklist.length > 0 && (
        <div>
          <p className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-1">Checklist</p>
          <ul className="space-y-1">
            {recallChecklist.map((item, i) => (
              <li key={i} className="flex gap-2 text-foreground/80">
                <span className="text-primary">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {commonMistakes.length > 0 && (
        <div>
          <p className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-1">Common Mistakes</p>
          <ul className="space-y-1">
            {commonMistakes.map((m, i) => (
              <li key={i} className="flex gap-2 text-foreground/80">
                <span className="text-destructive">✗</span> {m}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
