'use client'

interface ActivityEntry {
  date: string
  count: number
}

function intensityClass(count: number): string {
  if (count === 0) return 'bg-muted'
  if (count <= 2) return 'bg-primary/30'
  if (count <= 5) return 'bg-primary/60'
  return 'bg-primary'
}

export function ContributionHeatmap({ data }: { data: ActivityEntry[] }) {
  if (!data?.length) return <p className="text-muted-foreground text-sm">No activity yet.</p>

  return (
    <div className="flex flex-wrap gap-1">
      {data.map((entry) => (
        <div
          key={entry.date}
          title={`${entry.date}: ${entry.count} reviews`}
          className={`w-3 h-3 rounded-sm ${intensityClass(entry.count)}`}
        />
      ))}
    </div>
  )
}
