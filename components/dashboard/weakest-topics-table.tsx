interface TopicHealth {
  topic: string
  total: number
  avgScore: number
  failRate: number
  overdue: number
}

export function WeakestTopicsTable({ topics }: { topics: TopicHealth[] }) {
  if (!topics?.length) return <p className="text-muted-foreground text-sm">No topic data yet.</p>
  const sorted = [...topics].sort((a, b) => a.avgScore - b.avgScore)
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-muted-foreground">
          <th className="text-left py-2 pr-4 font-medium">Topic</th>
          <th className="text-left py-2 pr-4 font-medium">Problems</th>
          <th className="text-left py-2 pr-4 font-medium">Avg Score</th>
          <th className="text-left py-2 pr-4 font-medium">Fail Rate</th>
          <th className="text-left py-2 font-medium">Overdue</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((t) => (
          <tr key={t.topic} className="border-b border-border/50">
            <td className="py-2 pr-4 capitalize">{t.topic}</td>
            <td className="py-2 pr-4">{t.total}</td>
            <td className="py-2 pr-4">{t.avgScore}</td>
            <td className="py-2 pr-4">{t.failRate}%</td>
            <td className="py-2">{t.overdue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
