'use client'

import { useState } from 'react'
import { History as HistoryIcon, Search, Filter, FileText, Share2, Mail, ShoppingBag, Search as SearchIcon, Calendar, Clock, Copy, Trash2, Download, Eye, Star, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const toolIcons: Record<string, any> = {
  'blog-writer': FileText,
  'social-media-generator': Share2,
  'email-writer': Mail,
  'product-description': ShoppingBag,
  'seo-meta-generator': SearchIcon
}

const toolColors: Record<string, string> = {
  'blog-writer': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'social-media-generator': 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  'email-writer': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  'product-description': 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  'seo-meta-generator': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
}

// Mock generation history data
const generationHistory = [
  {
    id: '1',
    toolId: 'blog-writer',
    toolName: 'Blog Post Writer',
    title: '10 Tips for Better SEO in 2024',
    preview: 'Search engine optimization (SEO) continues to evolve rapidly. In this comprehensive guide, we explore the top 10 strategies that will help your website rank higher...',
    creditsUsed: 10,
    createdAt: '2024-01-15T14:30:00Z',
    starred: true,
    status: 'completed'
  },
  {
    id: '2',
    toolId: 'social-media-generator',
    toolName: 'Social Media Generator',
    title: 'Product Launch Announcement',
    preview: '🚀 Exciting news! We are thrilled to announce the launch of our revolutionary new product that will change the way you work. #NewProduct #Innovation',
    creditsUsed: 3,
    createdAt: '2024-01-15T10:15:00Z',
    starred: false,
    status: 'completed'
  },
  {
    id: '3',
    toolId: 'email-writer',
    toolName: 'Email Writer',
    title: 'Welcome Email Sequence',
    preview: 'Subject: Welcome to [Company Name] - Your Journey Begins Now!\n\nDear [Name],\n\nThank you for joining our community! We are excited to have you on board...',
    creditsUsed: 5,
    createdAt: '2024-01-14T16:45:00Z',
    starred: true,
    status: 'completed'
  },
  {
    id: '4',
    toolId: 'product-description',
    toolName: 'Product Description',
    title: 'Premium Wireless Headphones',
    preview: 'Experience audio like never before with our Premium Wireless Headphones. Featuring cutting-edge noise cancellation technology and 40-hour battery life...',
    creditsUsed: 5,
    createdAt: '2024-01-14T09:20:00Z',
    starred: false,
    status: 'completed'
  },
  {
    id: '5',
    toolId: 'seo-meta-generator',
    toolName: 'SEO Meta Generator',
    title: 'Homepage Meta Tags',
    preview: 'Meta Title: Best AI Content Tools | ContentAI - Generate Amazing Content\nMeta Description: Create high-quality content in seconds with our AI-powered tools...',
    creditsUsed: 5,
    createdAt: '2024-01-13T11:30:00Z',
    starred: false,
    status: 'completed'
  },
  {
    id: '6',
    toolId: 'blog-writer',
    toolName: 'Blog Post Writer',
    title: 'The Future of AI in Marketing',
    preview: 'Artificial intelligence is transforming the marketing landscape at an unprecedented pace. From personalized content to predictive analytics, AI tools are...',
    creditsUsed: 10,
    createdAt: '2024-01-12T15:00:00Z',
    starred: true,
    status: 'completed'
  },
  {
    id: '7',
    toolId: 'social-media-generator',
    toolName: 'Social Media Generator',
    title: 'Weekly Tips Thread',
    preview: '🧵 Time for our weekly productivity tips thread! Here are 5 ways to maximize your workflow this week:\n\n1️⃣ Start your day with the most important task...',
    creditsUsed: 3,
    createdAt: '2024-01-11T08:30:00Z',
    starred: false,
    status: 'completed'
  },
  {
    id: '8',
    toolId: 'email-writer',
    toolName: 'Email Writer',
    title: 'Monthly Newsletter',
    preview: 'Subject: January Newsletter - New Features & Updates\n\nHello [Name],\n\nHappy New Year! We hope you had a wonderful holiday season. Here is what is new...',
    creditsUsed: 5,
    createdAt: '2024-01-10T14:20:00Z',
    starred: false,
    status: 'completed'
  }
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function HistoryPage() {
  const [search, setSearch] = useState('')
  const [toolFilter, setToolFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [selectedGeneration, setSelectedGeneration] = useState<(typeof generationHistory)[0] | null>(null)
  const [starredOnly, setStarredOnly] = useState(false)

  const filteredHistory = generationHistory.filter((gen) => {
    if (search && !gen.title.toLowerCase().includes(search.toLowerCase()) && !gen.preview.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    if (toolFilter !== 'all' && gen.toolId !== toolFilter) {
      return false
    }
    if (starredOnly && !gen.starred) {
      return false
    }
    // Date filter logic can be expanded
    return true
  })

  const totalCreditsUsed = filteredHistory.reduce((sum, gen) => sum + gen.creditsUsed, 0)

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Generation History</h1>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>View and manage your past content generations</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <HistoryIcon className='h-4 w-4' />
          <span>{filteredHistory.length} generations</span>
          <span className='mx-2'>•</span>
          <span>{totalCreditsUsed} credits used</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className='p-4'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
            {/* Search */}
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <Input placeholder='Search by title or content...' value={search} onChange={(e) => setSearch(e.target.value)} className='pl-10' />
            </div>

            {/* Tool Filter */}
            <Select value={toolFilter} onValueChange={setToolFilter}>
              <SelectTrigger className='w-full lg:w-48'>
                <Filter className='mr-2 h-4 w-4' />
                <SelectValue placeholder='All Tools' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Tools</SelectItem>
                <SelectItem value='blog-writer'>Blog Post Writer</SelectItem>
                <SelectItem value='social-media-generator'>Social Media Generator</SelectItem>
                <SelectItem value='email-writer'>Email Writer</SelectItem>
                <SelectItem value='product-description'>Product Description</SelectItem>
                <SelectItem value='seo-meta-generator'>SEO Meta Generator</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className='w-full lg:w-40'>
                <Calendar className='mr-2 h-4 w-4' />
                <SelectValue placeholder='All Time' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Time</SelectItem>
                <SelectItem value='today'>Today</SelectItem>
                <SelectItem value='week'>This Week</SelectItem>
                <SelectItem value='month'>This Month</SelectItem>
              </SelectContent>
            </Select>

            {/* Starred Toggle */}
            <Button variant={starredOnly ? 'default' : 'outline'} size='sm' onClick={() => setStarredOnly(!starredOnly)} className='shrink-0'>
              <Star className={`mr-2 h-4 w-4 ${starredOnly ? 'fill-current' : ''}`} />
              Starred
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className='space-y-4'>
        {filteredHistory.length === 0 ? (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-12'>
              <HistoryIcon className='mb-4 h-12 w-12 text-gray-400' />
              <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>No generations found</h3>
              <p className='text-center text-gray-600 dark:text-gray-300'>{search || toolFilter !== 'all' || starredOnly ? 'Try adjusting your filters' : 'Start creating content to see your history here'}</p>
            </CardContent>
          </Card>
        ) : (
          filteredHistory.map((generation) => {
            const IconComponent = toolIcons[generation.toolId] || FileText
            const colorClass = toolColors[generation.toolId] || toolColors['blog-writer']

            return (
              <Card key={generation.id} className='group transition-shadow hover:shadow-md cursor-pointer' onClick={() => setSelectedGeneration(generation)}>
                <CardContent className='p-4'>
                  <div className='flex items-start gap-4'>
                    {/* Tool Icon */}
                    <div className={`shrink-0 rounded-lg p-3 ${colorClass}`}>
                      <IconComponent className='h-5 w-5' />
                    </div>

                    {/* Content */}
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-start justify-between gap-4'>
                        <div>
                          <div className='flex items-center gap-2'>
                            <h3 className='font-semibold text-gray-900 dark:text-white line-clamp-1'>{generation.title}</h3>
                            {generation.starred && <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />}
                          </div>
                          <div className='mt-1 flex items-center gap-2 text-sm text-gray-500'>
                            <Badge variant='secondary' className='font-normal'>
                              {generation.toolName}
                            </Badge>
                            <span className='flex items-center gap-1'>
                              <Clock className='h-3 w-3' />
                              {formatDate(generation.createdAt)}
                            </span>
                            <span>•</span>
                            <span>{generation.creditsUsed} credits</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity' onClick={(e) => e.stopPropagation()}>
                          <Button variant='ghost' size='icon' className='h-8 w-8'>
                            <Copy className='h-4 w-4' />
                          </Button>
                          <Button variant='ghost' size='icon' className='h-8 w-8'>
                            <Download className='h-4 w-4' />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='icon' className='h-8 w-8'>
                                <MoreVertical className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>
                                <Eye className='mr-2 h-4 w-4' />
                                View Full
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className='mr-2 h-4 w-4' />
                                {generation.starred ? 'Unstar' : 'Star'}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className='mr-2 h-4 w-4' />
                                Copy to Clipboard
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className='mr-2 h-4 w-4' />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className='text-red-600'>
                                <Trash2 className='mr-2 h-4 w-4' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Preview */}
                      <p className='mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>{generation.preview}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {filteredHistory.length > 0 && (
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500'>
            Showing {filteredHistory.length} of {generationHistory.length} results
          </p>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' disabled>
              <ChevronLeft className='h-4 w-4' />
              Previous
            </Button>
            <Button variant='outline' size='sm' disabled>
              Next
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}

      {/* Generation Detail Dialog */}
      <Dialog open={!!selectedGeneration} onOpenChange={() => setSelectedGeneration(null)}>
        <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
          {selectedGeneration && (
            <>
              <DialogHeader>
                <div className='flex items-center gap-3'>
                  {(() => {
                    const IconComponent = toolIcons[selectedGeneration.toolId] || FileText
                    const colorClass = toolColors[selectedGeneration.toolId] || toolColors['blog-writer']
                    return (
                      <div className={`rounded-lg p-2 ${colorClass}`}>
                        <IconComponent className='h-5 w-5' />
                      </div>
                    )
                  })()}
                  <div>
                    <DialogTitle className='flex items-center gap-2'>
                      {selectedGeneration.title}
                      {selectedGeneration.starred && <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedGeneration.toolName} • {formatDate(selectedGeneration.createdAt)} • {selectedGeneration.creditsUsed} credits
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className='mt-4'>
                <div className='rounded-lg bg-gray-50 dark:bg-gray-800 p-4'>
                  <pre className='whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans'>{selectedGeneration.preview}</pre>
                </div>
                <div className='mt-4 flex justify-end gap-2'>
                  <Button variant='outline' size='sm'>
                    <Copy className='mr-2 h-4 w-4' />
                    Copy
                  </Button>
                  <Button variant='outline' size='sm'>
                    <Download className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                  <Button size='sm'>Use as Template</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
