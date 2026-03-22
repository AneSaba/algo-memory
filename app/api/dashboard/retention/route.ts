import { NextResponse } from 'next/server'
import { getGit } from '@/packages/git-client/src/index'

function localDateString(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export async function GET() {
  const today = new Date()
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (13 - i))
    return localDateString(d)
  })

  // Tally review results per day from git log
  const perDay: Record<string, { pass: number; total: number }> = {}
  for (const day of days) perDay[day] = { pass: 0, total: 0 }

  try {
    const git = getGit()
    const log = await git.log({ maxCount: 500, '--format': '%H %ai %s' })
    for (const entry of log.all) {
      const match = entry.message.match(/^review\(problem\): .+ -> (.+)$/)
      if (!match) continue
      const result = match[1]
      const dateKey = entry.date.slice(0, 10)
      if (!(dateKey in perDay)) continue
      perDay[dateKey].total++
      if (result === 'solved_clean' || result === 'solved_struggle') perDay[dateKey].pass++
    }
  } catch {
    // git not available
  }

  const data = days.map((day) => {
    const { pass, total } = perDay[day]
    return {
      date: day.slice(5), // MM-DD
      retention: total > 0 ? Math.round((pass / total) * 100) : null,
    }
  })

  return NextResponse.json(data)
}
