import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToolCard } from '@/components/dashboard'
import { priorityTools } from '@/config/tools'
import { Wand2, History, TrendingUp, CreditCard, ArrowRight, Sparkles } from 'lucide-react'

// Stats data (in real app, this would come from API)
const stats = [
  {
    title: 'Available Credits',
    value: '1,250',
    icon: CreditCard,
    change: '+100 this month',
    href: '/dashboard/credits'
  },
  {
    title: 'Generations',
    value: '47',
    icon: Wand2,
    change: '+12 this week',
    href: '/dashboard/history'
  },
  {
    title: 'Credits Used',
    value: '350',
    icon: TrendingUp,
    change: 'This month',
    href: '/dashboard/credits'
  },
  {
    title: 'Saved Items',
    value: '23',
    icon: History,
    change: 'In history',
    href: '/dashboard/history'
  }
]

// Recent generations (mock data)
const recentGenerations = [
  {
    id: '1',
    tool: 'Blog Post Writer',
    title: '10 Tips for Better SEO',
    date: '2 hours ago'
  },
  {
    id: '2',
    tool: 'Social Media Generator',
    title: 'Product Launch Announcement',
    date: '5 hours ago'
  },
  {
    id: '3',
    tool: 'Email Writer',
    title: 'Welcome Email Sequence',
    date: 'Yesterday'
  }
]

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      {/* Welcome Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>Welcome back! 👋</h1>
          <p className='mt-1 text-gray-600'>Here&apos;s what&apos;s happening with your content today.</p>
        </div>
        <Button className='gap-2' asChild>
          <Link href='/dashboard/tools'>
            <Sparkles className='h-4 w-4' />
            Create Content
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className='transition-shadow hover:shadow-md'>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium text-gray-600'>{stat.title}</CardTitle>
                <stat.icon className='h-5 w-5 text-gray-400' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-gray-900'>{stat.value}</div>
                <p className='mt-1 text-xs text-gray-500'>{stat.change}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Featured Tools */}
        <div className='lg:col-span-2'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>Popular Tools</h2>
            <Button variant='ghost' size='sm' className='gap-1' asChild>
              <Link href='/dashboard/tools'>
                View All
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Button>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            {priorityTools.slice(0, 4).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>Recent Activity</h2>
            <Button variant='ghost' size='sm' className='gap-1' asChild>
              <Link href='/dashboard/history'>
                View All
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Button>
          </div>
          <Card>
            <CardContent className='divide-y divide-gray-100 p-0'>
              {recentGenerations.map((item) => (
                <div key={item.id} className='flex items-start gap-3 p-4 transition-colors hover:bg-gray-50'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600'>
                    <Wand2 className='h-5 w-5' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate font-medium text-gray-900'>{item.title}</p>
                    <p className='text-sm text-gray-500'>
                      {item.tool} · {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className='mt-6'>
            <h3 className='mb-3 text-sm font-semibold text-gray-900'>Quick Actions</h3>
            <div className='space-y-2'>
              <Button variant='outline' className='w-full justify-start gap-2' asChild>
                <Link href='/dashboard/tools/blog-writer'>
                  <Wand2 className='h-4 w-4' />
                  Write a Blog Post
                </Link>
              </Button>
              <Button variant='outline' className='w-full justify-start gap-2' asChild>
                <Link href='/dashboard/tools/social-media-generator'>
                  <Sparkles className='h-4 w-4' />
                  Generate Social Post
                </Link>
              </Button>
              <Button variant='outline' className='w-full justify-start gap-2' asChild>
                <Link href='/dashboard/credits'>
                  <CreditCard className='h-4 w-4' />
                  Buy More Credits
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
