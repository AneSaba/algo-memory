'use client'
import { useEffect, useState } from 'react'
import { RetentionLineChart } from '@/components/dashboard/retention-line-chart'
import { WeakestTopicsTable } from '@/components/dashboard/weakest-topics-table'
import { StatCard } from '@/components/dashboard/stat-card'
import { cn } from '@/lib/utils'

function diffColor(d: string) {
  if (d === 'easy') return 'text-green-400'
  if (d === 'medium') return 'text-yellow-400'
  return 'text-red-400'
}

function scoreColor(s: number) {
  if (s >= 80) return 'text-green-400'
  if (s >= 60) return 'text-yellow-400'
  if (s >= 40) return 'text-orange-400'
  return 'text-red-400'
}

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<any>(null)
  const [due, setDue] = useState<any[]>([])
  const [topics, setTopics] = useState<any[]>([])
  const [retention, setRetention] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard/summary').then((r) => r.json()).catch(() => null),
      fetch('/api/dashboard/due').then((r) => r.json()).catch(() => []),
      fetch('/api/dashboard/topics').then((r) => r.json()).catch(() => []),
      fetch('/api/dashboard/retention').then((r) => r.json()).catch(() => []),
    ]).then(([s, d, t, r]) => {
      setSummary(s)
      setDue(d)
      setTopics(t)
      setRetention(r)
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Your retention and progress overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard title="Due Today" value={summary?.dueToday ?? 0} highlight />
        <StatCard title="Overdue" value={summary?.overdue ?? 0} />
        <StatCard title="Retention" value={`${summary?.retentionRate ?? 0}%`} />
        <StatCard title="Streak" value={`${summary?.currentStreak ?? 0}d`} />
        <StatCard title="Total Solved" value={summary?.totalSolved ?? 0} />
        <StatCard title="Avg Score" value={summary?.avgMemoryScore ?? 0} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="text-sm font-semibold mb-3">Retention Over Time</h2>
          <RetentionLineChart data={retention} />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="text-sm font-semibold mb-3">Due Queue</h2>
          {due.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nothing due.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 pr-4 font-medium">Problem</th>
                  <th className="text-left py-2 pr-4 font-medium">Difficulty</th>
                  <th className="text-left py-2 font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {due.map((p) => (
                  <tr key={p.id} className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      {p.title}
                      {p.overdue && <span className="ml-2 text-xs text-destructive">overdue</span>}
                    </td>
                    <td className={cn('py-2 pr-4 capitalize', diffColor(p.difficulty))}>{p.difficulty}</td>
                    <td className={cn('py-2 font-mono', scoreColor(p.memoryScore))}>{p.memoryScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Topic health */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-semibold mb-3">Topic Health</h2>
        <WeakestTopicsTable topics={topics} />
      </div>
    </div>
  )
}
