import type { RouterClient } from '@orpc/server'
import { RPCLink } from '@orpc/client/fetch'
import { createORPCClient } from '@orpc/client'
import type { router } from '../router' // Updated import path
import { createORPCReactQueryUtils } from '@orpc/react-query'

declare global {
	var $client: RouterClient<typeof router> | undefined
}

const link = new RPCLink({
	url: () => {
		if (typeof window === 'undefined') {
			throw new Error('RPCLink is not allowed on the server side.')
		}

		return new URL('/rpc', window.location.href)
	}
})

/**
 * Fallback to client-side client if server-side client is not available.
 */
export const client: RouterClient<typeof router> =
	globalThis.$client ?? createORPCClient(link)

export const orpc = createORPCReactQueryUtils(client)
