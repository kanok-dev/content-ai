'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Target,
  Users,
  Zap,
  Shield,
  Globe,
  Award,
  ArrowRight,
  CheckCircle2,
  Heart,
  Rocket,
  Code,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '1M+', label: 'Content Generated' },
  { value: '130+', label: 'AI Tools' },
  { value: '99.9%', label: 'Uptime' },
];

const values = [
  {
    icon: Zap,
    title: 'Innovation First',
    description:
      'We constantly push the boundaries of AI technology to bring you the most advanced content generation tools.',
  },
  {
    icon: Users,
    title: 'User-Centric',
    description:
      'Every feature we build starts with understanding our users needs and making their workflow easier.',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description:
      'Your data is yours. We use enterprise-grade security and never train our models on your content.',
  },
  {
    icon: Heart,
    title: 'Quality Obsessed',
    description:
      'We obsess over the quality of generated content, continuously improving our AI models.',
  },
];

const team = [
  {
    name: 'Kanok Santhong',
    role: 'Founder & Lead Developer',
    bio: 'Senior Full-Stack Developer with 10+ years of experience building scalable web applications.',
    image: '/team/kanok.jpg',
  },
  {
    name: 'AI Research Team',
    role: 'Machine Learning',
    bio: 'Our dedicated team of ML engineers fine-tuning models for optimal content generation.',
    image: '/team/ai-team.jpg',
  },
  {
    name: 'Product Team',
    role: 'Product & Design',
    bio: 'Creating intuitive experiences that make AI accessible to everyone.',
    image: '/team/product.jpg',
  },
];

const milestones = [
  {
    year: '2024',
    title: 'The Beginning',
    description: 'ContentAI was founded with a vision to democratize AI-powered content creation.',
  },
  {
    year: '2024',
    title: 'First 1000 Users',
    description: 'Reached our first milestone of 1000 active users within 3 months of launch.',
  },
  {
    year: '2025',
    title: '130+ Tools',
    description: 'Expanded our toolkit to cover every content need across industries.',
  },
  {
    year: '2025',
    title: 'Enterprise Launch',
    description: 'Launched enterprise features with team collaboration and custom integrations.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                About ContentAI
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Empowering creators with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI-powered content
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                We're on a mission to help businesses and creators produce high-quality content
                faster than ever before, powered by cutting-edge artificial intelligence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  At ContentAI, we believe that great content shouldn't be limited by time,
                  resources, or technical expertise. Our mission is to democratize content
                  creation by providing powerful AI tools that anyone can use.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Whether you're a solo entrepreneur, a growing startup, or an enterprise team,
                  our AI-powered platform helps you create compelling content that resonates
                  with your audience and drives results.
                </p>
                <ul className="space-y-4">
                  {[
                    'Make AI accessible to everyone',
                    'Save time without sacrificing quality',
                    'Continuously innovate and improve',
                    'Support creators at every stage',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <Target className="h-24 w-24 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      "Empowering 1 million creators by 2026"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                >
                  <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Key milestones in our story
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-blue-200 dark:bg-blue-800 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The passionate people behind ContentAI
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm"
                >
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Built with Modern Technology
                  </h2>
                  <p className="text-blue-100 text-lg mb-6">
                    We use cutting-edge technology to deliver the best AI content generation
                    experience. Our platform is built for speed, reliability, and scale.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'OpenAI', 'Vercel'].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <Code className="h-32 w-32 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <Rocket className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to transform your content?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators already using ContentAI to produce amazing content faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tools">Explore Tools</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
