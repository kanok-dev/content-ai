/**
 * Root tRPC Router
 *
 * This is the primary router for your server.
 * All routers are added here as sub-routers.
 */

import { createTRPCRouter } from './trpc';
import { creditsRouter } from './routers/credits';
import { aiToolsRouter } from './routers/ai-tools';
import { historyRouter } from './routers/history';
import { analyticsRouter } from './routers/analytics';
import { userRouter } from './routers/user';

export const appRouter = createTRPCRouter({
  credits: creditsRouter,
  aiTools: aiToolsRouter,
  history: historyRouter,
  analytics: analyticsRouter,
  user: userRouter,
});

// Export type router type signature
// This is NOT the actual router, just the type definition
export type AppRouter = typeof appRouter;
