import { NextResponse } from 'next/server'
import { isGitRepo, getRecentCommits } from '@git-client/index'

export async function GET() {
  const isRepo = await isGitRepo()
  if (!isRepo) return NextResponse.json({ configured: false, commits: [] })
  const commits = await getRecentCommits(10)
  return NextResponse.json({ configured: true, commits })
}
