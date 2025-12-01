/**
 * tRPC Server Client
 *
 * For server-side tRPC calls in Server Components
 */

import 'server-only';
import { cache } from 'react';
import { createTRPCProxyClient, loggerLink, TRPCClientError, httpBatchLink } from '@trpc/client';
import { callTRPCProcedure } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { type TRPCErrorResponse } from '@trpc/server/rpc';
import { headers } from 'next/headers';
import { appRouter, type AppRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';
import superjson from 'superjson';

/**
 * Server-side tRPC caller with caching
 */
export const api = cache(async () => {
  const requestHeaders = new Headers(await headers());

  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`,
        transformer: superjson,
      }),
      loggerLink({
        enabled: (op) =>
          process.env.NODE_ENV === 'development' ||
          (op.direction === 'down' && op.result instanceof Error),
      }),
    ],
  });
});
