import { NextResponse } from 'next/server'

export async function GET() {
  // Returns mock data until review events are implemented
  // TODO: read from reviews/ directory and compute per-day retention
  const today = new Date()
  const data = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (13 - i))
    return {
      date: d.toISOString().split('T')[0].slice(5),
      retention: 0,
    }
  })
  return NextResponse.json(data)
}
