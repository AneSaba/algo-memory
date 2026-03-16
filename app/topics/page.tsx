'use client'
import { useEffect, useState } from 'react'

type TopicHealth = {
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

export default function TopicsPage() {
  const [topics, setTopics] = useState<TopicHealth[]>([])
  useEffect(() => {
    fetch('/api/dashboard/topics').then((r) => r.json()).then(setTopics)
  }, [])

  const sorted = [...topics].sort((a, b) => a.avgScore - b.avgScore)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Topics</h1>
        <p className="text-muted-foreground text-sm mt-1">Health overview by topic</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((t) => (
          <div key={t.topic} className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold capitalize">{t.topic}</h3>
              <span className={`text-2xl font-bold ${scoreColor(t.avgScore)}`}>{t.avgScore}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div>
                <p className="text-muted-foreground">Problems</p>
                <p className="font-semibold mt-1">{t.total}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Fail Rate</p>
                <p className="font-semibold mt-1">{t.failRate}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Overdue</p>
                <p className={`font-semibold mt-1 ${t.overdue > 0 ? 'text-destructive' : ''}`}>{t.overdue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
