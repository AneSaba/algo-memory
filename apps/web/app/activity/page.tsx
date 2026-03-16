'use client'
import { useEffect, useState } from 'react'

type CommitEntry = {
  hash: string
  message: string
  date: string
  author_name: string
}

export default function ActivityPage() {
  const [commits, setCommits] = useState<CommitEntry[]>([])
  const [configured, setConfigured] = useState(true)

  useEffect(() => {
    fetch('/api/git/commit')
      .then((r) => r.json())
      .then((data) => {
        setConfigured(data.configured)
        setCommits(data.commits ?? [])
      })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Activity</h1>
        <p className="text-muted-foreground text-sm mt-1">Git-backed review history</p>
      </div>

      {!configured && (
        <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
          Git not configured for the data directory. Set ALGO_DATA_DIR to a git repo to track history.
        </div>
      )}

      <div className="rounded-lg border border-border bg-card divide-y divide-border">
        {commits.length === 0 && (
          <p className="text-muted-foreground text-sm p-4">No commits yet.</p>
        )}
        {commits.map((c) => (
          <div key={c.hash} className="flex items-start gap-3 p-4">
            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">{c.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{new Date(c.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
