/**
 * Social Media Post Generator Tool
 *
 * Creates engaging social media posts for multiple platforms
 */

import { z } from 'zod';
import { aiService } from '../ai-service';

export const socialMediaInputSchema = z.object({
  platform: z.enum(['twitter', 'linkedin', 'facebook', 'instagram', 'threads', 'tiktok']),
  topic: z.string().min(3, 'Topic must be at least 3 characters').max(200, 'Topic too long'),
  tone: z.enum(['professional', 'casual', 'witty', 'inspirational', 'educational', 'humorous']),
  includeHashtags: z.boolean().default(true),
  includeEmojis: z.boolean().default(true),
  callToAction: z.string().max(100).optional(),
  variants: z.number().min(1).max(5).default(3),
});

export type SocialMediaInput = z.infer<typeof socialMediaInputSchema>;

export class SocialMediaGeneratorTool {
  private toolId = 'social-media-generator';
  private toolName = 'Social Media Post Generator';

  async generate(userId: string, input: SocialMediaInput) {
    const prompt = this.buildPrompt(input);

    return await aiService.generate({
      userId,
      toolId: this.toolId,
      toolName: this.toolName,
      input,
      prompt,
      model: 'gpt-4',
      maxTokens: 1000,
      temperature: 0.8,
    });
  }

  private buildPrompt(input: SocialMediaInput): string {
    const platformSpecs = {
      twitter: {
        limit: '280 characters',
        style: 'Punchy and engaging. Perfect for virality. Use thread format if needed.',
      },
      linkedin: {
        limit: '1-2 paragraphs (under 1300 characters for best engagement)',
        style: 'Professional but personable. Focus on insights, lessons, and value. Use line breaks for readability.',
      },
      facebook: {
        limit: '1-2 paragraphs',
        style: 'Conversational and community-focused. Encourage comments and discussions.',
      },
      instagram: {
        limit: 'Caption with 2-3 paragraphs (under 2200 characters)',
        style: 'Visual storytelling. Make it inspiring and relatable. First line is crucial.',
      },
      threads: {
        limit: '500 characters per post (can suggest multiple connected posts)',
        style: 'Conversational and authentic. Natural, unpolished feel.',
      },
      tiktok: {
        limit: 'Short caption (100-150 characters) + video script suggestions',
        style: 'Trendy, authentic, attention-grabbing. Hook in first 3 seconds.',
      },
    };

    const spec = platformSpecs[input.platform];

    const hashtagNote = input.includeHashtags
      ? `\n- Include 3-7 relevant hashtags that are platform-appropriate and trending`
      : '\n- Do NOT include hashtags';

    const emojiNote = input.includeEmojis
      ? '\n- Use relevant emojis naturally to enhance readability and engagement'
      : '\n- Do NOT use emojis';

    const ctaNote = input.callToAction
      ? `\n- Include this call-to-action: "${input.callToAction}"`
      : '\n- Include an engaging call-to-action that encourages interaction';

    return `You are a social media expert and viral content creator. Create ${input.variants} engaging post variation(s) for **${input.platform.toUpperCase()}**.

**Topic:** "${input.topic}"

**Platform Guidelines:**
- Character/length limit: ${spec.limit}
- Platform style: ${spec.style}

**Requirements:**
- Tone: ${input.tone}${hashtagNote}${emojiNote}${ctaNote}
- Make it attention-grabbing and shareable
- Optimize for maximum engagement (likes, comments, shares)
- Use platform-specific best practices
- Hook readers in the first line
- Create curiosity or emotional connection

**Best Practices:**
- Start with a strong hook
- Use line breaks for readability
- Include a clear value proposition
- Make it conversational and authentic
- End with engagement question or CTA

Create ${input.variants} unique variation(s). Label each clearly as:

**Variation 1:**
[Post content here]

**Variation 2:**
[Post content here]

${input.variants > 2 ? '**Variation 3:**\n[Post content here]\n' : ''}

Make each variation distinctly different in approach while maintaining the same core message.`;
  }
}

export const socialMediaGeneratorTool = new SocialMediaGeneratorTool();
