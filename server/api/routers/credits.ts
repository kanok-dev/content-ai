/**
 * Credits tRPC Router
 *
 * Handles all credit-related API endpoints
 */

import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, adminProcedure } from '../trpc';
import { creditManager } from '@/server/services/credits/credit-manager';
import { TransactionType } from '@prisma/client';

export const creditsRouter = createTRPCRouter({
  /**
   * Get current credit balance
   */
  getBalance: protectedProcedure.query(async ({ ctx }) => {
    return await creditManager.getBalance(ctx.session.user.id);
  }),

  /**
   * Get detailed account information
   */
  getAccountDetails: protectedProcedure.query(async ({ ctx }) => {
    return await creditManager.getAccountDetails(ctx.session.user.id);
  }),

  /**
   * Get transaction statistics
   */
  getStats: protectedProcedure.query(async ({ ctx }) => {
    return await creditManager.getTransactionStats(ctx.session.user.id);
  }),

  /**
   * Grant credits to user (admin only or internal use)
   */
  grantCredits: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive().max(1000000),
        type: z.nativeEnum(TransactionType),
        description: z.string().min(1).max(500),
        metadata: z.record(z.any()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await creditManager.grantCredits({
        userId: ctx.session.user.id,
        ...input,
      });
    }),

  /**
   * Check if user has sufficient credits
   */
  hasCredits: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await creditManager.hasCredits(ctx.session.user.id, input.amount);
    }),

  /**
   * Get transaction history with pagination and filters
   */
  getTransactionHistory: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
        type: z.nativeEnum(TransactionType).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await creditManager.getTransactionHistory({
        userId: ctx.session.user.id,
        ...input,
      });
    }),

  /**
   * Get recent transactions (quick view)
   */
  getRecentTransactions: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(20).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      return await creditManager.getTransactionHistory({
        userId: ctx.session.user.id,
        limit: input.limit,
        offset: 0,
      });
    }),

  // ============================================
  // ADMIN ENDPOINTS
  // ============================================

  /**
   * Grant credits to any user (admin only)
   */
  adminGrantCredits: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        amount: z.number().positive().max(1000000),
        type: z.nativeEnum(TransactionType),
        description: z.string().min(1).max(500),
        metadata: z.record(z.any()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await creditManager.grantCredits(input);
    }),

  /**
   * Refund credits (admin only)
   */
  adminRefundCredits: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        amount: z.number().positive().max(1000000),
        reason: z.string().min(1).max(500),
        originalTransactionId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await creditManager.refundCredits(input);
    }),

  /**
   * Get users with low credits (admin only)
   */
  adminGetLowCreditUsers: adminProcedure
    .input(
      z.object({
        threshold: z.number().positive().default(100),
      })
    )
    .query(async ({ input }) => {
      return await creditManager.getLowCreditUsers(input.threshold);
    }),
});
