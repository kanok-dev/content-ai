/**
 * Site Configuration
 *
 * General site settings and metadata
 */

export const siteConfig = {
  name: 'ContentAI',
  description: 'AI-powered content generation platform with 130+ tools for blogs, social media, emails, SEO, and more',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/contentai',
    github: 'https://github.com/contentai',
    linkedin: 'https://linkedin.com/company/contentai',
  },
  creator: {
    name: 'ContentAI Team',
    email: 'hello@contentai.com',
  },
};

export const navItems = [
  {
    title: 'Features',
    href: '/#features',
  },
  {
    title: 'Tools',
    href: '/tools',
  },
  {
    title: 'Pricing',
    href: '/#pricing',
  },
  {
    title: 'About',
    href: '/about',
  },
];

export const footerLinks = {
  product: [
    { title: 'Features', href: '/#features' },
    { title: 'Pricing', href: '/#pricing' },
    { title: 'Tools', href: '/tools' },
    { title: 'Use Cases', href: '/#use-cases' },
  ],
  company: [
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Careers', href: '/careers' },
    { title: 'Contact', href: '/contact' },
  ],
  resources: [
    { title: 'Documentation', href: '/docs' },
    { title: 'Help Center', href: '/help' },
    { title: 'API Reference', href: '/api-docs' },
    { title: 'Status', href: '/status' },
  ],
  legal: [
    { title: 'Privacy', href: '/privacy' },
    { title: 'Terms', href: '/terms' },
    { title: 'Cookie Policy', href: '/cookies' },
  ],
};
