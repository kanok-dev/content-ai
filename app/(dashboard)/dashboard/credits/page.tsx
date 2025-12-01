'use client'

import { useState } from 'react'
import { CreditCard, Sparkles, Check, Zap, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const creditPackages = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 500,
    price: 9,
    pricePerCredit: 0.018,
    popular: false,
    description: 'Perfect for trying out our tools'
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 2000,
    price: 29,
    pricePerCredit: 0.0145,
    popular: true,
    description: 'Most popular for regular users',
    savings: '20%'
  },
  {
    id: 'business',
    name: 'Business',
    credits: 5000,
    price: 59,
    pricePerCredit: 0.0118,
    popular: false,
    description: 'Best value for heavy users',
    savings: '35%'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: 15000,
    price: 149,
    pricePerCredit: 0.0099,
    popular: false,
    description: 'For teams and agencies',
    savings: '45%'
  }
]

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    credits: 100,
    features: ['100 credits/month', 'Access to 5 basic tools', 'Standard generation speed', 'Email support']
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    credits: 1000,
    features: ['1,000 credits/month', 'Access to all tools', 'Priority generation', 'Email support', 'Export to formats']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    credits: 5000,
    popular: true,
    features: ['5,000 credits/month', 'Access to all tools', 'Fastest generation', 'Priority support', 'API access', 'Team collaboration', 'Custom templates']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 149,
    credits: 20000,
    features: ['20,000 credits/month', 'Everything in Pro', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'Volume discounts', 'White-label options']
  }
]

const transactions = [
  {
    id: '1',
    type: 'purchase',
    description: 'Credit Package - Pro',
    amount: 2000,
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2',
    type: 'usage',
    description: 'Blog Post Writer',
    amount: -10,
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: '3',
    type: 'usage',
    description: 'Social Media Generator',
    amount: -3,
    date: '2024-01-14',
    status: 'completed'
  },
  {
    id: '4',
    type: 'bonus',
    description: 'Welcome Bonus',
    amount: 100,
    date: '2024-01-10',
    status: 'completed'
  },
  {
    id: '5',
    type: 'usage',
    description: 'Email Writer',
    amount: -5,
    date: '2024-01-14',
    status: 'completed'
  },
  {
    id: '6',
    type: 'usage',
    description: 'Product Description',
    amount: -5,
    date: '2024-01-13',
    status: 'completed'
  }
]

export default function CreditsPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const currentCredits = 1250
  const currentPlan = 'free'

  return (
    <div className='space-y-8'>
      {/* Page Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Credits & Billing</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>Manage your credits, view transactions, and upgrade your plan</p>
      </div>

      {/* Credit Balance Overview */}
      <div className='grid gap-6 md:grid-cols-3'>
        <Card className='border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Available Credits</p>
                <p className='mt-1 text-4xl font-bold text-gray-900 dark:text-white'>{currentCredits.toLocaleString()}</p>
              </div>
              <div className='rounded-full bg-blue-100 p-3 dark:bg-blue-800'>
                <CreditCard className='h-6 w-6 text-blue-600 dark:text-blue-400' />
              </div>
            </div>
            <div className='mt-4 flex items-center text-sm text-green-600'>
              <TrendingUp className='mr-1 h-4 w-4' />
              +100 credits this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Credits Used (This Month)</p>
                <p className='mt-1 text-4xl font-bold text-gray-900 dark:text-white'>350</p>
              </div>
              <div className='rounded-full bg-orange-100 p-3 dark:bg-orange-800'>
                <Zap className='h-6 w-6 text-orange-600 dark:text-orange-400' />
              </div>
            </div>
            <div className='mt-4 flex items-center text-sm text-gray-500'>
              <Clock className='mr-1 h-4 w-4' />
              Resets in 15 days
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Current Plan</p>
                <p className='mt-1 text-4xl font-bold text-gray-900 dark:text-white capitalize'>{currentPlan}</p>
              </div>
              <div className='rounded-full bg-purple-100 p-3 dark:bg-purple-800'>
                <Sparkles className='h-6 w-6 text-purple-600 dark:text-purple-400' />
              </div>
            </div>
            <Button className='mt-4 w-full' variant='outline'>
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Packages and Subscriptions */}
      <Tabs defaultValue='packages' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-3 max-w-md'>
          <TabsTrigger value='packages'>Credit Packages</TabsTrigger>
          <TabsTrigger value='subscriptions'>Subscriptions</TabsTrigger>
          <TabsTrigger value='history'>History</TabsTrigger>
        </TabsList>

        {/* Credit Packages */}
        <TabsContent value='packages' className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Buy Credit Packages</h2>
              <p className='text-sm text-gray-600 dark:text-gray-400'>One-time purchases, never expire</p>
            </div>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {creditPackages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-blue-500 shadow-lg ring-1 ring-blue-500' : ''}`}>
                {pkg.popular && <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600'>Most Popular</Badge>}
                {pkg.savings && (
                  <Badge variant='secondary' className='absolute -top-3 right-4 bg-green-100 text-green-700'>
                    Save {pkg.savings}
                  </Badge>
                )}
                <CardHeader className='text-center'>
                  <CardTitle className='text-lg'>{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className='text-center'>
                  <div className='mb-4'>
                    <span className='text-4xl font-bold text-gray-900 dark:text-white'>${pkg.price}</span>
                  </div>
                  <div className='mb-4 flex items-center justify-center gap-2'>
                    <CreditCard className='h-5 w-5 text-blue-600' />
                    <span className='text-2xl font-semibold text-blue-600'>{pkg.credits.toLocaleString()}</span>
                    <span className='text-gray-500'>credits</span>
                  </div>
                  <p className='text-xs text-gray-500'>${pkg.pricePerCredit.toFixed(4)} per credit</p>
                </CardContent>
                <CardFooter>
                  <Button className='w-full' variant={pkg.popular ? 'default' : 'outline'}>
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Subscription Plans */}
        <TabsContent value='subscriptions' className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Subscription Plans</h2>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Monthly credits that renew automatically</p>
            </div>
            <div className='flex items-center gap-2'>
              <Label htmlFor='billing-toggle' className='text-sm'>
                Monthly
              </Label>
              <Switch id='billing-toggle' checked={billingPeriod === 'yearly'} onCheckedChange={(checked) => setBillingPeriod(checked ? 'yearly' : 'monthly')} />
              <Label htmlFor='billing-toggle' className='text-sm'>
                Yearly{' '}
                <Badge variant='secondary' className='ml-1'>
                  Save 20%
                </Badge>
              </Label>
            </div>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {subscriptionPlans.map((plan) => {
              const displayPrice = billingPeriod === 'yearly' ? Math.round(plan.price * 0.8) : plan.price
              const isCurrentPlan = plan.id === currentPlan

              return (
                <Card key={plan.id} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg ring-1 ring-blue-500' : ''} ${isCurrentPlan ? 'border-green-500 ring-1 ring-green-500' : ''}`}>
                  {plan.popular && !isCurrentPlan && <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600'>Most Popular</Badge>}
                  {isCurrentPlan && <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600'>Current Plan</Badge>}
                  <CardHeader className='text-center'>
                    <CardTitle className='text-lg'>{plan.name}</CardTitle>
                    <div className='mt-2'>
                      <span className='text-4xl font-bold text-gray-900 dark:text-white'>${displayPrice}</span>
                      <span className='text-gray-500'>/{billingPeriod === 'yearly' ? 'mo' : 'month'}</span>
                    </div>
                    {billingPeriod === 'yearly' && plan.price > 0 && <p className='text-xs text-green-600'>Billed ${displayPrice * 12}/year</p>}
                  </CardHeader>
                  <CardContent>
                    <div className='mb-4 text-center'>
                      <span className='text-2xl font-semibold text-blue-600'>{plan.credits.toLocaleString()}</span>
                      <span className='text-gray-500 text-sm'> credits/month</span>
                    </div>
                    <ul className='space-y-2'>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className='flex items-start gap-2 text-sm'>
                          <Check className='h-4 w-4 mt-0.5 text-green-500 shrink-0' />
                          <span className='text-gray-600 dark:text-gray-300'>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className='w-full' variant={isCurrentPlan ? 'secondary' : plan.popular ? 'default' : 'outline'} disabled={isCurrentPlan}>
                      {isCurrentPlan ? 'Current Plan' : plan.price === 0 ? 'Get Started' : 'Upgrade'}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Transaction History */}
        <TabsContent value='history' className='space-y-6'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Transaction History</h2>
            <p className='text-sm text-gray-600 dark:text-gray-400'>Your recent credit transactions</p>
          </div>

          <Card>
            <CardContent className='p-0'>
              <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                {transactions.map((tx) => (
                  <div key={tx.id} className='flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800'>
                    <div className='flex items-center gap-4'>
                      <div className={`rounded-full p-2 ${tx.type === 'purchase' ? 'bg-green-100 dark:bg-green-900' : tx.type === 'bonus' ? 'bg-purple-100 dark:bg-purple-900' : 'bg-orange-100 dark:bg-orange-900'}`}>
                        {tx.type === 'purchase' ? (
                          <ArrowUpRight className={`h-4 w-4 text-green-600 dark:text-green-400`} />
                        ) : tx.type === 'bonus' ? (
                          <Gift className={`h-4 w-4 text-purple-600 dark:text-purple-400`} />
                        ) : (
                          <ArrowDownRight className={`h-4 w-4 text-orange-600 dark:text-orange-400`} />
                        )}
                      </div>
                      <div>
                        <p className='font-medium text-gray-900 dark:text-white'>{tx.description}</p>
                        <p className='text-sm text-gray-500'>{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                      {tx.amount > 0 ? '+' : ''}
                      {tx.amount.toLocaleString()} credits
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className='justify-center border-t py-4'>
              <Button variant='ghost'>View All Transactions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
