'use client'
import Link from 'next/link'
import { Brain } from 'lucide-react'

export function Navbar() {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-4">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Brain className="text-primary" size={18} />
        <span>AlgoMemory</span>
      </Link>
    </header>
  )
}
