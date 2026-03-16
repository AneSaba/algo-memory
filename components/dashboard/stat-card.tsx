import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  highlight?: boolean
}

export function StatCard({ title, value, subtitle, highlight }: StatCardProps) {
  return (
    <div className={cn(
      'rounded-lg border border-border bg-card p-4',
      highlight && 'border-primary/40 bg-primary/5'
    )}>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{title}</p>
      <p className={cn('text-3xl font-bold mt-1', highlight && 'text-primary')}>{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  )
}
