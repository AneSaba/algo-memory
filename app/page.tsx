'use client'
import { useEffect, useState } from 'react'
import { Plus, ExternalLink, RefreshCw, Shuffle } from 'lucide-react'
import { cn } from '@/lib/utils'

type ReasonTag = 'weak-topic' | 'new-pattern' | 'pattern-building' | 'custom'

interface NCProblem {
  id: string
  title: string
  lcId: number
  difficulty: string
  pattern: string
  topics: string[]
  url: string
}

interface Rec {
  ncProblem: NCProblem
  score: number
  reasons: ReasonTag[]
  reasonText: string
}

const REASON_STYLES: Record<ReasonTag, string> = {
  'weak-topic': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  'new-pattern': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  'pattern-building': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  custom: 'bg-muted text-muted-foreground border-border',
}

const REASON_LABELS: Record<ReasonTag, string> = {
  'weak-topic': 'Weak topic',
  'new-pattern': 'New pattern',
  'pattern-building': 'Building pattern',
  custom: 'Custom',
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

// ── Add Problem Modal ──────────────────────────────────────────────────────────

const ALL_TOPICS = [
  'arrays', 'hashmap', 'strings', 'two-pointers', 'sliding-window',
  'stack', 'binary-search', 'linked-list', 'trees', 'bst', 'trie',
  'heap', 'graphs', 'bfs', 'dfs', 'backtracking', 'dp', 'greedy',
  'intervals', 'math', 'bit-manipulation', 'sorting', 'recursion',
  'matrix', 'union-find', 'monotonic-stack', 'prefix-sum',
]

interface AddProblemModalProps {
  prefill?: { title: string; lcId?: number; difficulty: string; topics: string[]; pattern: string; url?: string }
  onClose: () => void
  onAdded: () => void
}

function AddProblemModal({ prefill, onClose, onAdded }: AddProblemModalProps) {
  const [title, setTitle] = useState(prefill?.title ?? '')
  const [source, setSource] = useState(prefill?.lcId ? 'LeetCode' : 'Custom')
  const [sourceId, setSourceId] = useState(prefill?.lcId ? String(prefill.lcId) : '')
  const [difficulty, setDifficulty] = useState<string>(prefill?.difficulty ?? 'medium')
  const [topicInput, setTopicInput] = useState('')
  const [topics, setTopics] = useState<string[]>(prefill?.topics ?? [])
  const [summary, setSummary] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function addTopic(t: string) {
    const clean = t.trim().toLowerCase().replace(/\s+/g, '-')
    if (clean && !topics.includes(clean)) setTopics((prev) => [...prev, clean])
    setTopicInput('')
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required'); return }
    if (!topics.length) { setError('Add at least one topic'); return }
    setLoading(true)
    setError('')
    const res = await fetch('/api/problems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        source,
        sourceId: sourceId ? parseInt(sourceId) : undefined,
        difficulty,
        topics,
        patternTags: prefill?.pattern ? [prefill.pattern] : [],
        notes: { summary, commonMistakes: [], recallChecklist: [] },
      }),
    })
    setLoading(false)
    if (res.ok) {
      onAdded()
      onClose()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Failed to add problem')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Add Problem</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g. Two Sum"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none"
              >
                <option>LeetCode</option>
                <option>Custom</option>
                <option>HackerRank</option>
                <option>Codeforces</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide">
                {source === 'LeetCode' ? 'LeetCode #' : 'Source ID (optional)'}
              </label>
              <input
                value={sourceId}
                onChange={(e) => setSourceId(e.target.value)}
                className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={source === 'LeetCode' ? '1' : 'optional'}
                type="number"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Difficulty</label>
            <div className="flex gap-2 mt-1">
              {['easy', 'medium', 'hard'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    'flex-1 py-1.5 rounded-md text-sm capitalize border transition-colors',
                    difficulty === d
                      ? d === 'easy' ? 'bg-green-600/20 border-green-600/50 text-green-400'
                        : d === 'medium' ? 'bg-yellow-600/20 border-yellow-600/50 text-yellow-400'
                        : 'bg-red-600/20 border-red-600/50 text-red-400'
                      : 'border-border text-muted-foreground hover:border-muted-foreground'
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Topics</label>
            <div className="flex flex-wrap gap-1.5 mt-1 mb-2 min-h-[28px]">
              {topics.map((t) => (
                <span key={t} className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                  {t}
                  <button type="button" onClick={() => setTopics(topics.filter((x) => x !== t))} className="opacity-60 hover:opacity-100 text-xs leading-none">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTopic(topicInput) } }}
                list="topic-suggestions"
                className="flex-1 bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Type or pick a topic, press Enter"
              />
              <button type="button" onClick={() => addTopic(topicInput)} className="px-3 py-1.5 rounded-md bg-muted text-sm hover:bg-accent transition-colors">Add</button>
            </div>
            <datalist id="topic-suggestions">
              {ALL_TOPICS.filter((t) => !topics.includes(t)).map((t) => <option key={t} value={t} />)}
            </datalist>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Notes / Summary (optional)</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={2}
              className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              placeholder="Key insight, pattern, or approach..."
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-md border border-border text-sm hover:bg-accent transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
              {loading ? 'Adding...' : 'Add Problem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Recommendation Card ────────────────────────────────────────────────────────

function RecCard({ rec, onAdd }: { rec: Rec; onAdd: (rec: Rec) => void }) {
  const { ncProblem: nc } = rec
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3 transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-sm leading-snug">{nc.title}</h3>
            <span className={cn('text-xs font-medium capitalize', diffColor(nc.difficulty))}>{nc.difficulty}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {nc.topics.slice(0, 3).map((t) => (
              <span key={t} className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{t}</span>
            ))}
            <span className="text-xs text-muted-foreground">· {nc.pattern}</span>
          </div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <a href={nc.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
            <ExternalLink size={14} />
          </a>
          <button onClick={() => onAdd(rec)} className="p-1.5 rounded hover:bg-primary/10 transition-colors text-primary" title="Add to tracker">
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {rec.reasons.slice(0, 2).map((r) => (
            <span key={r} className={cn('text-xs px-2 py-0.5 rounded-full border', REASON_STYLES[r])}>
              {REASON_LABELS[r]}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-right max-w-[180px] leading-snug">{rec.reasonText}</p>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [recs, setRecs] = useState<Rec[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [prefill, setPrefill] = useState<AddProblemModalProps['prefill']>(undefined)
  const [randomizing, setRandomizing] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const data = await fetch('/api/recommendations?limit=20').then((r) => r.json()).catch(() => [])
    setRecs(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function addRandom() {
    setRandomizing(true)
    const res = await fetch('/api/problems/random', { method: 'POST' })
    const data = await res.json()
    setRandomizing(false)
    if (res.ok) {
      setToast(`Added: ${data.title}`)
      setTimeout(() => setToast(null), 3000)
      load()
    }
  }

  function handleAdd(rec: Rec) {
    const nc = rec.ncProblem
    setPrefill({
      title: nc.title,
      lcId: nc.lcId,
      difficulty: nc.difficulty,
      topics: nc.topics,
      pattern: nc.pattern,
      url: nc.url,
    })
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recommended</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Personalized to your weak areas and pattern gaps</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-md border border-border hover:bg-accent transition-colors text-muted-foreground" title="Refresh">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={addRandom}
            disabled={randomizing}
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm hover:bg-accent transition-colors disabled:opacity-50"
            title="Add a random problem"
          >
            <Shuffle size={15} className={randomizing ? 'animate-spin' : ''} />
            Random
          </button>
          <button
            onClick={() => { setPrefill(undefined); setShowModal(true) }}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus size={15} />
            Add Problem
          </button>
        </div>
      </div>

      {/* Rec grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4 h-24 animate-pulse" />
          ))}
        </div>
      ) : recs.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-10 text-center space-y-3">
          <p className="text-lg font-semibold">No suggestions yet</p>
          <p className="text-muted-foreground text-sm">Start tracking problems to get personalized recommendations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recs.map((rec, i) => <RecCard key={i} rec={rec} onAdd={handleAdd} />)}
        </div>
      )}

      {/* Add Problem Modal */}
      {showModal && (
        <AddProblemModal
          prefill={prefill}
          onClose={() => setShowModal(false)}
          onAdded={load}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-card border border-primary/40 text-sm px-4 py-3 rounded-lg shadow-lg text-primary animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
    </div>
  )
}
