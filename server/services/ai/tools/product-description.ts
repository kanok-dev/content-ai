/**
 * Product Description Generator Tool
 *
 * Creates compelling e-commerce product descriptions
 */

import { z } from 'zod';
import { aiService } from '../ai-service';

export const productDescriptionInputSchema = z.object({
  productName: z.string().min(2, 'Product name required').max(100, 'Product name too long'),
  category: z.string().min(2).max(50),
  features: z.array(z.string()).min(1, 'At least one feature required').max(10),
  benefits: z.array(z.string()).min(1, 'At least one benefit required').max(10),
  targetAudience: z.string().min(3).max(200),
  tone: z.enum(['professional', 'exciting', 'luxurious', 'friendly', 'technical', 'playful']),
  length: z.enum(['short', 'medium', 'long']),
  includeSpecifications: z.boolean().default(false),
  specifications: z.record(z.string()).optional(),
  pricePoint: z.enum(['budget', 'mid-range', 'premium', 'luxury']).optional(),
});

export type ProductDescriptionInput = z.infer<typeof productDescriptionInputSchema>;

export class ProductDescriptionTool {
  private toolId = 'product-description';
  private toolName = 'Product Description Generator';

  async generate(userId: string, input: ProductDescriptionInput) {
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

  private buildPrompt(input: ProductDescriptionInput): string {
    const lengthGuidelines = {
      short: '50-100 words - Concise overview, highlight key benefit. Perfect for product cards and quick listings.',
      medium: '150-250 words - Detailed features and benefits with emotional appeal. Ideal for product pages.',
      long: '300-500 words - Comprehensive description with storytelling, use cases, and detailed benefits. For premium products or detailed listings.',
    };

    const pricePointNote = input.pricePoint
      ? `\n**Price Point:** ${input.pricePoint} - Adjust language and emphasis accordingly`
      : '';

    const specsSection =
      input.includeSpecifications && input.specifications
        ? `\n\n**Technical Specifications:**\n${Object.entries(input.specifications)
            .map(([key, value]) => `- ${key}: ${value}`)
            .join('\n')}`
        : '';

    return `You are an expert e-commerce copywriter specializing in conversion-focused product descriptions. Write a compelling product description for **"${input.productName}"**.

**Product Details:**
- Category: ${input.category}
- Target Audience: ${input.targetAudience}${pricePointNote}

**Key Features:**
${input.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

**Key Benefits:**
${input.benefits.map((b, i) => `${i + 1}. ${b}`).join('\n')}${specsSection}

**Requirements:**
- Length: ${lengthGuidelines[input.length]}
- Tone: ${input.tone}
- Focus on benefits over features (show how it improves customer's life)
- Use persuasive, sensory language that creates desire
- Include power words that drive conversions
- Make it SEO-friendly with natural keyword usage
- Create emotional connection with the reader
- Clear value proposition

**Writing Guidelines:**
- Start with a compelling hook that addresses a pain point or desire
- Transform features into benefits (what's in it for the customer)
- Use vivid, descriptive language that helps customer visualize ownership
- Include social proof elements if natural ("loved by thousands", "award-winning", etc.)
- Address potential objections subtly
- End with a motivating statement that encourages purchase
- Use active voice and power words (discover, transform, experience, premium, innovative)
- Paint a picture of life after purchase

**Structure for ${input.length} description:**
${
  input.length === 'short'
    ? '- Opening hook + key benefit\n- 2-3 standout features as benefits\n- Closing motivator'
    : input.length === 'medium'
    ? '- Engaging opening (2-3 sentences)\n- Main benefits with supporting details\n- Features that matter\n- Trust/quality statement\n- Compelling close'
    : '- Story-driven opening\n- Problem/solution narrative\n- Detailed benefits and use cases\n- Feature breakdown\n- Quality/craftsmanship details\n- Social proof elements\n- Strong closing CTA'
}

**Formatting:**
- Use short paragraphs for readability
- Include bullet points for key features/benefits if appropriate for length
- Bold important words sparingly (only for ${input.length === 'long' ? 'long' : 'medium/long'} format)
- Use line breaks between sections

Write the product description now:`;
  }

  private getMaxTokens(length: ProductDescriptionInput['length']): number {
    return { short: 250, medium: 500, long: 900 }[length];
  }
}

export const productDescriptionTool = new ProductDescriptionTool();
