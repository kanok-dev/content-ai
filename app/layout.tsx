import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TRPCProvider } from '@/lib/trpc/provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ContentAI - AI-Powered Content Generation',
  description: 'Generate amazing content with 130+ AI-powered tools'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <TRPCProvider>
          {children}
          <Toaster richColors position='top-right' />
        </TRPCProvider>
      </body>
    </html>
  )
}
