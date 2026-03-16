import { StatCard } from '@/apps/web/components/dashboard/stat-card'
import { DueQueueTable } from '@/apps/web/components/dashboard/due-queue-table'
import { RetentionLineChart } from '@/apps/web/components/dashboard/retention-line-chart'
import { WeakestTopicsTable } from '@/apps/web/components/dashboard/weakest-topics-table'

async function getSummary() {
  try {
    const res = await fetch('http://localhost:3000/api/dashboard/summary', { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getDue() {
  try {
    const res = await fetch('http://localhost:3000/api/dashboard/due', { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

async function getTopics() {
  try {
    const res = await fetch('http://localhost:3000/api/dashboard/topics', { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

async function getRetention() {
  try {
    const res = await fetch('http://localhost:3000/api/dashboard/retention', { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function DashboardPage() {
  const [summary, due, topics, retention] = await Promise.all([
    getSummary(),
    getDue(),
    getTopics(),
    getRetention(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Your algorithm retention overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard title="Due Today" value={summary?.dueToday ?? 0} highlight />
        <StatCard title="Overdue" value={summary?.overdue ?? 0} />
        <StatCard title="Retention" value={`${summary?.retentionRate ?? 0}%`} />
        <StatCard title="Streak" value={`${summary?.currentStreak ?? 0}d`} />
        <StatCard title="Total Solved" value={summary?.totalSolved ?? 0} />
        <StatCard title="Avg Score" value={summary?.avgMemoryScore ?? 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="text-sm font-semibold mb-3">Due Today</h2>
          <DueQueueTable problems={due} />
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="text-sm font-semibold mb-3">Retention Over Time</h2>
          <RetentionLineChart data={retention} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-semibold mb-3">Topic Health</h2>
        <WeakestTopicsTable topics={topics} />
      </div>
    </div>
  )
}
