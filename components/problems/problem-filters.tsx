'use client'

interface ProblemFiltersProps {
  search: string
  topicFilter: string
  topics: string[]
  onSearchChange: (value: string) => void
  onTopicChange: (value: string) => void
}

export function ProblemFilters({
  search,
  topicFilter,
  topics,
  onSearchChange,
  onTopicChange,
}: ProblemFiltersProps) {
  return (
    <div className="flex gap-3">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search problems..."
        className="flex-1 bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <select
        value={topicFilter}
        onChange={(e) => onTopicChange(e.target.value)}
        className="bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none"
      >
        <option value="">All topics</option>
        {topics.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  )
}
