/**
 * tRPC Client Configuration
 *
 * Sets up the tRPC client with React Query for the frontend
 */

import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { type AppRouter } from '@/server/api/root';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

export function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
}

export function getTRPCClientConfig() {
  return {
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === 'development' ||
          (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: getUrl(),
        transformer: superjson,
      }),
    ],
  };
}
