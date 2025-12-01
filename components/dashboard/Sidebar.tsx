'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Wand2, History, CreditCard, Settings, Sparkles, ChevronLeft, LogOut, HelpCircle } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Tools', href: '/dashboard/tools', icon: Wand2 },
  { name: 'History', href: '/dashboard/history', icon: History },
  { name: 'Credits', href: '/dashboard/credits', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings }
]

const bottomNav = [{ name: 'Help Center', href: '/help', icon: HelpCircle }]

interface SidebarProps {
  credits?: number
}

export function Sidebar({ credits = 1250 }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside className={cn('relative flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300', collapsed ? 'w-[70px]' : 'w-64')}>
      {/* Logo */}
      <div className='flex h-16 items-center justify-between border-b border-gray-200 px-4'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <Sparkles className='h-8 w-8 shrink-0 text-blue-600' />
          {!collapsed && <span className='text-xl font-bold text-gray-900'>ContentAI</span>}
        </Link>
        <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => setCollapsed(!collapsed)}>
          <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1 px-3 py-4'>
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors', isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900', collapsed && 'justify-center px-2')}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className='h-5 w-5 shrink-0' />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Credits Display */}
      {!collapsed && (
        <div className='mx-3 mb-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4'>
          <div className='mb-1 text-xs font-medium text-gray-600'>Available Credits</div>
          <div className='mb-3 text-2xl font-bold text-gray-900'>{credits.toLocaleString()}</div>
          <Button size='sm' className='w-full' asChild>
            <Link href='/dashboard/credits'>Buy More</Link>
          </Button>
        </div>
      )}

      {collapsed && (
        <div className='mx-2 mb-4'>
          <Button size='icon' className='w-full' asChild>
            <Link href='/dashboard/credits' title='Buy Credits'>
              <CreditCard className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className='border-t border-gray-200 px-3 py-3'>
        {bottomNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900', collapsed && 'justify-center px-2')}
            title={collapsed ? item.name : undefined}
          >
            <item.icon className='h-5 w-5 shrink-0' />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
        <button
          className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900', collapsed && 'justify-center px-2')}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className='h-5 w-5 shrink-0' />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
