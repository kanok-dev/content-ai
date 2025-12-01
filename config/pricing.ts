/**
 * Pricing Configuration
 *
 * Defines pricing tiers and credit packages
 */

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number; // Monthly price in USD
  yearlyPrice?: number;
  credits: number; // Monthly credits
  stripePriceId?: string;
  stripeYearlyPriceId?: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small projects',
    price: 19,
    yearlyPrice: 190, // ~16.67/mo
    credits: 1000,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
    stripeYearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PRICE_ID,
    features: [
      '1,000 credits per month',
      'Access to all 130+ AI tools',
      'Blog & article writer',
      'Social media generator',
      'Email writer',
      'Basic support',
      'Generation history',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For professionals and growing businesses',
    price: 49,
    yearlyPrice: 490, // ~40.83/mo
    credits: 5000,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    stripeYearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID,
    popular: true,
    features: [
      '5,000 credits per month',
      'All Starter features',
      'Priority AI processing',
      'Advanced SEO tools',
      'Priority support',
      'Custom brand voice',
      'Team collaboration (3 seats)',
      'API access',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For teams and large organizations',
    price: 199,
    yearlyPrice: 1990, // ~165.83/mo
    credits: 25000,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID,
    stripeYearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
    features: [
      '25,000 credits per month',
      'All Professional features',
      'Dedicated account manager',
      'Custom AI model training',
      'White-label options',
      'Unlimited team seats',
      'Advanced analytics',
      'Custom integrations',
      'SLA guarantee',
      'Priority phone support',
    ],
    cta: 'Contact Sales',
  },
];

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number; // One-time price in USD
  stripePriceId?: string;
  popular?: boolean;
  savings?: string; // e.g., "Save 20%"
}

export const creditPackages: CreditPackage[] = [
  {
    id: 'small',
    name: 'Small Pack',
    credits: 500,
    price: 9,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_CREDITS_500_PRICE_ID,
  },
  {
    id: 'medium',
    name: 'Medium Pack',
    credits: 1500,
    price: 25,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_CREDITS_1500_PRICE_ID,
    popular: true,
    savings: 'Save 17%',
  },
  {
    id: 'large',
    name: 'Large Pack',
    credits: 3500,
    price: 49,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_CREDITS_3500_PRICE_ID,
    savings: 'Save 30%',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 10000,
    price: 99,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_CREDITS_10000_PRICE_ID,
    savings: 'Save 45%',
  },
];

// Credit cost per tool (can be overridden in database)
export const defaultCreditCosts = {
  'blog-writer': 10,
  'social-media-generator': 3,
  'email-writer': 5,
  'product-description': 5,
  'seo-meta-generator': 5,
  // Add more as needed
};
