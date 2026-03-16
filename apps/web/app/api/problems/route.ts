import { NextResponse } from 'next/server'
import { loadAllProblems } from '@core/problem-store'

export async function GET() {
  const problems = loadAllProblems()
  return NextResponse.json(problems)
}
