import { NextResponse } from 'next/server'
import { loadAllProblems } from '@/packages/core/src/problem-store'
import { getRecommendations } from '@/packages/core/src/recommendations'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') ?? '15', 10)
  const problems = loadAllProblems()
  const recs = getRecommendations(problems, limit)
  return NextResponse.json(recs)
}
