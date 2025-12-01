'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTA() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 py-20 sm:py-28'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl' />
        <div className='absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-white blur-3xl' />
      </div>

      <div className='container relative mx-auto px-4 text-center'>
        <div className='mx-auto max-w-3xl'>
          {/* Icon */}
          <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm'>
            <Sparkles className='h-8 w-8 text-white' />
          </div>

          {/* Headline */}
          <h2 className='mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'>Ready to Transform Your Content Creation?</h2>

          {/* Subheadline */}
          <p className='mx-auto mb-8 max-w-xl text-lg text-blue-100'>Join thousands of content creators, marketers, and businesses who are already saving hours every week with ContentAI.</p>

          {/* CTA Buttons */}
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='group gap-2 bg-white text-blue-600 hover:bg-gray-100' asChild>
              <Link href='/signup'>
                Start Free Trial
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' className='border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20' asChild>
              <Link href='/contact'>Talk to Sales</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className='mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200'>
            <span className='flex items-center gap-2'>
              <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
              No credit card required
            </span>
            <span className='flex items-center gap-2'>
              <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
              14-day free trial
            </span>
            <span className='flex items-center gap-2'>
              <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
              Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
