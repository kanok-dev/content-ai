/**
 * Blog Post Writer Tool
 *
 * Generates comprehensive, SEO-optimized blog posts
 */

import { z } from 'zod';
import { aiService } from '../ai-service';

export const blogWriterInputSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters').max(200, 'Topic too long'),
  keywords: z.array(z.string()).max(10).optional(),
  tone: z.enum(['professional', 'casual', 'friendly', 'authoritative', 'conversational']),
  length: z.enum(['short', 'medium', 'long']),
  includeIntro: z.boolean().default(true),
  includeConclusion: z.boolean().default(true),
  includeOutline: z.boolean().default(false),
  targetAudience: z.string().max(200).optional(),
});

export type BlogWriterInput = z.infer<typeof blogWriterInputSchema>;

export class BlogWriterTool {
  private toolId = 'blog-writer';
  private toolName = 'Blog Post Writer';

  async generate(userId: string, input: BlogWriterInput) {
    const prompt = this.buildPrompt(input);

    return await aiService.generate({
      userId,
      toolId: this.toolId,
      toolName: this.toolName,
      input,
      prompt,
      model: 'gpt-4',
      maxTokens: this.getMaxTokens(input.length),
      temperature: 0.7,
    });
  }

  private buildPrompt(input: BlogWriterInput): string {
    const lengthMap = {
      short: '500-700 words',
      medium: '1000-1500 words',
      long: '2000-3000 words',
    };

    const keywordsSection = input.keywords?.length
      ? `\n- Naturally incorporate these keywords: ${input.keywords.join(', ')}`
      : '';

    const audienceSection = input.targetAudience
      ? `\n- Target audience: ${input.targetAudience}`
      : '';

    const structureRequirements = [
      input.includeIntro ? '- Start with an engaging introduction that hooks the reader' : '',
      '- Use clear, descriptive headings and subheadings (H2, H3)',
      '- Write in short, scannable paragraphs (2-4 sentences each)',
      '- Include relevant examples, statistics, or case studies',
      '- Use bullet points or numbered lists where appropriate',
      input.includeConclusion ? '- End with a compelling conclusion and call-to-action' : '',
      input.includeOutline ? '- Begin with a brief content outline' : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `You are an expert blog writer and content strategist. Write a comprehensive, engaging blog post about: "${input.topic}"

**Requirements:**
- Length: ${lengthMap[input.length]}
- Tone: ${input.tone}${keywordsSection}${audienceSection}
- Make it SEO-friendly and reader-friendly

**Structure:**
${structureRequirements}

**Content Guidelines:**
- Write original, valuable content that provides actionable insights
- Use active voice and conversational language
- Include practical examples and real-world applications
- Make it engaging and easy to read
- Optimize for search engines naturally (don't keyword stuff)
- Use transitional phrases between sections
- Add value in every paragraph

**Formatting:**
- Use markdown formatting
- Bold important points
- Use proper heading hierarchy (## for H2, ### for H3)
- Keep paragraphs short and digestible

Write the complete blog post now:`;
  }

  private getMaxTokens(length: BlogWriterInput['length']): number {
    const tokenMap = {
      short: 1200,
      medium: 2500,
      long: 4000,
    };
    return tokenMap[length];
  }
}

export const blogWriterTool = new BlogWriterTool();
