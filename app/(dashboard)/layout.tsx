import { Sidebar, Header } from '@/components/dashboard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen overflow-hidden bg-gray-50'>
      {/* Sidebar - Hidden on mobile */}
      <div className='hidden lg:block'>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        <Header />
        <main className='flex-1 overflow-y-auto p-4 lg:p-6'>{children}</main>
      </div>
    </div>
  )
}
