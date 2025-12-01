'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Sparkles, X } from 'lucide-react'
import { navItems, siteConfig } from '@/config/site'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Sparkles className='h-8 w-8 text-blue-600' />
          <span className='text-xl font-bold text-gray-900'>{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden items-center gap-8 md:flex'>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className='text-sm font-medium text-gray-600 transition-colors hover:text-blue-600'>
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className='hidden items-center gap-4 md:flex'>
          <Button variant='ghost' asChild>
            <Link href='/login'>Sign In</Link>
          </Button>
          <Button asChild>
            <Link href='/signup'>Get Started Free</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className='md:hidden'>
            <Button variant='ghost' size='icon'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-full sm:w-80'>
            <div className='flex flex-col gap-6 pt-6'>
              <nav className='flex flex-col gap-4'>
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className='text-lg font-medium text-gray-900 transition-colors hover:text-blue-600'>
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className='flex flex-col gap-3 pt-4'>
                <Button variant='outline' asChild>
                  <Link href='/login' onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link href='/signup' onClick={() => setIsOpen(false)}>
                    Get Started Free
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
