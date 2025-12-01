'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Share2, Mail, Search, ShoppingBag, MessageSquare, Image, Video, Globe, Zap, TrendingUp, Target, PenTool, BookOpen, Megaphone, Users, BarChart3, Lightbulb, ArrowRight, Sparkles, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'

const categories = [
  { id: 'all', name: 'All Tools', count: 130 },
  { id: 'content-writing', name: 'Content Writing', count: 25 },
  { id: 'social-media', name: 'Social Media', count: 20 },
  { id: 'email-marketing', name: 'Email Marketing', count: 15 },
  { id: 'seo', name: 'SEO', count: 18 },
  { id: 'ecommerce', name: 'E-commerce', count: 12 },
  { id: 'advertising', name: 'Advertising', count: 15 },
  { id: 'video', name: 'Video Content', count: 10 },
  { id: 'business', name: 'Business', count: 15 }
]

const tools = [
  {
    id: 'blog-writer',
    name: 'Blog Post Writer',
    description: 'Generate comprehensive, SEO-optimized blog posts in any tone and length. Perfect for content marketers and bloggers.',
    icon: FileText,
    category: 'content-writing',
    credits: 10,
    popular: true
  },
  {
    id: 'social-media-generator',
    name: 'Social Media Generator',
    description: 'Create engaging posts for Twitter, LinkedIn, Facebook, Instagram, and more with platform-specific optimization.',
    icon: Share2,
    category: 'social-media',
    credits: 3,
    popular: true
  },
  {
    id: 'email-writer',
    name: 'Email Writer',
    description: 'Craft compelling marketing, sales, and transactional emails that convert readers into customers.',
    icon: Mail,
    category: 'email-marketing',
    credits: 5,
    popular: true
  },
  {
    id: 'seo-meta-generator',
    name: 'SEO Meta Tags',
    description: 'Generate optimized meta titles, descriptions, and tags for better search engine rankings.',
    icon: Search,
    category: 'seo',
    credits: 5,
    popular: true
  },
  {
    id: 'product-description',
    name: 'Product Description',
    description: 'Write persuasive e-commerce product descriptions that highlight benefits and drive sales.',
    icon: ShoppingBag,
    category: 'ecommerce',
    credits: 5,
    popular: true
  },
  {
    id: 'ad-copy',
    name: 'Ad Copy Generator',
    description: 'Create high-converting ad copy for Google Ads, Facebook Ads, and other platforms.',
    icon: Megaphone,
    category: 'advertising',
    credits: 5,
    popular: false
  },
  {
    id: 'instagram-caption',
    name: 'Instagram Captions',
    description: 'Generate creative, engaging captions with relevant hashtags for maximum reach.',
    icon: Image,
    category: 'social-media',
    credits: 3,
    popular: false
  },
  {
    id: 'youtube-script',
    name: 'YouTube Script Writer',
    description: 'Write engaging video scripts optimized for viewer retention and engagement.',
    icon: Video,
    category: 'video',
    credits: 8,
    popular: false
  },
  {
    id: 'landing-page',
    name: 'Landing Page Copy',
    description: 'Create conversion-focused landing page content that turns visitors into customers.',
    icon: Globe,
    category: 'content-writing',
    credits: 8,
    popular: false
  },
  {
    id: 'headline-generator',
    name: 'Headline Generator',
    description: 'Craft attention-grabbing headlines that increase click-through rates.',
    icon: Zap,
    category: 'content-writing',
    credits: 2,
    popular: false
  },
  {
    id: 'content-improver',
    name: 'Content Improver',
    description: 'Enhance and rewrite existing content to make it more engaging and effective.',
    icon: TrendingUp,
    category: 'content-writing',
    credits: 5,
    popular: false
  },
  {
    id: 'cta-generator',
    name: 'Call to Action',
    description: 'Generate compelling CTAs that drive clicks and conversions.',
    icon: Target,
    category: 'advertising',
    credits: 2,
    popular: false
  },
  {
    id: 'article-rewriter',
    name: 'Article Rewriter',
    description: 'Rewrite articles while maintaining meaning and improving readability.',
    icon: PenTool,
    category: 'content-writing',
    credits: 5,
    popular: false
  },
  {
    id: 'story-writer',
    name: 'Story Writer',
    description: 'Create engaging stories and narratives for brand storytelling.',
    icon: BookOpen,
    category: 'content-writing',
    credits: 10,
    popular: false
  },
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post',
    description: 'Create professional LinkedIn posts that build authority and engagement.',
    icon: Users,
    category: 'social-media',
    credits: 3,
    popular: false
  },
  {
    id: 'press-release',
    name: 'Press Release',
    description: 'Write professional press releases that get media attention.',
    icon: MessageSquare,
    category: 'business',
    credits: 8,
    popular: false
  },
  {
    id: 'case-study',
    name: 'Case Study Writer',
    description: 'Create compelling case studies that showcase your success stories.',
    icon: BarChart3,
    category: 'business',
    credits: 12,
    popular: false
  },
  {
    id: 'brainstorm',
    name: 'Content Ideas',
    description: 'Generate fresh content ideas and topics for your niche.',
    icon: Lightbulb,
    category: 'content-writing',
    credits: 3,
    popular: false
  }
]

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || tool.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Header />
      <main className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        {/* Hero Section */}
        <section className='bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-24'>
          <div className='container mx-auto px-4'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='text-center max-w-3xl mx-auto'>
              <Badge className='mb-4' variant='secondary'>
                <Sparkles className='w-3 h-3 mr-1' />
                130+ AI Tools
              </Badge>
              <h1 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6'>AI Tools for Every Content Need</h1>
              <p className='text-xl text-gray-600 dark:text-gray-300 mb-8'>From blog posts to social media, emails to SEO - discover the perfect AI tool for your content creation workflow.</p>

              {/* Search Bar */}
              <div className='max-w-xl mx-auto relative'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input type='text' placeholder='Search tools...' value={search} onChange={(e) => setSearch(e.target.value)} className='pl-12 h-14 text-lg' />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section className='py-12 sm:py-16'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col lg:flex-row gap-8'>
              {/* Sidebar - Categories */}
              <aside className='lg:w-64 flex-shrink-0'>
                <div className='sticky top-24 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm'>
                  <div className='flex items-center gap-2 mb-4'>
                    <Filter className='h-5 w-5 text-gray-500' />
                    <h3 className='font-semibold text-gray-900 dark:text-white'>Categories</h3>
                  </div>
                  <nav className='space-y-1'>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.id ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className='text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full'>{category.count}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Tools Grid */}
              <div className='flex-1'>
                <div className='flex items-center justify-between mb-6'>
                  <p className='text-gray-600 dark:text-gray-300'>
                    Showing <span className='font-semibold'>{filteredTools.length}</span> tools
                  </p>
                </div>

                <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
                  {filteredTools.map((tool, index) => (
                    <motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                      <Link href={`/dashboard/tools/${tool.id}`}>
                        <div className='group h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 transition-all'>
                          <div className='flex items-start justify-between mb-4'>
                            <div className='h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                              <tool.icon className='h-6 w-6' />
                            </div>
                            {tool.popular && (
                              <Badge variant='secondary' className='text-xs'>
                                Popular
                              </Badge>
                            )}
                          </div>
                          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>{tool.name}</h3>
                          <p className='text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2'>{tool.description}</p>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm text-gray-500 dark:text-gray-400'>{tool.credits} credits</span>
                            <span className='text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1'>
                              Try it <ArrowRight className='h-4 w-4' />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {filteredTools.length === 0 && (
                  <div className='text-center py-12'>
                    <Search className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>No tools found</h3>
                    <p className='text-gray-600 dark:text-gray-300'>Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 bg-gradient-to-r from-blue-600 to-purple-600'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>Ready to supercharge your content?</h2>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>Start creating amazing content with our AI tools. Get 100 free credits when you sign up.</p>
            <Button size='lg' variant='secondary' asChild>
              <Link href='/signup'>
                Get Started Free
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
