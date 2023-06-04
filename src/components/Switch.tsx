import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export type Link = 'direct' | 'batch' | 'stream'

export default function Switch() {
	const [linkType, setLinkType] = useState<Link>(() => {
		globalThis.__link = 'direct'
		return 'direct'
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
				<button onClick={() => setLink('direct')} style={linkType === 'direct' ? { backgroundColor: 'royalblue', color: 'white' } : undefined}>Direct</button>
				<button onClick={() => setLink('batch')} style={linkType === 'batch' ? { backgroundColor: 'royalblue', color: 'white' } : undefined}>Batch</button>
				<button onClick={() => setLink('stream')} style={linkType === 'stream' ? { backgroundColor: 'royalblue', color: 'white' } : undefined}>Stream</button>
				<p>Link type: {linkType}</p>
			</div>
			<div>
				<button onClick={clearAll}>Refetch</button>
			</div>
		</>
	)
}