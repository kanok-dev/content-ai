'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Copy, Download, Sparkles, CreditCard, History, RefreshCw, Check, Loader2 } from 'lucide-react'
import { getToolBySlug } from '@/config/tools'
import { toast } from 'sonner'

// Tool-specific form configurations
const toolForms: Record<string, React.ReactNode> = {
  'blog-writer': <BlogWriterForm />,
  'social-media-generator': <SocialMediaForm />,
  'email-writer': <EmailWriterForm />,
  'product-description': <ProductDescriptionForm />,
  'seo-meta-generator': <SeoMetaForm />
}

export default function ToolPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const tool = getToolBySlug(slug)

  const [output, setOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!tool) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <h1 className='text-2xl font-bold text-gray-900'>Tool not found</h1>
        <p className='mt-2 text-gray-600'>The requested tool doesn&apos;t exist.</p>
        <Button className='mt-4' asChild>
          <Link href='/dashboard/tools'>Browse Tools</Link>
        </Button>
      </div>
    )
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setOutput(
      `This is a sample generated output for ${tool.name}.\n\nIn a real implementation, this would call the AI API and return the generated content based on your inputs.\n\nThe content would be tailored specifically to your requirements and use advanced AI models like GPT-4 or Claude to produce high-quality results.`
    )
    setIsGenerating(false)
    toast.success('Content generated successfully!')
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div className='flex items-start gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='/dashboard/tools'>
              <ArrowLeft className='h-5 w-5' />
            </Link>
          </Button>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>{tool.name}</h1>
            <p className='mt-1 text-gray-600'>{tool.description}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Badge variant='secondary' className='gap-1'>
            <CreditCard className='h-3 w-3' />
            {tool.creditCost} credits
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            {toolForms[slug] || <DefaultForm toolName={tool.name} />}
            <Button className='mt-6 w-full gap-2' size='lg' onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className='h-4 w-4' />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Output</CardTitle>
            {output && (
              <div className='flex gap-2'>
                <Button variant='outline' size='sm' className='gap-1' onClick={handleGenerate} disabled={isGenerating}>
                  <RefreshCw className='h-4 w-4' />
                  Regenerate
                </Button>
                <Button variant='outline' size='sm' className='gap-1' onClick={handleCopy}>
                  {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {output ? (
              <div className='min-h-[300px] whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-gray-800'>{output}</div>
            ) : (
              <div className='flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center'>
                <Sparkles className='mb-4 h-12 w-12 text-gray-300' />
                <p className='text-gray-500'>Fill in the form and click &quot;Generate Content&quot; to see your AI-generated content here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Default form for tools without specific forms
function DefaultForm({ toolName }: { toolName: string }) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='topic'>Topic / Subject</Label>
        <Input id='topic' placeholder={`Enter the topic for your ${toolName.toLowerCase()}`} />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='description'>Additional Details</Label>
        <Textarea id='description' placeholder='Provide any additional context or requirements...' rows={4} />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='tone'>Tone</Label>
        <Select defaultValue='professional'>
          <SelectTrigger>
            <SelectValue placeholder='Select tone' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='professional'>Professional</SelectItem>
            <SelectItem value='casual'>Casual</SelectItem>
            <SelectItem value='friendly'>Friendly</SelectItem>
            <SelectItem value='formal'>Formal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// Blog Writer Form
function BlogWriterForm() {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='topic'>Blog Topic</Label>
        <Input id='topic' placeholder='e.g., 10 Tips for Better SEO' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='keywords'>Keywords (comma separated)</Label>
        <Input id='keywords' placeholder='e.g., SEO, marketing, content' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='tone'>Tone</Label>
          <Select defaultValue='professional'>
            <SelectTrigger>
              <SelectValue placeholder='Select tone' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='professional'>Professional</SelectItem>
              <SelectItem value='casual'>Casual</SelectItem>
              <SelectItem value='friendly'>Friendly</SelectItem>
              <SelectItem value='authoritative'>Authoritative</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='length'>Length</Label>
          <Select defaultValue='medium'>
            <SelectTrigger>
              <SelectValue placeholder='Select length' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='short'>Short (~500 words)</SelectItem>
              <SelectItem value='medium'>Medium (~1000 words)</SelectItem>
              <SelectItem value='long'>Long (~2000 words)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex items-center justify-between rounded-lg border p-3'>
        <Label htmlFor='outline' className='cursor-pointer'>
          Include outline
        </Label>
        <Switch id='outline' />
      </div>
    </div>
  )
}

// Social Media Form
function SocialMediaForm() {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='platform'>Platform</Label>
        <Select defaultValue='twitter'>
          <SelectTrigger>
            <SelectValue placeholder='Select platform' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='twitter'>Twitter / X</SelectItem>
            <SelectItem value='linkedin'>LinkedIn</SelectItem>
            <SelectItem value='facebook'>Facebook</SelectItem>
            <SelectItem value='instagram'>Instagram</SelectItem>
            <SelectItem value='threads'>Threads</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='topic'>Topic / Message</Label>
        <Textarea id='topic' placeholder='What do you want to post about?' rows={3} />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='tone'>Tone</Label>
        <Select defaultValue='casual'>
          <SelectTrigger>
            <SelectValue placeholder='Select tone' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='professional'>Professional</SelectItem>
            <SelectItem value='casual'>Casual</SelectItem>
            <SelectItem value='witty'>Witty</SelectItem>
            <SelectItem value='inspirational'>Inspirational</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-4'>
        <div className='flex items-center justify-between rounded-lg border p-3'>
          <Label htmlFor='hashtags' className='cursor-pointer'>
            Include hashtags
          </Label>
          <Switch id='hashtags' defaultChecked />
        </div>
        <div className='flex items-center justify-between rounded-lg border p-3'>
          <Label htmlFor='emojis' className='cursor-pointer'>
            Include emojis
          </Label>
          <Switch id='emojis' defaultChecked />
        </div>
      </div>
      <div className='space-y-2'>
        <Label>Number of variations: 3</Label>
        <Slider defaultValue={[3]} min={1} max={5} step={1} />
      </div>
    </div>
  )
}

// Email Writer Form
function EmailWriterForm() {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='emailType'>Email Type</Label>
        <Select defaultValue='marketing'>
          <SelectTrigger>
            <SelectValue placeholder='Select type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='marketing'>Marketing</SelectItem>
            <SelectItem value='sales'>Sales</SelectItem>
            <SelectItem value='cold-outreach'>Cold Outreach</SelectItem>
            <SelectItem value='follow-up'>Follow Up</SelectItem>
            <SelectItem value='newsletter'>Newsletter</SelectItem>
            <SelectItem value='welcome'>Welcome</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='purpose'>Main Purpose / Message</Label>
        <Textarea id='purpose' placeholder="What's the main goal of this email?" rows={3} />
      </div>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='recipientName'>Recipient Name (optional)</Label>
          <Input id='recipientName' placeholder='e.g., John' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='senderName'>Sender Name (optional)</Label>
          <Input id='senderName' placeholder='e.g., Sarah' />
        </div>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='tone'>Tone</Label>
        <Select defaultValue='professional'>
          <SelectTrigger>
            <SelectValue placeholder='Select tone' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='professional'>Professional</SelectItem>
            <SelectItem value='friendly'>Friendly</SelectItem>
            <SelectItem value='persuasive'>Persuasive</SelectItem>
            <SelectItem value='formal'>Formal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center justify-between rounded-lg border p-3'>
        <Label htmlFor='subjectLine' className='cursor-pointer'>
          Generate subject line
        </Label>
        <Switch id='subjectLine' defaultChecked />
      </div>
    </div>
  )
}

// Product Description Form
function ProductDescriptionForm() {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='productName'>Product Name</Label>
        <Input id='productName' placeholder='e.g., Wireless Bluetooth Headphones' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='category'>Product Category</Label>
        <Input id='category' placeholder='e.g., Electronics, Fashion, Home' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='features'>Key Features (one per line)</Label>
        <Textarea
          id='features'
          placeholder='Active noise cancellation&#10;40-hour battery life&#10;Premium sound quality'
          rows={4}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='audience'>Target Audience</Label>
        <Input id='audience' placeholder='e.g., Young professionals, Music lovers' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='tone'>Tone</Label>
          <Select defaultValue='professional'>
            <SelectTrigger>
              <SelectValue placeholder='Select tone' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='professional'>Professional</SelectItem>
              <SelectItem value='exciting'>Exciting</SelectItem>
              <SelectItem value='luxurious'>Luxurious</SelectItem>
              <SelectItem value='friendly'>Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='length'>Length</Label>
          <Select defaultValue='medium'>
            <SelectTrigger>
              <SelectValue placeholder='Select length' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='short'>Short (50-100 words)</SelectItem>
              <SelectItem value='medium'>Medium (150-250 words)</SelectItem>
              <SelectItem value='long'>Long (300+ words)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

// SEO Meta Generator Form
function SeoMetaForm() {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='pageTitle'>Page Title</Label>
        <Input id='pageTitle' placeholder='e.g., Best Running Shoes 2024' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='pageContent'>Page Content Summary</Label>
        <Textarea id='pageContent' placeholder='Briefly describe what your page is about...' rows={4} />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='primaryKeyword'>Primary Keyword</Label>
        <Input id='primaryKeyword' placeholder='e.g., running shoes' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='secondaryKeywords'>Secondary Keywords (comma separated)</Label>
        <Input id='secondaryKeywords' placeholder='e.g., best sneakers, athletic footwear' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='pageType'>Page Type</Label>
        <Select defaultValue='blog'>
          <SelectTrigger>
            <SelectValue placeholder='Select page type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='homepage'>Homepage</SelectItem>
            <SelectItem value='product'>Product Page</SelectItem>
            <SelectItem value='blog'>Blog Post</SelectItem>
            <SelectItem value='category'>Category Page</SelectItem>
            <SelectItem value='service'>Service Page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
