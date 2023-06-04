import styles from "./Grid.module.css"

export default function Grid({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={styles.main}
		>
			{children}
		</div>
	)
}