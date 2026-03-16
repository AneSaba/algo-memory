import { NextResponse } from 'next/server'
import { loadAllProblems } from '@/packages/core/src/problem-store'
import { NEETCODE_150 } from '@/packages/core/src/neetcode-150'

export async function GET(req: Request) {
  const existing = loadAllProblems()
  const { searchParams } = new URL(req.url)
  const excludeId = searchParams.get('exclude')

  const trackedIds = new Set<string>()
  for (const p of existing) {
    if (p.sourceId) trackedIds.add(p.sourceId.toString())
    const match = p.id.match(/^lc-(\d+)/)
    if (match) trackedIds.add(parseInt(match[1], 10).toString())
  }

  let pool = NEETCODE_150.filter((nc) => !trackedIds.has(nc.lcId.toString()))
  if (excludeId) pool = pool.filter((nc) => nc.id !== excludeId)
  if (!pool.length) pool = NEETCODE_150.filter((nc) => !trackedIds.has(nc.lcId.toString()))
  if (!pool.length) return NextResponse.json({ error: 'All problems tracked' }, { status: 400 })

  const nc = pool[Math.floor(Math.random() * pool.length)]
  return NextResponse.json(nc)
}
