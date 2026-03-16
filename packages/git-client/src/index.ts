import simpleGit, { SimpleGit } from 'simple-git'
import path from 'path'

export function getGit(): SimpleGit {
  const repoDir = process.env.ALGO_DATA_DIR ?? path.join(process.cwd(), 'data')
  return simpleGit(repoDir)
}

export async function commitReview(problemSlug: string, result: string): Promise<string> {
  const git = getGit()
  await git.add('.')
  const message = `review(problem): ${problemSlug} -> ${result}`
  const commit = await git.commit(message)
  return commit.commit
}

export async function commitSolve(problemSlug: string): Promise<string> {
  const git = getGit()
  await git.add('.')
  const message = `solve(problem): add ${problemSlug}`
  const commit = await git.commit(message)
  return commit.commit
}

export async function getRecentCommits(limit = 20) {
  const git = getGit()
  const log = await git.log({ maxCount: limit })
  return log.all
}

export async function isGitRepo(): Promise<boolean> {
  try {
    const git = getGit()
    await git.status()
    return true
  } catch {
    return false
  }
}
