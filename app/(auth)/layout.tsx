'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen'>
      {/* Left Side - Branding */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:40px_40px]' />

        {/* Content */}
        <div className='relative flex flex-col justify-between p-12 w-full'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2'>
            <Sparkles className='h-10 w-10 text-white' />
            <span className='text-2xl font-bold text-white'>ContentAI</span>
          </Link>

          {/* Main Content */}
          <div className='space-y-6'>
            <h1 className='text-4xl font-bold text-white leading-tight'>
              Create amazing content
              <br />
              <span className='text-blue-200'>in seconds with AI</span>
            </h1>
            <p className='text-lg text-blue-100 max-w-md'>Join 10,000+ content creators who use our AI tools to write blog posts, social media content, emails, and more.</p>

            {/* Features List */}
            <ul className='space-y-4 text-blue-100'>
              <li className='flex items-center gap-3'>
                <div className='h-2 w-2 rounded-full bg-blue-300' />
                <span>130+ AI-powered writing tools</span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='h-2 w-2 rounded-full bg-blue-300' />
                <span>Generate content in any tone or style</span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='h-2 w-2 rounded-full bg-blue-300' />
                <span>SEO-optimized content every time</span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='h-2 w-2 rounded-full bg-blue-300' />
                <span>Start free with 100 credits</span>
              </li>
            </ul>
          </div>

          {/* Testimonial */}
          <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6'>
            <p className='text-white italic mb-4'>&ldquo;ContentAI has transformed our content workflow. We&apos;re producing 5x more content with better quality than before.&rdquo;</p>
            <div className='flex items-center gap-3'>
              <div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500' />
              <div>
                <p className='text-white font-medium'>Sarah Johnson</p>
                <p className='text-blue-200 text-sm'>Marketing Director, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className='flex flex-1 flex-col'>
        {/* Mobile Logo */}
        <div className='flex lg:hidden items-center justify-center py-8 border-b'>
          <Link href='/' className='flex items-center gap-2'>
            <Sparkles className='h-8 w-8 text-blue-600' />
            <span className='text-xl font-bold text-gray-900'>ContentAI</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className='flex flex-1 items-center justify-center p-8'>
          <div className='w-full max-w-md'>{children}</div>
        </div>

        {/* Footer */}
        <div className='border-t py-6 text-center text-sm text-gray-500'>
          <p>
            © {new Date().getFullYear()} ContentAI. All rights reserved.{' '}
            <Link href='/privacy' className='text-blue-600 hover:underline'>
              Privacy Policy
            </Link>
            {' · '}
            <Link href='/terms' className='text-blue-600 hover:underline'>
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
