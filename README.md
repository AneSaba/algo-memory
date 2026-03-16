# AlgoMemory

A Git-backed spaced repetition dashboard for coding interview problem retention.

## Overview

AlgoMemory helps you retain algorithm and data structure knowledge by tracking your review history, scheduling problems using a spaced repetition algorithm, and visualizing retention trends over time. Every review is committed to Git, giving you a complete audit trail of your learning progress.

## Stack

- **Next.js 14** (App Router) — full-stack React framework
- **TypeScript** — end-to-end type safety
- **Tailwind CSS** — utility-first styling with dark theme
- **shadcn/ui** — accessible component primitives
- **Recharts** — retention and performance charts
- **js-yaml** — problem files stored as human-readable YAML
- **chokidar** — file watching for live reloads
- **simple-git** — automated Git commits on each review

## Project Structure

```
algo-memory/
  apps/web/               Next.js application
    app/                  App Router pages and API routes
    components/           UI components organized by feature
  packages/
    core/                 Spaced repetition logic, types, file I/O
    git-client/           simple-git wrappers for commit/log
  examples/sample-data/  Sample YAML problem files to get started
  data/                  Local problem and review data (gitignored or its own repo)
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Seed with sample data

Copy the sample problems into your data directory:

```bash
cp -r examples/sample-data/problems/* data/problems/
```

### Using a dedicated data repo (recommended)

Point `ALGO_DATA_DIR` to a separate Git repository so your problem files and review history are version-controlled independently:

```bash
git init ~/algo-data
ALGO_DATA_DIR=~/algo-data npm run dev
```

Every time you submit a review, AlgoMemory will automatically commit the updated YAML file with a descriptive message like `review(problem): two-sum -> solved_clean`.

## Core Concepts

### Problem YAML files

Each problem is stored as a YAML file under `data/problems/<topic>/<slug>.yaml`. The file contains all metadata including spaced repetition state, performance history, and review notes.

### Spaced Repetition Algorithm

The scheduler uses an SM-2-inspired algorithm:

- **Solved Clean**: interval x2, ease +0.1, score +10
- **Solved Struggle**: interval x1.4, score +4
- **Needed Hint**: interval x0.6, ease -0.1, score -8
- **Failed**: interval reset to 1 day, ease -0.2, score -15

### Memory Score

A 0-100 score computed from solve history, interval length, and overdue days. Visualized in the dashboard to surface weak spots.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard with stats, due queue, retention chart, topic health |
| `/review` | Spaced repetition review session |
| `/problems` | Full problem list with search and topic filter |
| `/problems/[id]` | Problem detail with notes and performance breakdown |
| `/topics` | Topic health cards sorted by average memory score |
| `/activity` | Git commit history for all reviews |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ALGO_DATA_DIR` | `./data` | Path to the directory containing `problems/` and `reviews/` |