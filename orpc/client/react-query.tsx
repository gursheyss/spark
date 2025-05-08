'use client'

import { createORPCReactQueryUtils, type RouterUtils } from '@orpc/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { createContext, use, useState } from 'react'
import { client } from './index' // Updated import path
import type { RouterClient } from '@orpc/server'
import type { router } from '../router' // Updated import path
import { getQueryClient } from '../server/react-query' // Updated import path

type ORPCReactUtils = RouterUtils<RouterClient<typeof router>>

export const ORPCContext = createContext<ORPCReactUtils | undefined>(undefined)

export function useORPC(): ORPCReactUtils {
  const orpc = use(ORPCContext)
  if (!orpc) {
    throw new Error('ORPCContext is not set up properly')
  }
  return orpc
}

export function ORPCProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  const [orpc] = useState(() => createORPCReactQueryUtils(client))
  return (
    <QueryClientProvider client={queryClient}>
      <ORPCContext.Provider value={orpc}>{children}</ORPCContext.Provider>
    </QueryClientProvider>
  )
}
