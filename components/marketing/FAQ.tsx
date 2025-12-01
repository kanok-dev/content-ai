'use client'

import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What is ContentAI and how does it work?',
    answer:
      'ContentAI is an AI-powered content generation platform that uses advanced language models like GPT-4 and Claude to help you create high-quality content. Simply select a tool, provide your input (topic, tone, keywords), and our AI generates professional content in seconds. You can then edit, refine, and export your content.'
  },
  {
    question: 'How do credits work?',
    answer:
      'Credits are the currency used to generate content. Each AI tool has a credit cost based on its complexity and output length. For example, a blog post might cost 10 credits, while a social media post costs 3 credits. Credits are included in your subscription plan and can also be purchased separately as needed.'
  },
  {
    question: 'Is the generated content unique and plagiarism-free?',
    answer:
      'Yes! Our AI generates original content for each request. The content is not copied from existing sources. However, we recommend running important content through a plagiarism checker for peace of mind, especially for academic or highly sensitive use cases.'
  },
  {
    question: 'Can I use the content for commercial purposes?',
    answer: 'Absolutely! All content generated through ContentAI is yours to use as you wish, including for commercial purposes. You own full rights to the content you create with our tools.'
  },
  {
    question: 'What AI models do you use?',
    answer: "We use the latest AI models including OpenAI's GPT-4, GPT-3.5 Turbo, and Anthropic's Claude 3. Our system automatically selects the best model for each task, or you can choose your preferred model in advanced settings."
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! We offer a 14-day free trial with 100 credits so you can experience the full power of ContentAI. No credit card required to start. Simply sign up and begin creating content immediately.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: "Yes, you can cancel your subscription at any time. If you cancel, you'll retain access to your plan features until the end of your current billing period. Your unused credits will remain available until expiration."
  },
  {
    question: 'Do you support multiple languages?',
    answer: 'Yes! ContentAI supports content generation in 50+ languages including English, Spanish, French, German, Portuguese, Chinese, Japanese, and many more. Simply specify your desired language in the tool settings.'
  },
  {
    question: 'Is there an API available?',
    answer: 'Yes, our Professional and Enterprise plans include API access. You can integrate ContentAI directly into your applications, workflows, or content management systems. Full API documentation is available in your dashboard.'
  },
  {
    question: 'How do I get support?',
    answer:
      'We offer multiple support channels: email support for all users, priority support for Professional plans, and dedicated account managers for Enterprise customers. You can also access our comprehensive help center and documentation anytime.'
  }
]

export function FAQ() {
  return (
    <section id='faq' className='bg-gray-50 py-20 sm:py-28'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Frequently Asked Questions</h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            Everything you need to know about ContentAI. Can&apos;t find the answer you&apos;re looking for?{' '}
            <a href='/contact' className='text-blue-600 hover:underline'>
              Contact our team
            </a>
            .
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className='mx-auto max-w-3xl'>
          <Accordion type='single' collapsible className='space-y-4'>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className='rounded-xl border border-gray-200 bg-white px-6 shadow-sm'>
                <AccordionTrigger className='py-5 text-left text-base font-semibold text-gray-900 hover:no-underline'>{faq.question}</AccordionTrigger>
                <AccordionContent className='pb-5 text-gray-600'>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
