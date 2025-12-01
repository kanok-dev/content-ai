/**
 * SEO Meta Tags Generator Tool
 *
 * Generates optimized meta tags for search engines and social media
 */

import { z } from 'zod';
import { aiService } from '../ai-service';

export const seoMetaInputSchema = z.object({
  pageTitle: z.string().min(3, 'Page title required').max(100),
  pageContent: z.string().min(50, 'Provide page content summary').max(1000),
  primaryKeyword: z.string().min(2).max(100),
  secondaryKeywords: z.array(z.string()).max(5).optional(),
  targetAudience: z.string().max(200).optional(),
  pageType: z.enum(['homepage', 'product', 'blog', 'category', 'service', 'about', 'landing']),
  brandName: z.string().max(50).optional(),
  location: z.string().max(100).optional(), // For local SEO
});

export type SeoMetaInput = z.infer<typeof seoMetaInputSchema>;

export interface SeoMetaOutput {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  focusKeywords: string[];
  urlSlug: string;
  h1Suggestion: string;
}

export class SeoMetaGeneratorTool {
  private toolId = 'seo-meta-generator';
  private toolName = 'SEO Meta Tags Generator';

  async generate(userId: string, input: SeoMetaInput) {
    const prompt = this.buildPrompt(input);

    const result = await aiService.generate({
      userId,
      toolId: this.toolId,
      toolName: this.toolName,
      input,
      prompt,
      model: 'gpt-4',
      maxTokens: 1000,
      temperature: 0.6,
    });

    // Parse the structured output
    const parsedOutput = this.parseOutput(result.output);

    return {
      ...result,
      output: result.output,
      structured: parsedOutput,
    };
  }

  private buildPrompt(input: SeoMetaInput): string {
    const secondaryKwNote = input.secondaryKeywords?.length
      ? `\n**Secondary Keywords:** ${input.secondaryKeywords.join(', ')}`
      : '';

    const audienceNote = input.targetAudience
      ? `\n**Target Audience:** ${input.targetAudience}`
      : '';

    const brandNote = input.brandName ? `\n**Brand Name:** ${input.brandName}` : '';

    const locationNote = input.location
      ? `\n**Location (for local SEO):** ${input.location}`
      : '';

    const pageTypeGuidelines = {
      homepage: 'Include brand name, main value proposition, broad keywords',
      product: 'Include product name, key benefits, category, brand',
      blog: 'Include topic + angle, make it clickable and engaging',
      category: 'Include category name, what users find, primary value',
      service: 'Include service name, key benefit, target audience, location if local',
      about: 'Include brand name, what makes you unique, your mission',
      landing: 'Include offer/solution, main benefit, urgency/curiosity',
    };

    return `You are an SEO expert specializing in on-page optimization. Generate comprehensive, optimized meta tags for a **${input.pageType}** page.

**Page Information:**
- Page Title: ${input.pageTitle}
- Page Type: ${input.pageType}
- Primary Keyword: ${input.primaryKeyword}${secondaryKwNote}${audienceNote}${brandNote}${locationNote}

**Page Content Summary:**
${input.pageContent}

**Guidelines for ${input.pageType} pages:**
${pageTypeGuidelines[input.pageType]}

---

Generate the following optimized meta tags following current SEO best practices:

**1. META TITLE (Title Tag)**
- Length: 50-60 characters (STRICT)
- Include primary keyword near the beginning
- Compelling and click-worthy
- Include brand name if space allows
- Format: [Primary Keyword] - [Benefit/Context] | [Brand]
- Avoid keyword stuffing

**2. META DESCRIPTION**
- Length: 150-160 characters (STRICT)
- Include primary keyword naturally
- Clear value proposition
- Call to action
- Compelling reason to click
- Must be under 160 characters

**3. OPEN GRAPH TITLE (for Facebook, LinkedIn)**
- Length: 50-60 characters
- Optimized for social sharing
- Can be slightly different from meta title
- More compelling/engaging for social

**4. OPEN GRAPH DESCRIPTION**
- Length: 150-160 characters
- Engaging for social media
- Clear benefit statement
- Encourages clicks from social feeds

**5. TWITTER TITLE**
- Length: 50-60 characters
- Optimized for Twitter/X
- Punchy and attention-grabbing

**6. TWITTER DESCRIPTION**
- Length: 150-160 characters
- Twitter-optimized messaging
- Clear and concise

**7. FOCUS KEYWORDS**
- 5-8 relevant, searchable keywords
- Mix of short and long-tail
- Include semantic variations
- Based on page content and intent

**8. URL SLUG**
- SEO-friendly, lowercase, use hyphens
- Include primary keyword
- Keep it short and descriptive
- Max 5 words

**9. H1 HEADING SUGGESTION**
- Slightly different from title tag
- Include primary keyword
- Engaging and clear
- 40-70 characters

**IMPORTANT FORMATTING - USE THIS EXACT FORMAT:**

---START---
META_TITLE: [Your optimized title here]
META_DESCRIPTION: [Your optimized description here]
OG_TITLE: [Your OG title here]
OG_DESCRIPTION: [Your OG description here]
TWITTER_TITLE: [Your Twitter title here]
TWITTER_DESCRIPTION: [Your Twitter description here]
FOCUS_KEYWORDS: keyword1, keyword2, keyword3, keyword4, keyword5
URL_SLUG: your-url-slug-here
H1_HEADING: [Your H1 suggestion here]
---END---

**SEO Best Practices to Follow:**
- Use action words and power words
- Create curiosity or urgency
- Address user intent
- Include numbers when relevant
- Avoid duplicate content
- Match search intent
- Be specific and descriptive
- Use natural language

Generate the optimized meta tags now following the exact format above:`;
  }

  private parseOutput(rawOutput: string): SeoMetaOutput {
    const lines = rawOutput.split('\n').filter((line) => line.trim());

    const extract = (prefix: string) => {
      const line = lines.find((l) => l.startsWith(prefix));
      return line ? line.substring(prefix.length).trim() : '';
    };

    return {
      metaTitle: extract('META_TITLE:'),
      metaDescription: extract('META_DESCRIPTION:'),
      ogTitle: extract('OG_TITLE:'),
      ogDescription: extract('OG_DESCRIPTION:'),
      twitterTitle: extract('TWITTER_TITLE:'),
      twitterDescription: extract('TWITTER_DESCRIPTION:'),
      focusKeywords: extract('FOCUS_KEYWORDS:')
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean),
      urlSlug: extract('URL_SLUG:'),
      h1Suggestion: extract('H1_HEADING:'),
    };
  }
}

export const seoMetaGeneratorTool = new SeoMetaGeneratorTool();
