'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToolCard } from '@/components/dashboard'
import { allTools, toolCategories, priorityTools } from '@/config/tools'
import { Search, Filter, Grid, List, Sparkles } from 'lucide-react'

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      const matchesSearch = search === '' || tool.name.toLowerCase().includes(search.toLowerCase()) || tool.description.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  // Separate featured and regular tools
  const featuredTools = filteredTools.filter((tool) => tool.featured && !tool.comingSoon)
  const activeTools = filteredTools.filter((tool) => !tool.featured && !tool.comingSoon)
  const comingSoonTools = filteredTools.filter((tool) => tool.comingSoon)

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div>
        <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>AI Tools</h1>
        <p className='mt-1 text-gray-600'>Choose from 130+ AI-powered tools to create amazing content</p>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='relative flex-1 sm:max-w-md'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <Input type='search' placeholder='Search tools...' value={search} onChange={(e) => setSearch(e.target.value)} className='pl-10' />
        </div>
        <div className='flex items-center gap-2'>
          <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size='icon' onClick={() => setViewMode('grid')}>
            <Grid className='h-4 w-4' />
          </Button>
          <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size='icon' onClick={() => setViewMode('list')}>
            <List className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className='w-full'>
        <TabsList className='h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0'>
          <TabsTrigger value='all' className='rounded-full border border-gray-200 data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700'>
            All Tools
            <Badge variant='secondary' className='ml-2'>
              {allTools.length}
            </Badge>
          </TabsTrigger>
          {toolCategories.map((category) => {
            const count = allTools.filter((t) => t.category === category.id).length
            return (
              <TabsTrigger key={category.id} value={category.id} className='rounded-full border border-gray-200 data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700'>
                {category.name}
                <Badge variant='secondary' className='ml-2'>
                  {count}
                </Badge>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className='mt-6'>
          {/* Featured Tools Section */}
          {featuredTools.length > 0 && (
            <div className='mb-8'>
              <div className='mb-4 flex items-center gap-2'>
                <Sparkles className='h-5 w-5 text-yellow-500' />
                <h2 className='text-lg font-semibold text-gray-900'>Featured Tools</h2>
              </div>
              <div className={viewMode === 'grid' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-3'}>
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} variant={viewMode === 'list' ? 'compact' : 'default'} />
                ))}
              </div>
            </div>
          )}

          {/* Active Tools */}
          {activeTools.length > 0 && (
            <div className='mb-8'>
              <h2 className='mb-4 text-lg font-semibold text-gray-900'>Available Tools</h2>
              <div className={viewMode === 'grid' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-3'}>
                {activeTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} variant={viewMode === 'list' ? 'compact' : 'default'} />
                ))}
              </div>
            </div>
          )}

          {/* Coming Soon Tools */}
          {comingSoonTools.length > 0 && (
            <div>
              <h2 className='mb-4 text-lg font-semibold text-gray-500'>Coming Soon</h2>
              <div className={viewMode === 'grid' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-3'}>
                {comingSoonTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} variant={viewMode === 'list' ? 'compact' : 'default'} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className='flex flex-col items-center justify-center py-12'>
              <Search className='mb-4 h-12 w-12 text-gray-300' />
              <h3 className='mb-2 text-lg font-semibold text-gray-900'>No tools found</h3>
              <p className='text-gray-600'>Try adjusting your search or filters</p>
              <Button
                variant='outline'
                className='mt-4'
                onClick={() => {
                  setSearch('')
                  setSelectedCategory('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
