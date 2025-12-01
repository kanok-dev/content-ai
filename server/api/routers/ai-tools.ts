/**
 * AI Tools tRPC Router
 *
 * Handles all AI content generation endpoints
 */

import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { prisma } from '@/server/db';

// Import all AI tools
import { blogWriterTool, blogWriterInputSchema } from '@/server/services/ai/tools/blog-writer';
import {
  socialMediaGeneratorTool,
  socialMediaInputSchema,
} from '@/server/services/ai/tools/social-media-generator';
import { emailWriterTool, emailWriterInputSchema } from '@/server/services/ai/tools/email-writer';
import {
  productDescriptionTool,
  productDescriptionInputSchema,
} from '@/server/services/ai/tools/product-description';
import {
  seoMetaGeneratorTool,
  seoMetaInputSchema,
} from '@/server/services/ai/tools/seo-meta-generator';

export const aiToolsRouter = createTRPCRouter({
  // ============================================
  // TOOL DISCOVERY & INFO
  // ============================================

  /**
   * Get all available tools with optional filtering
   */
  getAllTools: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        featured: z.boolean().optional(),
        search: z.string().optional(),
        enabled: z.boolean().default(true),
      })
    )
    .query(async ({ input }) => {
      const where: any = {
        enabled: input.enabled,
      };

      if (input.category) {
        where.category = input.category;
      }

      if (input.featured !== undefined) {
        where.featured = input.featured;
      }

      if (input.search) {
        where.OR = [
          { name: { contains: input.search, mode: 'insensitive' } },
          { description: { contains: input.search, mode: 'insensitive' } },
        ];
      }

      const tools = await prisma.tool.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { usageCount: 'desc' }, { sortOrder: 'asc' }],
      });

      return tools;
    }),

  /**
   * Get tool by ID or slug
   */
  getToolById: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        slug: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.id && !input.slug) {
        throw new Error('Either id or slug must be provided');
      }

      return await prisma.tool.findUnique({
        where: input.id ? { id: input.id } : { slug: input.slug },
      });
    }),

  /**
   * Get all tool categories with counts
   */
  getCategories: publicProcedure.query(async () => {
    const categories = await prisma.tool.groupBy({
      by: ['category'],
      where: { enabled: true },
      _count: {
        id: true,
      },
    });

    return categories.map((c) => ({
      name: c.category,
      count: c._count.id,
    }));
  }),

  /**
   * Get featured/popular tools
   */
  getFeaturedTools: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(20).default(6),
      })
    )
    .query(async ({ input }) => {
      return await prisma.tool.findMany({
        where: {
          enabled: true,
          featured: true,
        },
        take: input.limit,
        orderBy: { usageCount: 'desc' },
      });
    }),

  // ============================================
  // AI GENERATION ENDPOINTS
  // ============================================

  /**
   * Generate blog post
   */
  generateBlogPost: protectedProcedure
    .input(blogWriterInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await blogWriterTool.generate(ctx.session.user.id, input);
    }),

  /**
   * Generate social media post
   */
  generateSocialPost: protectedProcedure
    .input(socialMediaInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await socialMediaGeneratorTool.generate(ctx.session.user.id, input);
    }),

  /**
   * Generate email
   */
  generateEmail: protectedProcedure
    .input(emailWriterInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await emailWriterTool.generate(ctx.session.user.id, input);
    }),

  /**
   * Generate product description
   */
  generateProductDescription: protectedProcedure
    .input(productDescriptionInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await productDescriptionTool.generate(ctx.session.user.id, input);
    }),

  /**
   * Generate SEO meta tags
   */
  generateSeoMeta: protectedProcedure
    .input(seoMetaInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await seoMetaGeneratorTool.generate(ctx.session.user.id, input);
    }),

  // ============================================
  // TOOL STATISTICS
  // ============================================

  /**
   * Get tool usage statistics
   */
  getToolStats: protectedProcedure
    .input(
      z.object({
        toolId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const [tool, userGenerations, totalGenerations] = await Promise.all([
        prisma.tool.findUnique({
          where: { id: input.toolId },
        }),
        prisma.aIGeneration.count({
          where: {
            toolId: input.toolId,
            userId: ctx.session.user.id,
            status: 'COMPLETED',
          },
        }),
        prisma.aIGeneration.count({
          where: {
            toolId: input.toolId,
            status: 'COMPLETED',
          },
        }),
      ]);

      return {
        tool,
        userGenerations,
        totalGenerations,
      };
    }),
});
