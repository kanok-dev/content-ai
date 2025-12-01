/**
 * User tRPC Router
 *
 * Handles user profile and settings
 */

import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from '@/server/db';

export const userRouter = createTRPCRouter({
  /**
   * Get current user profile
   */
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        credit: true,
      },
    });

    return user;
  }),

  /**
   * Update user profile
   */
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100).optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),

  /**
   * Get user dashboard stats
   */
  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const [creditAccount, totalGenerations, recentGenerations] = await Promise.all([
      prisma.credit.findUnique({
        where: { userId },
      }),
      prisma.aIGeneration.count({
        where: {
          userId,
          status: 'COMPLETED',
        },
      }),
      prisma.aIGeneration.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          tool: {
            select: {
              name: true,
              icon: true,
            },
          },
        },
      }),
    ]);

    return {
      creditBalance: creditAccount?.balance || 0,
      lifetimeEarned: creditAccount?.lifetimeEarned || 0,
      lifetimeSpent: creditAccount?.lifetimeSpent || 0,
      totalGenerations,
      recentGenerations,
    };
  }),
});
