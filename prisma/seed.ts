/**
 * Database Seed File
 *
 * Populates the database with initial data:
 * - AI Tools (5 priority tools)
 * - Subscription Plans
 * - Credit Packages
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clean existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Cleaning existing data...');
  await prisma.tool.deleteMany();
  await prisma.subscriptionPlan.deleteMany();
  await prisma.creditPackage.deleteMany();

  // Seed AI Tools
  console.log('📝 Seeding AI Tools...');

  const tools = await prisma.tool.createMany({
    data: [
      {
        slug: 'blog-writer',
        name: 'Blog Post Writer',
        description: 'Generate comprehensive, SEO-optimized blog posts in any tone and length',
        category: 'content-writing',
        icon: 'FileText',
        creditCost: 10,
        inputSchema: {},
        promptTemplate: 'Blog writer prompt template',
        defaultModel: 'gpt-4',
        defaultTemp: 0.7,
        defaultMaxTokens: 2000,
        featured: true,
        enabled: true,
        sortOrder: 1,
      },
      {
        slug: 'social-media-generator',
        name: 'Social Media Post Generator',
        description: 'Create engaging posts for Twitter, LinkedIn, Facebook, Instagram, and more',
        category: 'social-media',
        icon: 'Share2',
        creditCost: 3,
        inputSchema: {},
        promptTemplate: 'Social media prompt template',
        defaultModel: 'gpt-4',
        defaultTemp: 0.8,
        defaultMaxTokens: 1000,
        featured: true,
        enabled: true,
        sortOrder: 2,
      },
      {
        slug: 'email-writer',
        name: 'Email Writer',
        description: 'Craft compelling marketing, sales, and transactional emails',
        category: 'email-marketing',
        icon: 'Mail',
        creditCost: 5,
        inputSchema: {},
        promptTemplate: 'Email writer prompt template',
        defaultModel: 'gpt-4',
        defaultTemp: 0.7,
        defaultMaxTokens: 1500,
        featured: true,
        enabled: true,
        sortOrder: 3,
      },
      {
        slug: 'product-description',
        name: 'Product Description Generator',
        description: 'Write persuasive e-commerce product descriptions that convert',
        category: 'ecommerce',
        icon: 'ShoppingBag',
        creditCost: 5,
        inputSchema: {},
        promptTemplate: 'Product description prompt template',
        defaultModel: 'gpt-4',
        defaultTemp: 0.7,
        defaultMaxTokens: 800,
        featured: true,
        enabled: true,
        sortOrder: 4,
      },
      {
        slug: 'seo-meta-generator',
        name: 'SEO Meta Tags Generator',
        description: 'Generate optimized meta titles, descriptions, and tags for better rankings',
        category: 'seo',
        icon: 'Search',
        creditCost: 5,
        inputSchema: {},
        promptTemplate: 'SEO meta prompt template',
        defaultModel: 'gpt-4',
        defaultTemp: 0.6,
        defaultMaxTokens: 1000,
        featured: true,
        enabled: true,
        sortOrder: 5,
      },
    ],
  });

  console.log(`✅ Created ${tools.count} AI tools`);

  // Seed Subscription Plans
  console.log('\n💳 Seeding Subscription Plans...');

  const subscriptionPlans = await prisma.subscriptionPlan.createMany({
    data: [
      {
        name: 'Starter',
        description: 'Perfect for individuals and small projects',
        monthlyCredits: 1000,
        price: 1900, // $19.00 in cents
        stripePriceId: 'price_starter_monthly',
        features: {
          features: [
            '1,000 credits per month',
            'Access to all 130+ AI tools',
            'Blog & article writer',
            'Social media generator',
            'Email writer',
            'Basic support',
            'Generation history',
          ],
        },
        featured: false,
        enabled: true,
        sortOrder: 1,
      },
      {
        name: 'Professional',
        description: 'For professionals and growing businesses',
        monthlyCredits: 5000,
        price: 4900, // $49.00 in cents
        stripePriceId: 'price_pro_monthly',
        features: {
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
        },
        featured: true,
        enabled: true,
        sortOrder: 2,
      },
      {
        name: 'Enterprise',
        description: 'For teams and large organizations',
        monthlyCredits: 25000,
        price: 19900, // $199.00 in cents
        stripePriceId: 'price_enterprise_monthly',
        features: {
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
        },
        featured: false,
        enabled: true,
        sortOrder: 3,
      },
    ],
  });

  console.log(`✅ Created ${subscriptionPlans.count} subscription plans`);

  // Seed Credit Packages
  console.log('\n💰 Seeding Credit Packages...');

  const creditPackages = await prisma.creditPackage.createMany({
    data: [
      {
        name: 'Small Pack',
        description: 'Perfect for trying out the platform',
        credits: 500,
        price: 900, // $9.00 in cents
        stripePriceId: 'price_credits_500',
        featured: false,
        enabled: true,
        sortOrder: 1,
      },
      {
        name: 'Medium Pack',
        description: 'Great value for regular users',
        credits: 1500,
        price: 2500, // $25.00 in cents
        stripePriceId: 'price_credits_1500',
        featured: true,
        enabled: true,
        sortOrder: 2,
      },
      {
        name: 'Large Pack',
        description: 'Best value - Save 30%',
        credits: 3500,
        price: 4900, // $49.00 in cents
        stripePriceId: 'price_credits_3500',
        featured: false,
        enabled: true,
        sortOrder: 3,
      },
      {
        name: 'Enterprise Pack',
        description: 'Maximum credits - Save 45%',
        credits: 10000,
        price: 9900, // $99.00 in cents
        stripePriceId: 'price_credits_10000',
        featured: false,
        enabled: true,
        sortOrder: 4,
      },
    ],
  });

  console.log(`✅ Created ${creditPackages.count} credit packages`);

  console.log('\n✨ Database seeding completed successfully!\n');

  // Print summary
  console.log('📊 Summary:');
  console.log(`   - ${tools.count} AI Tools`);
  console.log(`   - ${subscriptionPlans.count} Subscription Plans`);
  console.log(`   - ${creditPackages.count} Credit Packages`);
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
