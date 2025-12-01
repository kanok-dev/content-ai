'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react'

export function Hero() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]' />

      <div className='container relative mx-auto px-4 py-20 sm:py-28 lg:py-32'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Badge */}
          <Badge variant='secondary' className='mb-6 gap-2 border-blue-200 bg-blue-50 px-4 py-2 text-blue-700'>
            <Sparkles className='h-4 w-4' />
            <span>130+ AI-Powered Content Tools</span>
          </Badge>

          {/* Headline */}
          <h1 className='mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl'>
            Create Amazing Content in <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Seconds</span>
          </h1>

          {/* Subheadline */}
          <p className='mx-auto mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl'>AI-powered writing assistant for blogs, social media, emails, SEO, and more. Save hours of work, boost creativity, and scale your content production effortlessly.</p>

          {/* CTA Buttons */}
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='group gap-2 text-base' asChild>
              <Link href='/signup'>
                Get Started Free
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' className='gap-2 text-base' asChild>
              <Link href='#demo'>
                <Play className='h-4 w-4' />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className='mt-12 flex flex-col items-center gap-4'>
            <div className='flex -space-x-2'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-500' />
              ))}
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                ))}
              </div>
              <span className='text-sm text-gray-600'>
                <span className='font-semibold text-gray-900'>4.9/5</span> from 2,000+ creators
              </span>
            </div>
          </div>
        </div>

        {/* Hero Image/Demo Preview */}
        <div className='mt-16 sm:mt-20'>
          <div className='relative mx-auto max-w-5xl'>
            {/* Glow Effect */}
            <div className='absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl' />

            {/* Dashboard Preview */}
            <div className='relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl'>
              <div className='flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3'>
                <div className='h-3 w-3 rounded-full bg-red-400' />
                <div className='h-3 w-3 rounded-full bg-yellow-400' />
                <div className='h-3 w-3 rounded-full bg-green-400' />
                <span className='ml-2 text-sm text-gray-500'>ContentAI Dashboard</span>
              </div>
              <div className='aspect-video bg-gradient-to-br from-gray-50 to-gray-100 p-8'>
                <div className='grid h-full grid-cols-3 gap-4'>
                  {/* Sidebar Mock */}
                  <div className='space-y-3 rounded-lg bg-white p-4 shadow-sm'>
                    <div className='h-8 w-full rounded bg-blue-100' />
                    <div className='h-4 w-3/4 rounded bg-gray-100' />
                    <div className='h-4 w-full rounded bg-gray-100' />
                    <div className='h-4 w-2/3 rounded bg-gray-100' />
                    <div className='h-4 w-full rounded bg-gray-100' />
                  </div>
                  {/* Main Content Mock */}
                  <div className='col-span-2 space-y-4 rounded-lg bg-white p-4 shadow-sm'>
                    <div className='h-6 w-1/3 rounded bg-gray-200' />
                    <div className='space-y-2'>
                      <div className='h-4 w-full rounded bg-gray-100' />
                      <div className='h-4 w-5/6 rounded bg-gray-100' />
                      <div className='h-4 w-4/5 rounded bg-gray-100' />
                    </div>
                    <div className='h-24 w-full rounded bg-blue-50' />
                    <div className='flex gap-2'>
                      <div className='h-8 w-24 rounded bg-blue-500' />
                      <div className='h-8 w-24 rounded bg-gray-200' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
