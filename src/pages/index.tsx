import Grid from "components/Grid"
import Square from "components/Square"
import Switch from "components/Switch"

export default function Home() {
	return (
		<>
			<Switch />
			<Grid>
				<Square color="red" delay={532} />
				<Square color="green" delay={150} />
				<Square color="purple" delay={1800} />
				<Square color="orange" delay={2000} />
				<Square color="limegreen" delay={1000} />
				<Square color="pink" delay={100} />
				<Square color="lightblue" delay={300} />
				<Square color="royalblue" delay={1200} />
				<Square color="coral" delay={1700} />
			</Grid>
		</>
	)
}

// list of 9 random numbers (all different) between 150 and 2000
const delays = [532, 150, 1800, 2000, 1000, 100, 300, 1200, 1700]