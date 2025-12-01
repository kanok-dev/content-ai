/**
 * Analytics tRPC Router
 *
 * Tracks and reports usage analytics
 */

import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, adminProcedure } from '../trpc';
import { prisma } from '@/server/db';

export const analyticsRouter = createTRPCRouter({
  /**
   * Get user's usage analytics
   */
  getUserAnalytics: protectedProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        groupBy: z.enum(['day', 'week', 'month']).default('day'),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const startDate = input.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
      const endDate = input.endDate || new Date();

      const analytics = await prisma.usageAnalytics.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: { date: 'asc' },
      });

      return analytics;
    }),

  /**
   * Get tool usage breakdown
   */
  getToolUsageBreakdown: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const toolUsage = await prisma.aIGeneration.groupBy({
      by: ['toolId', 'toolName'],
      where: {
        userId,
        status: 'COMPLETED',
      },
      _count: {
        id: true,
      },
      _sum: {
        creditsUsed: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    return toolUsage.map((usage) => ({
      toolId: usage.toolId,
      toolName: usage.toolName,
      count: usage._count.id,
      creditsUsed: usage._sum.creditsUsed || 0,
    }));
  }),

  /**
   * Track usage event (internal use)
   */
  trackUsage: protectedProcedure
    .input(
      z.object({
        toolId: z.string(),
        toolName: z.string(),
        creditsUsed: z.number(),
        tokensUsed: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Upsert usage analytics for today
      await prisma.usageAnalytics.upsert({
        where: {
          userId_date_toolId: {
            userId,
            date: today,
            toolId: input.toolId,
          },
        },
        create: {
          userId,
          date: today,
          toolId: input.toolId,
          toolName: input.toolName,
          generationsCount: 1,
          creditsUsed: input.creditsUsed,
          tokensUsed: input.tokensUsed || 0,
        },
        update: {
          generationsCount: { increment: 1 },
          creditsUsed: { increment: input.creditsUsed },
          tokensUsed: { increment: input.tokensUsed || 0 },
        },
      });

      return { success: true };
    }),

  // ============================================
  // ADMIN ANALYTICS
  // ============================================

  /**
   * Get system-wide analytics (admin only)
   */
  getSystemAnalytics: adminProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input }) => {
      const startDate = input.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const endDate = input.endDate || new Date();

      const [totalUsers, activeUsers, totalGenerations, totalRevenue] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({
          where: {
            aiGenerations: {
              some: {
                createdAt: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
          },
        }),
        prisma.aIGeneration.count({
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
            status: 'COMPLETED',
          },
        }),
        prisma.creditTransaction.aggregate({
          where: {
            type: 'PURCHASE',
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

      return {
        totalUsers,
        activeUsers,
        totalGenerations,
        totalRevenue: totalRevenue._sum.amount || 0,
      };
    }),
});
