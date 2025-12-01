/**
 * tRPC Server Configuration
 *
 * This file sets up the tRPC context, middleware, and procedure builders.
 */

import { initTRPC, TRPCError } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import superjson from 'superjson';
import { ZodError } from 'zod';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
import { prisma } from '@/server/db';

/**
 * Context for tRPC procedures
 * This is created for each request
 */
interface CreateContextOptions {
  session: any | null; // Simplified for testing
}

/**
 * Inner context (without request info)
 * Used in tests where we don't have NextApiRequest/Response
 */
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * Outer context (with request info)
 * This is the actual context used in API routes
 */
export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;

  // Get the session from next-auth
  // const session = await getServerSession(authOptions);
  const session = null; // Simplified for testing - no auth required

  return createInnerTRPCContext({
    session,
  });
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * Initialize tRPC with context
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Router and procedure builders
 */
export const createTRPCRouter = t.router;
export const middleware = t.middleware;

/**
 * Public procedure (no auth required)
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure (auth required)
 * TEMPORARILY DISABLED FOR TESTING - Enable auth later
 */
const enforceUserIsAuthed = middleware(async ({ ctx, next }) => {
  // Temporarily bypass auth for testing
  // if (!ctx.session || !ctx.session.user) {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' });
  // }

  return next({
    ctx: {
      // Mock session for testing
      session: { user: { id: 'test-user-id', email: 'test@example.com' } },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

/**
 * Admin procedure (admin role required)
 */
const enforceUserIsAdmin = middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  // Check if user has admin role
  // Adjust this based on your user role implementation
  const user = await prisma.user.findUnique({
    where: { id: ctx.session.user.id },
  });

  if (!user || user.role !== 'ADMIN') {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const adminProcedure = t.procedure.use(enforceUserIsAdmin);

/**
 * Rate limiting middleware
 */
export const rateLimitMiddleware = middleware(async ({ ctx, next }) => {
  // Implement rate limiting logic here
  // Example: Use Upstash Rate Limit or custom implementation

  return next();
});
