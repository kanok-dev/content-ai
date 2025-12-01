/**
 * Email Writer Tool
 *
 * Generates professional emails for various purposes
 */

import { z } from 'zod';
import { aiService } from '../ai-service';

export const emailWriterInputSchema = z.object({
  emailType: z.enum([
    'marketing',
    'sales',
    'cold-outreach',
    'follow-up',
    'newsletter',
    'announcement',
    'welcome',
    'thank-you',
    'apology',
    'reminder',
  ]),
  subject: z.string().max(100).optional(),
  mainPoints: z.array(z.string()).min(1, 'At least one main point required').max(5),
  tone: z.enum(['professional', 'friendly', 'persuasive', 'formal', 'casual', 'urgent']),
  callToAction: z.string().max(100).optional(),
  recipientName: z.string().max(50).optional(),
  senderName: z.string().max(50).optional(),
  companyName: z.string().max(100).optional(),
  includeSubjectLine: z.boolean().default(true),
});

export type EmailWriterInput = z.infer<typeof emailWriterInputSchema>;

export class EmailWriterTool {
  private toolId = 'email-writer';
  private toolName = 'Email Writer';

  async generate(userId: string, input: EmailWriterInput) {
    const prompt = this.buildPrompt(input);

    return await aiService.generate({
      userId,
      toolId: this.toolId,
      toolName: this.toolName,
      input,
      prompt,
      model: 'gpt-4',
      maxTokens: 1500,
      temperature: 0.7,
    });
  }

  private buildPrompt(input: EmailWriterInput): string {
    const emailTypeGuidelines = {
      marketing: {
        focus: 'Focus on benefits, create urgency, include clear CTA, highlight value proposition',
        structure: 'Hook → Problem → Solution → Benefits → CTA',
      },
      sales: {
        focus: 'Emphasize value proposition, address pain points, build trust, soft sell approach',
        structure: 'Personalized intro → Value proposition → Social proof → CTA',
      },
      'cold-outreach': {
        focus: 'Highly personalized, concise, show immediate value, research-based',
        structure: 'Personalized hook → Why you → Value offer → Soft CTA',
      },
      'follow-up': {
        focus: 'Reference previous interaction, gentle reminder, add additional value',
        structure: 'Context reminder → Update/Value add → Clear next step',
      },
      newsletter: {
        focus: 'Engaging content, easy to scan, multiple sections, consistent formatting',
        structure: 'Intro → Key updates/news → Featured content → CTA',
      },
      announcement: {
        focus: 'Clear and informative, highlight key changes, explain impact',
        structure: 'What → Why → Impact → Next steps',
      },
      welcome: {
        focus: 'Warm and welcoming, set expectations, guide next steps, build excitement',
        structure: 'Welcome → What to expect → Next steps → Resources',
      },
      'thank-you': {
        focus: 'Genuine appreciation, personalized, maintain relationship, future-focused',
        structure: 'Thank you → Specific appreciation → Impact → Future',
      },
      apology: {
        focus: 'Sincere apology, take responsibility, explain solution, rebuild trust',
        structure: 'Apology → What happened → Solution → Prevention → Compensation',
      },
      reminder: {
        focus: 'Friendly but clear, highlight importance, make action easy',
        structure: 'Context → What\'s needed → Why it matters → Easy CTA',
      },
    };

    const guidelines = emailTypeGuidelines[input.emailType];

    const subjectLineNote = input.subject
      ? `\n**Provided Subject:** "${input.subject}"`
      : input.includeSubjectLine
      ? '\n**Subject Line:** Create a compelling, specific subject line (40-50 characters, avoid spam words)'
      : '';

    const recipientNote = input.recipientName
      ? `\n**Recipient:** ${input.recipientName}`
      : '\n**Recipient:** [Name] (use placeholder)';

    const senderNote = input.senderName
      ? `\n**Sender:** ${input.senderName}`
      : '\n**Sender:** [Your Name] (use placeholder)';

    const companyNote = input.companyName ? `\n**Company:** ${input.companyName}` : '';

    const ctaNote = input.callToAction
      ? `\n**Call-to-Action:** ${input.callToAction}`
      : '\n**Call-to-Action:** Include appropriate CTA based on email type';

    return `You are an expert email copywriter. Write a ${input.tone} **${input.emailType}** email.

**Email Type:** ${input.emailType}
**Guidelines:** ${guidelines.focus}
**Structure:** ${guidelines.structure}
${subjectLineNote}${recipientNote}${senderNote}${companyNote}${ctaNote}

**Main Points to Cover:**
${input.mainPoints.map((point, idx) => `${idx + 1}. ${point}`).join('\n')}

**Requirements:**
- Tone: ${input.tone}
- Keep it concise and scannable
- Use compelling, benefit-driven language
- Make it action-oriented
- Professional formatting with proper spacing
- Personalized and human (not robotic)
- Clear value proposition
- Single, clear call-to-action

**Formatting Guidelines:**
- Use short paragraphs (2-3 sentences max)
- Include line breaks between paragraphs
- Bold key points sparingly
- Use bullet points for lists
- Make the CTA stand out

**Output Format:**
${input.includeSubjectLine ? 'Subject: [Your compelling subject line]\n\n' : ''}Hi ${input.recipientName || '[Name]'},

[Email body with proper formatting]

Best regards,
${input.senderName || '[Your Name]'}${input.companyName ? `\n${input.companyName}` : ''}

Write the complete email now:`;
  }
}

export const emailWriterTool = new EmailWriterTool();
