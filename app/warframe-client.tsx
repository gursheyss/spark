'use client'

import { useORPC } from '@/orpc/client/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function WarframeClient() {
	const orpc = useORPC()
	const { data: warframes } = useSuspenseQuery(
		orpc.warframe.list.queryOptions({
			input: {
				limit: 10
			}
		})
	)

	return (
		<div>
			<h1>Warframes</h1>
			<ul>
				{warframes.map((warframe) => (
					<li key={warframe.id}>{warframe.name}</li>
				))}
			</ul>
		</div>
	)
}
