'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

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

  useEffect(() => {
    fetch('/api/problems').then((r) => r.json()).then(setProblems)
  }, [])

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
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-accent/30">
                <td className="px-4 py-3">
                  <Link href={`/problems/${p.id}`} className="hover:text-primary transition-colors">{p.title}</Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.topics.join(', ')}</td>
                <td className={`px-4 py-3 capitalize ${difficultyColor(p.difficulty)}`}>{p.difficulty}</td>
                <td className="px-4 py-3">{p.spacedRepetition.memoryScore}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.dates.nextReview ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <p className="text-center text-muted-foreground py-8">No problems found.</p>}
      </div>
    </div>
  )
}
