import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { Problem } from './types'

export function getDataDir(): string {
  return process.env.ALGO_DATA_DIR ?? path.join(process.cwd(), 'data')
}

export function loadAllProblems(): Problem[] {
  const dir = path.join(getDataDir(), 'problems')
  if (!fs.existsSync(dir)) return []
  const problems: Problem[] = []
  function walk(current: string) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.yaml') || entry.name.endsWith('.yml')) {
        try {
          const raw = fs.readFileSync(full, 'utf-8')
          problems.push(yaml.load(raw) as Problem)
        } catch {}
      }
    }
  }
  walk(dir)
  return problems
}

export function loadProblem(id: string): Problem | null {
  const all = loadAllProblems()
  return all.find((p) => p.id === id) ?? null
}

export function saveProblem(problem: Problem): void {
  const topic = problem.topics[0] ?? 'uncategorized'
  const dir = path.join(getDataDir(), 'problems', topic)
  fs.mkdirSync(dir, { recursive: true })
  const filePath = path.join(dir, `${problem.slug}.yaml`)
  fs.writeFileSync(filePath, yaml.dump(problem), 'utf-8')
}
