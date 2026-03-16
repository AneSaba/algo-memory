interface TopicHealth {
  topic: string
  total: number
  avgScore: number
  failRate: number
  overdue: number
}

function scoreColor(score: number) {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-yellow-400'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

export function TopicSummaryCard({ topic, total, avgScore, failRate, overdue }: TopicHealth) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold capitalize">{topic}</h3>
        <span className={`text-2xl font-bold ${scoreColor(avgScore)}`}>{avgScore}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs text-center">
        <div>
          <p className="text-muted-foreground">Problems</p>
          <p className="font-semibold mt-1">{total}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Fail Rate</p>
          <p className="font-semibold mt-1">{failRate}%</p>
        </div>
        <div>
          <p className="text-muted-foreground">Overdue</p>
          <p className={`font-semibold mt-1 ${overdue > 0 ? 'text-destructive' : ''}`}>{overdue}</p>
        </div>
      </div>
    </div>
  )
}
