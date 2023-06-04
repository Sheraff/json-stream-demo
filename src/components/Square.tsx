import { trpc } from "utils/trpc"
import styles from './Square.module.css'
import { useState, type CSSProperties, useEffect, useRef } from "react"

export default function Square({
	color,
	delay,
}: {
	color: string,
	delay: number,
}) {
	const { data } = trpc.color.useQuery({
		color,
		delay,
	})

	const startTime = useRef(0)
	const [timeToRender, setTimeToRender] = useState(0)
	useEffect(() => {
		if (!data) {
			startTime.current = performance.now()
			setTimeToRender(0)
		} else {
			setTimeToRender(performance.now() - startTime.current)
		}
	}, [data])

	const ctx = trpc.useContext()
	const onClick = () => {
		ctx.color.reset({ color, delay })
	}

	return (
		<div
			className={styles.main}
			style={{
				"--color": data?.color,
			} as CSSProperties}
			onClick={onClick}
		>
			{timeToRender ? `Loaded in ${(timeToRender / 1_000).toFixed(2)}s` : 'Loading...'}
		</div>
	)
}