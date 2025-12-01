'use client'

import { FileText, Share2, Mail, Search, ShoppingBag, MessageSquare, Image, Video, Globe, Zap, TrendingUp, Target } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Blog Post Writer',
    description: 'Generate SEO-optimized blog posts in any tone and length',
    category: 'Content Writing',
    color: 'bg-blue-500'
  },
  {
    icon: Share2,
    title: 'Social Media Generator',
    description: 'Create engaging posts for all major platforms',
    category: 'Social Media',
    color: 'bg-pink-500'
  },
  {
    icon: Mail,
    title: 'Email Writer',
    description: 'Craft compelling marketing and sales emails',
    category: 'Email Marketing',
    color: 'bg-green-500'
  },
  {
    icon: Search,
    title: 'SEO Tools',
    description: 'Optimize content with meta tags and keywords',
    category: 'SEO',
    color: 'bg-orange-500'
  },
  {
    icon: ShoppingBag,
    title: 'Product Descriptions',
    description: 'Write persuasive e-commerce product copy',
    category: 'E-commerce',
    color: 'bg-purple-500'
  },
  {
    icon: MessageSquare,
    title: 'Ad Copy Generator',
    description: 'Create high-converting ads for Google and Facebook',
    category: 'Advertising',
    color: 'bg-red-500'
  },
  {
    icon: Image,
    title: 'Instagram Captions',
    description: 'Generate creative captions with hashtags',
    category: 'Social Media',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    icon: Video,
    title: 'Video Scripts',
    description: 'Write engaging scripts for YouTube and TikTok',
    category: 'Video Content',
    color: 'bg-cyan-500'
  },
  {
    icon: Globe,
    title: 'Landing Page Copy',
    description: 'Create conversion-focused landing page content',
    category: 'Website',
    color: 'bg-indigo-500'
  },
  {
    icon: Zap,
    title: 'Headline Generator',
    description: 'Craft attention-grabbing headlines',
    category: 'Copywriting',
    color: 'bg-yellow-500'
  },
  {
    icon: TrendingUp,
    title: 'Content Improver',
    description: 'Enhance and rewrite existing content',
    category: 'Editing',
    color: 'bg-teal-500'
  },
  {
    icon: Target,
    title: 'Call to Action',
    description: 'Generate compelling CTAs that convert',
    category: 'Conversion',
    color: 'bg-rose-500'
  }
]

export function FeaturesGrid() {
  return (
    <section id='features' className='bg-white py-20 sm:py-28'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>130+ AI Tools for Every Content Need</h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>From blog posts to social media, emails to SEO - we&apos;ve got the perfect AI tool for your content creation needs</p>
        </div>

        {/* Features Grid */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {features.map((feature) => (
            <div key={feature.title} className='group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100'>
              {/* Icon */}
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} text-white transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className='h-6 w-6' />
              </div>

              {/* Category Badge */}
              <span className='mb-2 inline-block text-xs font-medium text-blue-600'>{feature.category}</span>

              {/* Title */}
              <h3 className='mb-2 text-lg font-semibold text-gray-900'>{feature.title}</h3>

              {/* Description */}
              <p className='text-sm text-gray-600'>{feature.description}</p>

              {/* Hover Arrow */}
              <div className='mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100'>Try it now →</div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className='mt-12 text-center'>
          <a href='/tools' className='inline-flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200'>
            View All 130+ Tools
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
