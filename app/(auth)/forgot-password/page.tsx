'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2, Mail, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
    toast.success('Password reset email sent!')
  }

  if (isSubmitted) {
    return (
      <div className='space-y-6 text-center'>
        {/* Success Icon */}
        <div className='mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center'>
          <CheckCircle2 className='h-8 w-8 text-green-600' />
        </div>

        {/* Header */}
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-gray-900'>Check your email</h1>
          <p className='text-gray-600'>
            We&apos;ve sent a password reset link to
            <br />
            <span className='font-medium text-gray-900'>{email}</span>
          </p>
        </div>

        {/* Instructions */}
        <div className='bg-blue-50 rounded-lg p-4 text-sm text-blue-700'>
          <p>Click the link in the email to reset your password. If you don&apos;t see the email, check your spam folder.</p>
        </div>

        {/* Actions */}
        <div className='space-y-3'>
          <Button variant='outline' className='w-full' onClick={() => setIsSubmitted(false)}>
            <Mail className='mr-2 h-4 w-4' />
            Try a different email
          </Button>
          <Link href='/login' className='block text-sm text-blue-600 hover:underline'>
            Back to sign in
          </Link>
        </div>

        {/* Resend */}
        <p className='text-sm text-gray-500'>
          Didn&apos;t receive the email?{' '}
          <button
            className='text-blue-600 hover:underline'
            onClick={async () => {
              setIsLoading(true)
              await new Promise((resolve) => setTimeout(resolve, 1500))
              setIsLoading(false)
              toast.success('Email resent!')
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Click to resend'}
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Back Link */}
      <Link href='/login' className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900'>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back to sign in
      </Link>

      {/* Header */}
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold text-gray-900'>Forgot your password?</h1>
        <p className='text-gray-600'>No worries! Enter your email address and we&apos;ll send you a link to reset your password.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email address</Label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <Input id='email' type='email' placeholder='you@example.com' className='pl-10 h-11' value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
          </div>
        </div>

        <Button type='submit' className='w-full h-11' disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Sending reset link...
            </>
          ) : (
            'Send reset link'
          )}
        </Button>
      </form>

      {/* Help Text */}
      <p className='text-center text-sm text-gray-500'>
        Remember your password?{' '}
        <Link href='/login' className='font-medium text-blue-600 hover:underline'>
          Sign in
        </Link>
      </p>
    </div>
  )
}
