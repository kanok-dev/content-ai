'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Search, Bell, CreditCard, Settings, LogOut, User, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'

interface HeaderProps {
  user?: {
    name: string
    email: string
    image?: string
  }
  credits?: number
}

export function Header({ user = { name: 'John Doe', email: 'john@example.com' }, credits = 1250 }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className='sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6'>
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild className='lg:hidden'>
          <Button variant='ghost' size='icon'>
            <Menu className='h-5 w-5' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-64 p-0'>
          <Sidebar credits={credits} />
        </SheetContent>
      </Sheet>

      {/* Search */}
      <div className='hidden flex-1 md:block md:max-w-md'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <Input type='search' placeholder='Search tools...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='pl-10' />
        </div>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-2 md:gap-4'>
        {/* Credits Badge */}
        <Link href='/dashboard/credits' className='hidden items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 sm:flex'>
          <CreditCard className='h-4 w-4' />
          <span>{credits.toLocaleString()} credits</span>
        </Link>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='h-5 w-5' />
              <span className='absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-80'>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className='max-h-80 overflow-y-auto'>
              <DropdownMenuItem className='flex flex-col items-start gap-1 py-3'>
                <span className='font-medium'>Welcome to ContentAI! 🎉</span>
                <span className='text-xs text-gray-500'>Start creating amazing content with our AI tools.</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='flex flex-col items-start gap-1 py-3'>
                <span className='font-medium'>Credits Added</span>
                <span className='text-xs text-gray-500'>100 bonus credits have been added to your account.</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='justify-center text-blue-600'>View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='gap-2 px-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className='bg-blue-100 text-blue-700'>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <span className='hidden text-sm font-medium lg:inline'>{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuLabel>
              <div className='flex flex-col'>
                <span>{user.name}</span>
                <span className='text-xs font-normal text-gray-500'>{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href='/dashboard/settings' className='flex items-center'>
                <User className='mr-2 h-4 w-4' />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/dashboard/credits' className='flex items-center'>
                <CreditCard className='mr-2 h-4 w-4' />
                Credits & Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/dashboard/settings' className='flex items-center'>
                <Settings className='mr-2 h-4 w-4' />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-600'>
              <LogOut className='mr-2 h-4 w-4' />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
