import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export type Link = 'direct' | 'batch' | 'stream'

export default function Switch() {
	const [linkType, setLinkType] = useState<Link>(() => {
		globalThis.__link = 'stream'
		return 'stream'
	})
	const setLink = (link: Link) => {
		setLinkType(link)
		globalThis.__link = link
	}

	const queryClient = useQueryClient()
	const clearAll = () => {
		queryClient.resetQueries()
	}

	return (
		<>
			<div>
				<button onClick={() => setLink('direct')}>Direct</button>
				<button onClick={() => setLink('batch')}>Batch</button>
				<button onClick={() => setLink('stream')}>Stream</button>
				<p>Link type: {linkType}</p>
			</div>
			<div>
				<button onClick={clearAll}>Refetch</button>
			</div>
		</>
	)
}