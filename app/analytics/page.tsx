'use client'
import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { RetentionLineChart } from '@/components/dashboard/retention-line-chart'
import { WeakestTopicsTable } from '@/components/dashboard/weakest-topics-table'
import { StatCard } from '@/components/dashboard/stat-card'
import { cn } from '@/lib/utils'

const BUCKETS = [
  { label: '0–20', min: 0, max: 20, color: '#ef4444' },
  { label: '21–40', min: 21, max: 40, color: '#f97316' },
  { label: '41–60', min: 41, max: 60, color: '#eab308' },
  { label: '61–80', min: 61, max: 80, color: '#84cc16' },
  { label: '81–99', min: 81, max: 99, color: '#22c55e' },
  { label: 'Mastered', min: 100, max: 100, color: '#a78bfa' },
]

function buildDistribution(problems: any[]) {
  return BUCKETS.map((b) => ({
    label: b.label,
    count: problems.filter((p) =>
      p.status === 'mastered'
        ? b.label === 'Mastered'
        : p.spacedRepetition.memoryScore >= b.min && p.spacedRepetition.memoryScore <= b.max
    ).length,
    color: b.color,
  }))
}

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
  const [problems, setProblems] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard/summary').then((r) => r.json()).catch(() => null),
      fetch('/api/dashboard/due').then((r) => r.json()).catch(() => []),
      fetch('/api/dashboard/topics').then((r) => r.json()).catch(() => []),
      fetch('/api/dashboard/retention').then((r) => r.json()).catch(() => []),
      fetch('/api/problems').then((r) => r.json()).catch(() => []),
    ]).then(([s, d, t, r, p]) => {
      setSummary(s)
      setDue(d)
      setTopics(t)
      setRetention(r)
      setProblems(p)
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

      {/* Score distribution */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-semibold mb-3">Score Distribution</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={buildDistribution(problems)} barCategoryGap="30%">
            <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={24} />
            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} formatter={(v: any) => [v, 'Problems']} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {buildDistribution(problems).map((b, i) => (
                <Cell key={i} fill={b.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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
