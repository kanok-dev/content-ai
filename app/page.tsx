import { Header, Hero, FeaturesGrid, HowItWorks, PricingTable, FAQ, CTA, Footer } from '@/components/marketing'

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>
        <Hero />
        <FeaturesGrid />
        <HowItWorks />
        <PricingTable />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
