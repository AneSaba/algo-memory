'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, ListChecks, BarChart2, Activity, Brain, LineChart } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/review', label: 'Review', icon: Brain },
  { href: '/problems', label: 'Problems', icon: ListChecks },
  { href: '/topics', label: 'Topics', icon: BookOpen },
  { href: '/activity', label: 'Activity', icon: Activity },
  { href: '/analytics', label: 'Analytics', icon: LineChart },
]

export function Sidebar() {
  const path = usePathname()
  return (
    <aside className="w-56 border-r border-border bg-card flex flex-col py-6 px-3 gap-1 shrink-0">
      <div className="flex items-center gap-2 px-3 mb-6">
        <Brain className="text-primary" size={20} />
        <span className="font-semibold text-lg tracking-tight">AlgoMemory</span>
      </div>
      {nav.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
            path === href
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
        >
          <Icon size={16} />
          {label}
        </Link>
      ))}
      <div className="mt-auto pt-4 border-t border-border">
        <a
          href="https://neetcode.io/practice/practice/neetcode150"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <BarChart2 size={16} />
          NeetCode 150
        </a>
      </div>
    </aside>
  )
}
