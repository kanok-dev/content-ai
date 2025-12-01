'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Check } from 'lucide-react'
import { pricingTiers } from '@/config/pricing'
import Link from 'next/link'

export function PricingTable() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id='pricing' className='bg-white py-20 sm:py-28'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Simple, Transparent Pricing</h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-600'>Choose the plan that fits your needs. All plans include access to our full suite of AI tools.</p>

          {/* Billing Toggle */}
          <div className='flex items-center justify-center gap-4'>
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Yearly</span>
            {isYearly && (
              <Badge variant='secondary' className='bg-green-100 text-green-700'>
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-3'>
          {pricingTiers.map((tier) => (
            <div key={tier.id} className={`relative rounded-2xl border-2 p-8 transition-all ${tier.popular ? 'border-blue-500 bg-blue-50/50 shadow-xl shadow-blue-100' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}>
              {/* Popular Badge */}
              {tier.popular && <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-1'>Most Popular</Badge>}

              {/* Plan Name */}
              <div className='mb-4'>
                <h3 className='text-xl font-bold text-gray-900'>{tier.name}</h3>
                <p className='mt-1 text-sm text-gray-600'>{tier.description}</p>
              </div>

              {/* Price */}
              <div className='mb-6'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-4xl font-bold text-gray-900'>${isYearly ? Math.round(tier.yearlyPrice! / 12) : tier.price}</span>
                  <span className='text-gray-600'>/month</span>
                </div>
                {isYearly && tier.yearlyPrice && <p className='mt-1 text-sm text-gray-500'>${tier.yearlyPrice} billed annually</p>}
              </div>

              {/* Credits */}
              <div className='mb-6 rounded-lg bg-gray-100 px-4 py-3'>
                <span className='text-2xl font-bold text-blue-600'>{tier.credits.toLocaleString()}</span>
                <span className='ml-2 text-gray-600'>credits/month</span>
              </div>

              {/* CTA Button */}
              <Button className={`mb-6 w-full ${tier.popular ? '' : 'bg-gray-900 hover:bg-gray-800'}`} size='lg' asChild>
                <Link href={tier.id === 'enterprise' ? '/contact' : '/signup'}>{tier.cta}</Link>
              </Button>

              {/* Features */}
              <ul className='space-y-3'>
                {tier.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-3'>
                    <Check className='h-5 w-5 shrink-0 text-green-500' />
                    <span className='text-sm text-gray-600'>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className='mt-12 text-center'>
          <p className='text-sm text-gray-500'>✨ 14-day free trial · No credit card required · Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}
