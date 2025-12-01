/**
 * History tRPC Router
 *
 * Manages user's AI generation history
 */

import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from '@/server/db';
import { GenerationStatus } from '@prisma/client';

export const historyRouter = createTRPCRouter({
  /**
   * Get user's generation history with pagination
   */
  getHistory: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        toolId: z.string().optional(),
        status: z.nativeEnum(GenerationStatus).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: any = {
        userId: ctx.session.user.id,
      };

      if (input.toolId) {
        where.toolId = input.toolId;
      }

      if (input.status) {
        where.status = input.status;
      }

      if (input.searchQuery) {
        where.OR = [
          { toolName: { contains: input.searchQuery, mode: 'insensitive' } },
          { output: { contains: input.searchQuery, mode: 'insensitive' } },
        ];
      }

      const [generations, total] = await Promise.all([
        prisma.aIGeneration.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: input.limit,
          skip: input.offset,
          include: {
            tool: {
              select: {
                name: true,
                icon: true,
                category: true,
              },
            },
          },
        }),
        prisma.aIGeneration.count({ where }),
      ]);

      return {
        generations,
        total,
        hasMore: input.offset + input.limit < total,
        page: Math.floor(input.offset / input.limit) + 1,
        totalPages: Math.ceil(total / input.limit),
      };
    }),

  /**
   * Get single generation by ID
   */
  getGenerationById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const generation = await prisma.aIGeneration.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          tool: true,
        },
      });

      if (!generation) {
        throw new Error('Generation not found');
      }

      return generation;
    }),

  /**
   * Delete generation
   */
  deleteGeneration: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const generation = await prisma.aIGeneration.findUnique({
        where: { id: input.id },
      });

      if (!generation || generation.userId !== ctx.session.user.id) {
        throw new Error('Generation not found or unauthorized');
      }

      await prisma.aIGeneration.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  /**
   * Toggle favorite status
   */
  toggleFavorite: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const generation = await prisma.aIGeneration.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!generation) {
        throw new Error('Generation not found');
      }

      const updated = await prisma.aIGeneration.update({
        where: { id: input.id },
        data: { isFavorite: !generation.isFavorite },
      });

      return updated;
    }),

  /**
   * Get favorite generations
   */
  getFavorites: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const [generations, total] = await Promise.all([
        prisma.aIGeneration.findMany({
          where: {
            userId: ctx.session.user.id,
            isFavorite: true,
          },
          orderBy: { createdAt: 'desc' },
          take: input.limit,
          skip: input.offset,
          include: {
            tool: true,
          },
        }),
        prisma.aIGeneration.count({
          where: {
            userId: ctx.session.user.id,
            isFavorite: true,
          },
        }),
      ]);

      return {
        generations,
        total,
        hasMore: input.offset + input.limit < total,
      };
    }),

  /**
   * Get usage statistics
   */
  getUsageStats: protectedProcedure.query(async ({ ctx }) => {
    const [totalGenerations, completedGenerations, failedGenerations, totalCreditsUsed] =
      await Promise.all([
        prisma.aIGeneration.count({
          where: { userId: ctx.session.user.id },
        }),
        prisma.aIGeneration.count({
          where: {
            userId: ctx.session.user.id,
            status: 'COMPLETED',
          },
        }),
        prisma.aIGeneration.count({
          where: {
            userId: ctx.session.user.id,
            status: 'FAILED',
          },
        }),
        prisma.aIGeneration.aggregate({
          where: {
            userId: ctx.session.user.id,
            status: 'COMPLETED',
          },
          _sum: {
            creditsUsed: true,
          },
        }),
      ]);

    // Get most used tool
    const toolUsage = await prisma.aIGeneration.groupBy({
      by: ['toolId', 'toolName'],
      where: {
        userId: ctx.session.user.id,
        status: 'COMPLETED',
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 1,
    });

    return {
      totalGenerations,
      completedGenerations,
      failedGenerations,
      totalCreditsUsed: totalCreditsUsed._sum.creditsUsed || 0,
      mostUsedTool: toolUsage[0] || null,
    };
  }),
});
