'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RetentionPoint {
  date: string
  retention: number
}

export function RetentionLineChart({ data }: { data: RetentionPoint[] }) {
  if (!data?.length) return <p className="text-muted-foreground text-sm">No data yet.</p>
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217.2 32.6% 17.5%)" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(215 20.2% 65.1%)" />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(215 20.2% 65.1%)" />
        <Tooltip
          contentStyle={{ background: 'hsl(222.2 84% 4.9%)', border: '1px solid hsl(217.2 32.6% 17.5%)' }}
        />
        <Line type="monotone" dataKey="retention" stroke="hsl(142.1 76.2% 36.3%)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
