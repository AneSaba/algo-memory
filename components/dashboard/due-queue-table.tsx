'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface DueProblem {
  id: string
  title: string
  topics: string[]
  difficulty: string
  memoryScore: number
  overdue: boolean
}

function difficultyColor(d: string) {
  if (d === 'easy') return 'text-green-400'
  if (d === 'medium') return 'text-yellow-400'
  return 'text-red-400'
}

export function DueQueueTable({ problems }: { problems: DueProblem[] }) {
  if (!problems.length) return <p className="text-muted-foreground text-sm">Nothing due today.</p>
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="text-left py-2 pr-4 font-medium">Problem</th>
            <th className="text-left py-2 pr-4 font-medium">Topic</th>
            <th className="text-left py-2 pr-4 font-medium">Difficulty</th>
            <th className="text-left py-2 font-medium">Score</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
              <td className="py-2 pr-4">
                <Link href={`/problems/${p.id}`} className="hover:text-primary transition-colors">
                  {p.title}
                  {p.overdue && <span className="ml-2 text-xs text-destructive">overdue</span>}
                </Link>
              </td>
              <td className="py-2 pr-4 text-muted-foreground">{p.topics[0]}</td>
              <td className={cn('py-2 pr-4 capitalize', difficultyColor(p.difficulty))}>{p.difficulty}</td>
              <td className="py-2">{p.memoryScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
