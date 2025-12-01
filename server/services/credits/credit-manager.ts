/**
 * Credit Management Service
 *
 * Handles all credit operations including grants, deductions, balance checks,
 * and transaction history. Uses database transactions for consistency.
 */

import { prisma } from '@/server/db';
import { TRPCError } from '@trpc/server';
import { TransactionType } from '@prisma/client';

export interface GrantCreditsParams {
  userId: string;
  amount: number;
  type: TransactionType;
  description: string;
  metadata?: Record<string, any>;
}

export interface DeductCreditsParams {
  userId: string;
  amount: number;
  toolId: string;
  toolName: string;
  generationId?: string;
}

export interface TransactionHistoryParams {
  userId: string;
  limit?: number;
  offset?: number;
  type?: TransactionType;
}

export class CreditManager {
  /**
   * Grant credits to a user
   * Creates a new credit account if it doesn't exist
   */
  async grantCredits(params: GrantCreditsParams) {
    const { userId, amount, type, description, metadata } = params;

    if (amount <= 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Amount must be positive',
      });
    }

    return await prisma.$transaction(async (tx) => {
      // Get or create credit account
      let creditAccount = await tx.credit.findUnique({
        where: { userId },
      });

      if (!creditAccount) {
        creditAccount = await tx.credit.create({
          data: {
            userId,
            balance: 0,
            lifetimeEarned: 0,
            lifetimeSpent: 0,
          },
        });
      }

      const balanceBefore = creditAccount.balance;
      const balanceAfter = balanceBefore + amount;

      // Update balance and lifetime earned
      const updatedAccount = await tx.credit.update({
        where: { userId },
        data: {
          balance: balanceAfter,
          lifetimeEarned: { increment: amount },
        },
      });

      // Record transaction
      const transaction = await tx.creditTransaction.create({
        data: {
          userId,
          amount,
          type,
          description,
          balanceBefore,
          balanceAfter,
          metadata: metadata || {},
        },
      });

      return { account: updatedAccount, transaction };
    });
  }

  /**
   * Deduct credits from a user
   * Throws error if insufficient credits
   */
  async deductCredits(params: DeductCreditsParams) {
    const { userId, amount, toolId, toolName, generationId } = params;

    if (amount <= 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Amount must be positive',
      });
    }

    return await prisma.$transaction(async (tx) => {
      const creditAccount = await tx.credit.findUnique({
        where: { userId },
      });

      if (!creditAccount) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Credit account not found. Please contact support.',
        });
      }

      if (creditAccount.balance < amount) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: `Insufficient credits. You need ${amount} credits but only have ${creditAccount.balance}.`,
        });
      }

      const balanceBefore = creditAccount.balance;
      const balanceAfter = balanceBefore - amount;

      // Update balance and lifetime spent
      const updatedAccount = await tx.credit.update({
        where: { userId },
        data: {
          balance: balanceAfter,
          lifetimeSpent: { increment: amount },
        },
      });

      // Record transaction
      const transaction = await tx.creditTransaction.create({
        data: {
          userId,
          amount: -amount,
          type: 'DEDUCTION',
          description: `Used ${toolName}`,
          balanceBefore,
          balanceAfter,
          metadata: {
            toolId,
            toolName,
            generationId,
          },
        },
      });

      return { account: updatedAccount, transaction };
    });
  }

  /**
   * Get credit balance for a user
   */
  async getBalance(userId: string): Promise<number> {
    const account = await prisma.credit.findUnique({
      where: { userId },
    });

    return account?.balance || 0;
  }

  /**
   * Get detailed credit account information
   */
  async getAccountDetails(userId: string) {
    let account = await prisma.credit.findUnique({
      where: { userId },
    });

    if (!account) {
      // Create account if it doesn't exist
      account = await prisma.credit.create({
        data: {
          userId,
          balance: 0,
          lifetimeEarned: 0,
          lifetimeSpent: 0,
        },
      });
    }

    return account;
  }

  /**
   * Check if user has sufficient credits
   */
  async hasCredits(userId: string, amount: number): Promise<boolean> {
    const balance = await this.getBalance(userId);
    return balance >= amount;
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(params: TransactionHistoryParams) {
    const { userId, limit = 50, offset = 0, type } = params;

    const where = {
      userId,
      ...(type && { type }),
    };

    const [transactions, total] = await Promise.all([
      prisma.creditTransaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.creditTransaction.count({ where }),
    ]);

    return {
      transactions,
      total,
      hasMore: offset + limit < total,
      page: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get transaction statistics
   */
  async getTransactionStats(userId: string) {
    const account = await this.getAccountDetails(userId);

    const [totalTransactions, lastPurchase, lastUsage] = await Promise.all([
      prisma.creditTransaction.count({
        where: { userId },
      }),
      prisma.creditTransaction.findFirst({
        where: {
          userId,
          type: { in: ['PURCHASE', 'GRANT', 'SUBSCRIPTION'] },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.creditTransaction.findFirst({
        where: {
          userId,
          type: 'DEDUCTION',
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      currentBalance: account.balance,
      lifetimeEarned: account.lifetimeEarned,
      lifetimeSpent: account.lifetimeSpent,
      totalTransactions,
      lastPurchase,
      lastUsage,
    };
  }

  /**
   * Refund credits (admin function)
   */
  async refundCredits(params: {
    userId: string;
    amount: number;
    reason: string;
    originalTransactionId?: string;
  }) {
    const { userId, amount, reason, originalTransactionId } = params;

    return await this.grantCredits({
      userId,
      amount,
      type: 'REFUND',
      description: `Refund: ${reason}`,
      metadata: {
        originalTransactionId,
        reason,
      },
    });
  }

  /**
   * Get low credit users (for notifications)
   */
  async getLowCreditUsers(threshold: number = 100) {
    return await prisma.credit.findMany({
      where: {
        balance: {
          lte: threshold,
          gt: 0,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }
}

// Export singleton instance
export const creditManager = new CreditManager();
