'use client'

import { FileText, Wand2, Download, CheckCircle } from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: FileText,
    title: 'Choose Your Tool',
    description: 'Select from 130+ AI tools designed for specific content types - blogs, social posts, emails, ads, and more.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    step: 2,
    icon: Wand2,
    title: 'Describe Your Content',
    description: 'Enter your topic, tone, and key points. Our AI understands context and creates tailored content for your needs.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    step: 3,
    icon: Download,
    title: 'Generate & Refine',
    description: 'Get instant AI-generated content. Edit, regenerate, or fine-tune until it perfectly matches your vision.',
    color: 'from-green-500 to-green-600'
  },
  {
    step: 4,
    icon: CheckCircle,
    title: 'Publish & Track',
    description: 'Copy your content anywhere or use our integrations. Track performance and optimize with AI insights.',
    color: 'from-orange-500 to-orange-600'
  }
]

export function HowItWorks() {
  return (
    <section className='bg-gray-50 py-20 sm:py-28'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>How It Works</h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>Create professional content in four simple steps. No experience required.</p>
        </div>

        {/* Steps */}
        <div className='relative mx-auto max-w-5xl'>
          {/* Connection Line */}
          <div className='absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 lg:block' />

          <div className='space-y-12 lg:space-y-0'>
            {steps.map((step, index) => (
              <div key={step.step} className='relative lg:pb-12'>
                <div className={`flex flex-col items-center gap-8 lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Card */}
                  <div className='flex-1 lg:pr-8 lg:text-right'>
                    {index % 2 === 0 && (
                      <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:ml-auto lg:max-w-md'>
                        <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700'>Step {step.step}</div>
                        <h3 className='mb-2 text-xl font-semibold text-gray-900'>{step.title}</h3>
                        <p className='text-gray-600'>{step.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Icon Circle */}
                  <div className='relative z-10 flex h-16 w-16 items-center justify-center'>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-lg`}>
                      <step.icon className='h-7 w-7 text-white' />
                    </div>
                  </div>

                  {/* Content Card (Right side for even indexes) */}
                  <div className='flex-1 lg:pl-8 lg:text-left'>
                    {index % 2 === 1 && (
                      <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:mr-auto lg:max-w-md'>
                        <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700'>Step {step.step}</div>
                        <h3 className='mb-2 text-xl font-semibold text-gray-900'>{step.title}</h3>
                        <p className='text-gray-600'>{step.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
