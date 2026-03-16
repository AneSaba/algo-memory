import { NextResponse } from 'next/server'
import { loadProblem, deleteProblem } from '@/packages/core/src/problem-store'
import { commitRemove } from '@/packages/git-client/src/index'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const problem = loadProblem(params.id)
  if (!problem) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(problem)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const problem = loadProblem(params.id)
  if (!problem) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const deleted = deleteProblem(params.id)
  if (!deleted) return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })

  try {
    await commitRemove(problem.slug)
    const { getGit } = await import('@/packages/git-client/src/index')
    await getGit().push('origin', 'main')
  } catch {
    // git not configured — ok
  }

  return NextResponse.json({ success: true })
}
