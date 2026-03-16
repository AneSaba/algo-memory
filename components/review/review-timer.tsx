'use client'
import { useEffect, useState } from 'react'

interface ReviewTimerProps {
  running: boolean
}

export function ReviewTimer({ running }: ReviewTimerProps) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [running])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return (
    <span className="text-sm text-muted-foreground font-mono tabular-nums">{display}</span>
  )
}
