import { HydrateClient } from '@/orpc/server/react-query'
import { getQueryClient } from '@/orpc/server/react-query'
import WarframeClient from './warframe-client'
import { orpc } from '@/orpc/client'

export default async function Home() {
	const queryClient = getQueryClient()

	await queryClient.prefetchQuery(
		orpc.warframe.list.queryOptions({
			input: {
				limit: 10
			}
		})
	)
	return (
		<HydrateClient>
			<WarframeClient />
		</HydrateClient>
	)
}
