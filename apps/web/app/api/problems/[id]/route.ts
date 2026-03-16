import { NextResponse } from 'next/server'
import { loadProblem } from '@core/problem-store'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const problem = loadProblem(params.id)
  if (!problem) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(problem)
}
