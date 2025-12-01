/**
 * AI Tools Configuration
 *
 * Defines all 130+ AI tools with categories, icons, and metadata
 */

import {
  FileText,
  Share2,
  Mail,
  Search,
  ShoppingBag,
  MessageSquare,
  Video,
  Image,
  Code,
  Globe,
  Zap,
  TrendingUp,
  Target,
  Edit,
  CheckCircle,
  List,
  Book,
  Award,
  Users,
  Briefcase,
} from 'lucide-react';

export interface ToolConfig {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string; // Lucide icon name
  creditCost: number;
  featured?: boolean;
  comingSoon?: boolean;
  tags?: string[];
}

export const toolCategories = [
  { id: 'content-writing', name: 'Content Writing', icon: FileText },
  { id: 'social-media', name: 'Social Media', icon: Share2 },
  { id: 'email-marketing', name: 'Email Marketing', icon: Mail },
  { id: 'seo', name: 'SEO & Optimization', icon: Search },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingBag },
  { id: 'advertising', name: 'Advertising', icon: TrendingUp },
  { id: 'video', name: 'Video Content', icon: Video },
  { id: 'website', name: 'Website Copy', icon: Globe },
  { id: 'business', name: 'Business Writing', icon: Briefcase },
  { id: 'creative', name: 'Creative Writing', icon: Edit },
];

// Priority Tools (Implemented)
export const priorityTools: ToolConfig[] = [
  {
    id: 'blog-writer',
    slug: 'blog-writer',
    name: 'Blog Post Writer',
    description: 'Generate comprehensive, SEO-optimized blog posts in any tone and length',
    category: 'content-writing',
    icon: 'FileText',
    creditCost: 10,
    featured: true,
    tags: ['blog', 'article', 'SEO', 'long-form'],
  },
  {
    id: 'social-media-generator',
    slug: 'social-media-generator',
    name: 'Social Media Post Generator',
    description: 'Create engaging posts for Twitter, LinkedIn, Facebook, Instagram, and more',
    category: 'social-media',
    icon: 'Share2',
    creditCost: 3,
    featured: true,
    tags: ['social media', 'posts', 'engagement'],
  },
  {
    id: 'email-writer',
    slug: 'email-writer',
    name: 'Email Writer',
    description: 'Craft compelling marketing, sales, and transactional emails',
    category: 'email-marketing',
    icon: 'Mail',
    creditCost: 5,
    featured: true,
    tags: ['email', 'marketing', 'sales'],
  },
  {
    id: 'product-description',
    slug: 'product-description',
    name: 'Product Description Generator',
    description: 'Write persuasive e-commerce product descriptions that convert',
    category: 'ecommerce',
    icon: 'ShoppingBag',
    creditCost: 5,
    featured: true,
    tags: ['ecommerce', 'product', 'description'],
  },
  {
    id: 'seo-meta-generator',
    slug: 'seo-meta-generator',
    name: 'SEO Meta Tags Generator',
    description: 'Generate optimized meta titles, descriptions, and tags for better rankings',
    category: 'seo',
    icon: 'Search',
    creditCost: 5,
    featured: true,
    tags: ['SEO', 'meta tags', 'optimization'],
  },
];

// Additional Tools (Coming Soon - Can be implemented later)
export const additionalTools: ToolConfig[] = [
  // Content Writing (25 tools)
  {
    id: 'article-rewriter',
    slug: 'article-rewriter',
    name: 'Article Rewriter',
    description: 'Rewrite articles with fresh perspective while maintaining meaning',
    category: 'content-writing',
    icon: 'Edit',
    creditCost: 8,
    comingSoon: true,
  },
  {
    id: 'paragraph-generator',
    slug: 'paragraph-generator',
    name: 'Paragraph Generator',
    description: 'Generate well-structured paragraphs on any topic',
    category: 'content-writing',
    icon: 'FileText',
    creditCost: 3,
    comingSoon: true,
  },
  {
    id: 'content-improver',
    slug: 'content-improver',
    name: 'Content Improver',
    description: 'Enhance existing content for better readability and impact',
    category: 'content-writing',
    icon: 'TrendingUp',
    creditCost: 5,
    comingSoon: true,
  },
  // Add more tools here...
  // Social Media (20 tools)
  {
    id: 'instagram-caption',
    slug: 'instagram-caption',
    name: 'Instagram Caption Generator',
    description: 'Create engaging Instagram captions with relevant hashtags',
    category: 'social-media',
    icon: 'Image',
    creditCost: 3,
    comingSoon: true,
  },
  {
    id: 'twitter-thread',
    slug: 'twitter-thread',
    name: 'Twitter Thread Creator',
    description: 'Generate compelling Twitter/X threads that drive engagement',
    category: 'social-media',
    icon: 'MessageSquare',
    creditCost: 4,
    comingSoon: true,
  },
  // Email Marketing (15 tools)
  {
    id: 'newsletter-writer',
    slug: 'newsletter-writer',
    name: 'Newsletter Writer',
    description: 'Create engaging email newsletters your subscribers will love',
    category: 'email-marketing',
    icon: 'Mail',
    creditCost: 8,
    comingSoon: true,
  },
  // SEO Tools (15 tools)
  {
    id: 'keyword-generator',
    slug: 'keyword-generator',
    name: 'SEO Keyword Generator',
    description: 'Discover high-value keywords for your content strategy',
    category: 'seo',
    icon: 'Search',
    creditCost: 5,
    comingSoon: true,
  },
  // E-commerce (15 tools)
  {
    id: 'product-name-generator',
    slug: 'product-name-generator',
    name: 'Product Name Generator',
    description: 'Generate catchy, memorable product names',
    category: 'ecommerce',
    icon: 'ShoppingBag',
    creditCost: 3,
    comingSoon: true,
  },
  // Advertising (15 tools)
  {
    id: 'google-ads-generator',
    slug: 'google-ads-generator',
    name: 'Google Ads Copy',
    description: 'Create high-converting Google Ads copy',
    category: 'advertising',
    icon: 'Target',
    creditCost: 5,
    comingSoon: true,
  },
  // Video Content (10 tools)
  {
    id: 'youtube-script',
    slug: 'youtube-script',
    name: 'YouTube Script Writer',
    description: 'Write engaging scripts for YouTube videos',
    category: 'video',
    icon: 'Video',
    creditCost: 10,
    comingSoon: true,
  },
  // Website Copy (10 tools)
  {
    id: 'landing-page-copy',
    slug: 'landing-page-copy',
    name: 'Landing Page Copy',
    description: 'Create conversion-focused landing page content',
    category: 'website',
    icon: 'Globe',
    creditCost: 10,
    comingSoon: true,
  },
  // Business Writing (10 tools)
  {
    id: 'business-proposal',
    slug: 'business-proposal',
    name: 'Business Proposal Generator',
    description: 'Generate professional business proposals',
    category: 'business',
    icon: 'Briefcase',
    creditCost: 12,
    comingSoon: true,
  },
];

// Combine all tools
export const allTools = [...priorityTools, ...additionalTools];

// Get tools by category
export function getToolsByCategory(category: string): ToolConfig[] {
  return allTools.filter((tool) => tool.category === category);
}

// Get featured tools
export function getFeaturedTools(): ToolConfig[] {
  return allTools.filter((tool) => tool.featured && !tool.comingSoon);
}

// Get tool by slug
export function getToolBySlug(slug: string): ToolConfig | undefined {
  return allTools.find((tool) => tool.slug === slug);
}
