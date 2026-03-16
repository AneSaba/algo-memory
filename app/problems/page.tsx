'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

type Problem = {
  id: string
  title: string
  topics: string[]
  difficulty: string
  status: string
  spacedRepetition: { memoryScore: number }
  dates: { nextReview: string | null; lastReviewed: string | null }
}

function difficultyColor(d: string) {
  if (d === 'easy') return 'text-green-400'
  if (d === 'medium') return 'text-yellow-400'
  return 'text-red-400'
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [search, setSearch] = useState('')
  const [topicFilter, setTopicFilter] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  function load() {
    fetch('/api/problems').then((r) => r.json()).then(setProblems)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string) {
    setDeleting(id)
    await fetch(`/api/problems/${id}`, { method: 'DELETE' })
    setDeleting(null)
    setConfirmId(null)
    load()
  }

  const topics = [...new Set(problems.flatMap((p) => p.topics))].sort()
  const filtered = problems.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchTopic = !topicFilter || p.topics.includes(topicFilter)
    return matchSearch && matchTopic
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Problems</h1>
        <p className="text-muted-foreground text-sm mt-1">{problems.length} problems tracked</p>
      </div>

      <div className="flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems..."
          className="flex-1 bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none"
        >
          <option value="">All topics</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Topics</th>
              <th className="text-left px-4 py-3 font-medium">Difficulty</th>
              <th className="text-left px-4 py-3 font-medium">Score</th>
              <th className="text-left px-4 py-3 font-medium">Next Review</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-accent/30 group">
                <td className="px-4 py-3">
                  <Link href={`/problems/${p.id}`} className="hover:text-primary transition-colors">{p.title}</Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.topics.join(', ')}</td>
                <td className={`px-4 py-3 capitalize ${difficultyColor(p.difficulty)}`}>{p.difficulty}</td>
                <td className="px-4 py-3">{p.spacedRepetition.memoryScore}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.dates.nextReview ?? '—'}</td>
                <td className="px-4 py-3 text-right">
                  {confirmId === p.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-muted-foreground">Remove?</span>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deleting === p.id}
                        className="text-xs text-destructive hover:underline disabled:opacity-50"
                      >
                        {deleting === p.id ? 'Removing...' : 'Yes'}
                      </button>
                      <button onClick={() => setConfirmId(null)} className="text-xs text-muted-foreground hover:underline">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(p.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      title="Remove problem"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <p className="text-center text-muted-foreground py-8">No problems found.</p>}
      </div>
    </div>
  )
}
