'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Share2, Mail, Search, ShoppingBag, MessageSquare, Video, Image, Globe, Target, TrendingUp, Edit, Briefcase, Zap, ArrowRight, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

// Icon map for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Share2,
  Mail,
  Search,
  ShoppingBag,
  MessageSquare,
  Video,
  Image,
  Globe,
  Target,
  TrendingUp,
  Edit,
  Briefcase,
  Zap
}

// Category color map
const categoryColors: Record<string, string> = {
  'content-writing': 'bg-blue-500',
  'social-media': 'bg-pink-500',
  'email-marketing': 'bg-green-500',
  seo: 'bg-orange-500',
  ecommerce: 'bg-purple-500',
  advertising: 'bg-red-500',
  video: 'bg-cyan-500',
  website: 'bg-indigo-500',
  business: 'bg-slate-500',
  creative: 'bg-amber-500'
}

interface ToolCardProps {
  tool: {
    id: string
    slug: string
    name: string
    description: string
    category: string
    icon: string
    creditCost: number
    featured?: boolean
    comingSoon?: boolean
  }
  variant?: 'default' | 'compact'
}

export function ToolCard({ tool, variant = 'default' }: ToolCardProps) {
  const Icon = iconMap[tool.icon] || FileText
  const colorClass = categoryColors[tool.category] || 'bg-gray-500'

  if (variant === 'compact') {
    return (
      <Link
        href={tool.comingSoon ? '#' : `/dashboard/tools/${tool.slug}`}
        className={cn('group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-md', tool.comingSoon && 'cursor-not-allowed opacity-60')}
      >
        <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white', colorClass)}>
          <Icon className='h-6 w-6' />
        </div>
        <div className='min-w-0 flex-1'>
          <div className='flex items-center gap-2'>
            <h3 className='truncate font-semibold text-gray-900'>{tool.name}</h3>
            {tool.comingSoon && (
              <Badge variant='secondary' className='shrink-0 text-xs'>
                Soon
              </Badge>
            )}
          </div>
          <p className='truncate text-sm text-gray-500'>{tool.description}</p>
        </div>
        <div className='flex shrink-0 items-center gap-1 text-sm text-gray-500'>
          <CreditCard className='h-4 w-4' />
          <span>{tool.creditCost}</span>
        </div>
      </Link>
    )
  }

  return (
    <Card className={cn('group relative overflow-hidden transition-all hover:shadow-lg', tool.comingSoon && 'opacity-60')}>
      {tool.featured && (
        <div className='absolute right-4 top-4'>
          <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100'>Featured</Badge>
        </div>
      )}
      {tool.comingSoon && (
        <div className='absolute right-4 top-4'>
          <Badge variant='secondary'>Coming Soon</Badge>
        </div>
      )}
      <CardHeader className='pb-4'>
        <div className={cn('mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110', colorClass)}>
          <Icon className='h-7 w-7' />
        </div>
        <CardTitle className='text-lg'>{tool.name}</CardTitle>
        <CardDescription className='line-clamp-2'>{tool.description}</CardDescription>
      </CardHeader>
      <CardFooter className='flex items-center justify-between border-t border-gray-100 pt-4'>
        <div className='flex items-center gap-1 text-sm text-gray-500'>
          <CreditCard className='h-4 w-4' />
          <span>{tool.creditCost} credits</span>
        </div>
        {!tool.comingSoon ? (
          <Button size='sm' className='group/btn gap-1' asChild>
            <Link href={`/dashboard/tools/${tool.slug}`}>
              Use Tool
              <ArrowRight className='h-4 w-4 transition-transform group-hover/btn:translate-x-0.5' />
            </Link>
          </Button>
        ) : (
          <Button size='sm' variant='secondary' disabled>
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
