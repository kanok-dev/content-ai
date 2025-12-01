# ContentAI - AI-Powered Content Generation Platform

A modern SaaS platform for AI-powered content generation, built with Next.js 15, tRPC, Prisma, and the Vercel AI SDK.

🌐 **Live Demo:** [https://content-ai-green-ten.vercel.app](https://content-ai-green-ten.vercel.app)

## Overview

ContentAI is a comprehensive content generation platform similar to JustDone.ai, offering 130+ AI-powered tools for creating blog posts, social media content, emails, product descriptions, SEO metadata, and more. The platform features a credit-based system, subscription management, and Stripe payment integration.

## Pages & Navigation

### Live URLs

| Page | URL |
|------|-----|
| **Homepage** | [https://content-ai-green-ten.vercel.app](https://content-ai-green-ten.vercel.app) |
| **Tools Catalog** | [https://content-ai-green-ten.vercel.app/tools](https://content-ai-green-ten.vercel.app/tools) |
| **About Us** | [https://content-ai-green-ten.vercel.app/about](https://content-ai-green-ten.vercel.app/about) |
| **Login** | [https://content-ai-green-ten.vercel.app/login](https://content-ai-green-ten.vercel.app/login) |
| **Sign Up** | [https://content-ai-green-ten.vercel.app/signup](https://content-ai-green-ten.vercel.app/signup) |
| **Forgot Password** | [https://content-ai-green-ten.vercel.app/forgot-password](https://content-ai-green-ten.vercel.app/forgot-password) |
| **Dashboard** | [https://content-ai-green-ten.vercel.app/dashboard](https://content-ai-green-ten.vercel.app/dashboard) |
| **Dashboard - Tools** | [https://content-ai-green-ten.vercel.app/dashboard/tools](https://content-ai-green-ten.vercel.app/dashboard/tools) |
| **Dashboard - Credits** | [https://content-ai-green-ten.vercel.app/dashboard/credits](https://content-ai-green-ten.vercel.app/dashboard/credits) |
| **Dashboard - History** | [https://content-ai-green-ten.vercel.app/dashboard/history](https://content-ai-green-ten.vercel.app/dashboard/history) |
| **Dashboard - Settings** | [https://content-ai-green-ten.vercel.app/dashboard/settings](https://content-ai-green-ten.vercel.app/dashboard/settings) |

### Route Structure

```
/                           # Homepage (Landing Page)
/tools                      # Public tools catalog
/about                      # About us page
/login                      # User login
/signup                     # User registration
/forgot-password            # Password reset
/dashboard                  # Main dashboard (protected)
/dashboard/tools            # AI tools list (protected)
/dashboard/tools/[slug]     # Individual tool interface (protected)
/dashboard/credits          # Credits & billing (protected)
/dashboard/history          # Generation history (protected)
/dashboard/settings         # User settings (protected)
```

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15.0.3 (App Router) |
| **UI** | React 19.0.0, TailwindCSS |
| **API** | tRPC v11 (Type-safe API) |
| **Database** | PostgreSQL with Prisma ORM v5.22.0 |
| **AI** | Vercel AI SDK (OpenAI, Anthropic) |
| **Auth** | NextAuth v5 |
| **Payments** | Stripe |
| **Email** | Resend |
| **Type Safety** | TypeScript, Zod validation |

## Features

### Core Features

- 130+ AI content generation tools (5 implemented, 125+ planned)
- Credit-based usage system with atomic transactions
- Subscription plans (Starter, Professional, Enterprise)
- One-time credit packages
- User authentication with multiple providers
- Payment processing via Stripe webhooks
- Generation history and favorites
- Usage analytics and dashboard
- Admin tools for credit management

### Implemented AI Tools

| Tool | Credits | Description |
|------|---------|-------------|
| Blog Post Writer | 10 | SEO-optimized blog posts |
| Social Media Generator | 3 | Multi-platform posts |
| Email Writer | 5 | Marketing and sales emails |
| Product Description | 5 | E-commerce descriptions |
| SEO Meta Tags | 5 | Title and meta descriptions |

## Project Structure

```
my-port-demo-nextjs/
|-- app/                          # Next.js App Router
|   |-- api/                      # API routes
|   |   |-- trpc/[trpc]/          # tRPC endpoint handler
|   |   +-- webhooks/stripe/      # Stripe webhook handler
|   |-- layout.tsx                # Root layout with providers
|   +-- page.tsx                  # Homepage
|-- server/                       # Backend logic
|   |-- api/
|   |   |-- root.ts               # tRPC root router
|   |   |-- trpc.ts               # tRPC configuration
|   |   +-- routers/              # API routers
|   |       |-- credits.ts        # Credit management
|   |       |-- ai-tools.ts       # AI tool operations
|   |       |-- history.ts        # Generation history
|   |       |-- analytics.ts      # Usage analytics
|   |       +-- user.ts           # User profile
|   |-- services/                 # Business logic
|   |   |-- credits/
|   |   |   +-- credit-manager.ts # Credit system
|   |   +-- ai/
|   |       |-- ai-service.ts     # Base AI service
|   |       +-- tools/            # AI tool implementations
|   +-- db.ts                     # Prisma client
|-- prisma/
|   |-- schema.prisma             # Database schema (12+ models)
|   +-- seed.ts                   # Database seeding
|-- lib/
|   |-- auth.ts                   # NextAuth configuration
|   |-- trpc/                     # tRPC client setup
|   +-- utils.ts                  # Utilities
|-- config/
|   |-- tools.ts                  # AI tools catalog
|   |-- pricing.ts                # Pricing plans
|   +-- site.ts                   # Site configuration
+-- .env.local                    # Environment variables
```

## Database Schema

### Core Models

| Model | Description |
|-------|-------------|
| User | User accounts and profiles |
| Credit | User credit balances |
| CreditTransaction | Transaction history |
| Tool | AI tool definitions |
| AIGeneration | Generation history |
| SubscriptionPlan | Subscription tiers |
| CreditPackage | One-time credit packages |
| UserSubscription | Active subscriptions |
| Payment | Payment records |
| Webhook | Webhook logs |

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key (for AI generation)
- Stripe account (for payments)

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Setup environment variables:**

Create `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AI Providers
OPENAI_API_KEY="sk-your-openai-key"
ANTHROPIC_API_KEY="sk-ant-your-anthropic-key"

# Stripe (Test Mode)
STRIPE_SECRET_KEY="sk_test_your-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Email
RESEND_API_KEY="re_your-resend-key"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="ContentAI"
```

Create `.env` file for Prisma CLI:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

> **Note:** URL-encode special characters in passwords (e.g., `$` becomes `%24`)

3. **Setup database:**

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with initial data
npm run db:seed
```

4. **Start development server:**

```bash
npm run dev
```

Server will start at http://localhost:3000

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Database commands
npm run db:push          # Push schema changes
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio (database GUI)
npm run db:migrate       # Create migration

# Code quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
```

## API Endpoints

### tRPC API Structure

Base URL: `http://localhost:3000/api/trpc/[procedure]`

> **Important:** The base route `/api/trpc` returns 404 by design. Always include a procedure name.

### Available Endpoints

#### AI Tools (`aiTools`)

```bash
# Get all tools
curl 'http://localhost:3000/api/trpc/aiTools.getAllTools?input=%7B%22json%22%3A%7B%7D%7D'

# Get categories
curl 'http://localhost:3000/api/trpc/aiTools.getCategories?input=%7B%22json%22%3A%7B%7D%7D'

# Get featured tools
curl 'http://localhost:3000/api/trpc/aiTools.getFeaturedTools?input=%7B%22json%22%3A%7B%22limit%22%3A3%7D%7D'

# Generate blog post (requires OpenAI key)
curl -X POST 'http://localhost:3000/api/trpc/aiTools.generateBlogPost' \
  -H 'Content-Type: application/json' \
  -d '{"json":{"topic":"AI in 2025","tone":"professional","length":"medium"}}'
```

#### Credits (`credits`)

| Endpoint | Description |
|----------|-------------|
| `credits.getBalance` | Get user credit balance |
| `credits.getAccountDetails` | Get account info |
| `credits.getTransactionHistory` | Get transaction history |
| `credits.adminGrantCredits` | Grant credits (admin) |

#### History (`history`)

| Endpoint | Description |
|----------|-------------|
| `history.getHistory` | Get generation history |
| `history.getFavorites` | Get favorite generations |
| `history.toggleFavorite` | Toggle favorite status |

#### User (`user`)

| Endpoint | Description |
|----------|-------------|
| `user.getProfile` | Get user profile |
| `user.updateProfile` | Update profile |
| `user.getDashboardStats` | Get dashboard statistics |

#### Analytics (`analytics`)

| Endpoint | Description |
|----------|-------------|
| `analytics.getUserAnalytics` | Get usage analytics |
| `analytics.getToolUsageBreakdown` | Get tool usage stats |

## Production Deployment

### Build for Production

1. **Set production environment variables:**

```env
NODE_ENV=production
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

2. **Build the application:**

```bash
npm run build
```

3. **Start production server:**

```bash
npm run start
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Environment variables to set in Vercel dashboard:
- All variables from `.env.local`
- Set `DATABASE_URL` in Vercel settings
- Add Stripe webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

#### Docker

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Configuration

### Stripe Webhook Setup

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### NextAuth Configuration

Currently configured for:
- Credentials (email/password) - requires implementation
- Google OAuth (optional) - requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- GitHub OAuth (optional) - requires `GITHUB_ID` and `GITHUB_SECRET`

## Testing

### Database Testing

```bash
# Open Prisma Studio
npm run db:studio
```

Visit http://localhost:5555 to view/edit database records

### API Testing

```bash
# Test all tools endpoint
curl 'http://localhost:3000/api/trpc/aiTools.getAllTools?input=%7B%22json%22%3A%7B%7D%7D'

# Test categories
curl 'http://localhost:3000/api/trpc/aiTools.getCategories?input=%7B%22json%22%3A%7B%7D%7D'
```

## License

MIT

## Credits

**Developed by:** [Mr. Kanok Santhong](https://kanoks.me/)  
**Role:** Senior Full-Stack Developer & IT Consultant  
**Portfolio:** https://kanoks.me/
