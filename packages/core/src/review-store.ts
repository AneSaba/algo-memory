import fs from 'fs'
import path from 'path'
import { ReviewEvent } from './types'
import { getDataDir } from './problem-store'

export function getReviewsDir(): string {
  return path.join(getDataDir(), 'reviews')
}

export function loadAllReviews(): ReviewEvent[] {
  const dir = getReviewsDir()
  if (!fs.existsSync(dir)) return []
  const reviews: ReviewEvent[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.json')) {
      try {
        const raw = fs.readFileSync(path.join(dir, entry.name), 'utf-8')
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) reviews.push(...parsed)
        else reviews.push(parsed)
      } catch {}
    }
  }
  return reviews
}

export function saveReview(event: ReviewEvent): void {
  const dir = getReviewsDir()
  fs.mkdirSync(dir, { recursive: true })
  const date = event.reviewedAt.split('T')[0]
  const filePath = path.join(dir, `${date}.json`)
  let existing: ReviewEvent[] = []
  if (fs.existsSync(filePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    } catch {}
  }
  existing.push(event)
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8')
}
