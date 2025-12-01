/**
 * AI Service Base Class
 *
 * Handles AI content generation with credit deduction, error handling,
 * and generation tracking.
 */

import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { generateText, streamText } from 'ai';
import { prisma } from '@/server/db';
import { creditManager } from '../credits/credit-manager';
import { TRPCError } from '@trpc/server';
import { GenerationStatus } from '@prisma/client';

export interface AIGenerationParams {
  userId: string;
  toolId: string;
  toolName: string;
  input: Record<string, any>;
  prompt: string;
  model?: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3-opus' | 'claude-3-sonnet' | 'claude-3-haiku';
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface AIGenerationResult {
  id: string;
  output: string;
  creditsUsed: number;
  tokensUsed: number;
  duration: number;
}

export class AIService {
  private defaultModel = 'gpt-4';
  private defaultMaxTokens = 2000;
  private defaultTemperature = 0.7;

  /**
   * Generate AI content with credit deduction
   */
  async generate(params: AIGenerationParams): Promise<AIGenerationResult> {
    const startTime = Date.now();
    const {
      userId,
      toolId,
      toolName,
      input,
      prompt,
      model = this.defaultModel,
      maxTokens = this.defaultMaxTokens,
      temperature = this.defaultTemperature,
    } = params;

    // Get tool config for credit cost
    const tool = await prisma.tool.findUnique({
      where: { id: toolId },
    });

    if (!tool) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Tool not found',
      });
    }

    if (!tool.enabled) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'This tool is currently disabled',
      });
    }

    // Check credits before generation
    const hasCredits = await creditManager.hasCredits(userId, tool.creditCost);
    if (!hasCredits) {
      const currentBalance = await creditManager.getBalance(userId);
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `Insufficient credits. You need ${tool.creditCost} credits but only have ${currentBalance}.`,
      });
    }

    // Create generation record
    const generation = await prisma.aIGeneration.create({
      data: {
        userId,
        toolId,
        toolName,
        input,
        output: '',
        creditsUsed: tool.creditCost,
        model,
        temperature,
        maxTokens,
        status: 'PROCESSING',
      },
    });

    try {
      // Select AI model
      const aiModel = this.getModel(model);

      // Generate content
      const { text, usage } = await generateText({
        model: aiModel,
        prompt,
        maxTokens,
        temperature,
      });

      const duration = Date.now() - startTime;

      // Update generation record
      await prisma.aIGeneration.update({
        where: { id: generation.id },
        data: {
          output: text,
          tokensUsed: usage.totalTokens,
          status: 'COMPLETED',
          duration,
        },
      });

      // Deduct credits
      await creditManager.deductCredits({
        userId,
        amount: tool.creditCost,
        toolId,
        toolName,
        generationId: generation.id,
      });

      // Increment usage count
      await prisma.tool.update({
        where: { id: toolId },
        data: { usageCount: { increment: 1 } },
      });

      return {
        id: generation.id,
        output: text,
        creditsUsed: tool.creditCost,
        tokensUsed: usage.totalTokens,
        duration,
      };
    } catch (error) {
      // Update generation with error
      await prisma.aIGeneration.update({
        where: { id: generation.id },
        data: {
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Unknown error',
          duration: Date.now() - startTime,
        },
      });

      // Log error for monitoring
      console.error('AI generation failed:', {
        userId,
        toolId,
        toolName,
        error,
      });

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'AI generation failed. Please try again.',
        cause: error,
      });
    }
  }

  /**
   * Stream AI content generation
   * Useful for long-form content with real-time updates
   */
  async generateStream(params: AIGenerationParams) {
    const {
      userId,
      toolId,
      toolName,
      input,
      prompt,
      model = this.defaultModel,
      maxTokens = this.defaultMaxTokens,
      temperature = this.defaultTemperature,
    } = params;

    // Get tool and check credits (same as generate)
    const tool = await prisma.tool.findUnique({
      where: { id: toolId },
    });

    if (!tool || !tool.enabled) {
      throw new TRPCError({
        code: tool ? 'FORBIDDEN' : 'NOT_FOUND',
        message: tool ? 'Tool is disabled' : 'Tool not found',
      });
    }

    const hasCredits = await creditManager.hasCredits(userId, tool.creditCost);
    if (!hasCredits) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Insufficient credits',
      });
    }

    // Create generation record
    const generation = await prisma.aIGeneration.create({
      data: {
        userId,
        toolId,
        toolName,
        input,
        output: '',
        creditsUsed: tool.creditCost,
        model,
        temperature,
        maxTokens,
        status: 'PROCESSING',
      },
    });

    const aiModel = this.getModel(model);

    // Return stream
    return streamText({
      model: aiModel,
      prompt,
      maxTokens,
      temperature,
      onFinish: async ({ text, usage }) => {
        // Update generation record
        await prisma.aIGeneration.update({
          where: { id: generation.id },
          data: {
            output: text,
            tokensUsed: usage.totalTokens,
            status: 'COMPLETED',
          },
        });

        // Deduct credits
        await creditManager.deductCredits({
          userId,
          amount: tool.creditCost,
          toolId,
          toolName,
          generationId: generation.id,
        });

        // Increment usage
        await prisma.tool.update({
          where: { id: toolId },
          data: { usageCount: { increment: 1 } },
        });
      },
    });
  }

  /**
   * Get AI model instance
   */
  private getModel(modelName: string) {
    switch (modelName) {
      case 'gpt-4':
        return openai('gpt-4-turbo-preview');
      case 'gpt-3.5-turbo':
        return openai('gpt-3.5-turbo');
      case 'claude-3-opus':
        return anthropic('claude-3-opus-20240229');
      case 'claude-3-sonnet':
        return anthropic('claude-3-sonnet-20240229');
      case 'claude-3-haiku':
        return anthropic('claude-3-haiku-20240307');
      default:
        return openai('gpt-4-turbo-preview');
    }
  }

  /**
   * Validate generation input against tool schema
   */
  validateInput(toolId: string, input: Record<string, any>): boolean {
    // TODO: Implement schema validation using Zod
    // This will validate input against the tool's inputSchema
    return true;
  }

  /**
   * Format output based on tool requirements
   */
  formatOutput(output: string, format?: 'text' | 'markdown' | 'html'): string {
    // TODO: Implement output formatting
    return output;
  }
}

// Export singleton instance
export const aiService = new AIService();
