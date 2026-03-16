'use client'

type ReviewResult = 'solved_clean' | 'solved_struggle' | 'needed_hint' | 'failed'

interface ReviewActionsProps {
  onSubmit: (result: ReviewResult) => void
  disabled?: boolean
}

export function ReviewActions({ onSubmit, disabled }: ReviewActionsProps) {
  const actions: [ReviewResult, string, string][] = [
    ['solved_clean', 'Solved Clean', 'bg-green-600 hover:bg-green-500'],
    ['solved_struggle', 'Struggled', 'bg-yellow-600 hover:bg-yellow-500'],
    ['needed_hint', 'Needed Hint', 'bg-orange-600 hover:bg-orange-500'],
    ['failed', 'Failed', 'bg-red-700 hover:bg-red-600'],
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map(([result, label, cls]) => (
        <button
          key={result}
          onClick={() => onSubmit(result)}
          disabled={disabled}
          className={`py-3 rounded-md text-white text-sm font-medium transition-colors disabled:opacity-50 ${cls}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
