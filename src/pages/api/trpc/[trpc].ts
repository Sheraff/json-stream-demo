import { createNextApiHandler } from "@trpc/server/adapters/next"
import { appRouter } from "server/trpc/router/_app"

// export API handler
export default createNextApiHandler({
	router: appRouter,
	batching: {
		enabled: true,
	},
})
