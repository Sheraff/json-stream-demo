import { httpLink, splitLink, httpBatchLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import superjson from "superjson"

import { type AppRouter } from "server/trpc/router/_app"

const getBaseUrl = () => {
	if (typeof window !== "undefined") return "" // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			queryClientConfig: {
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					}
				}
			},
			transformer: superjson,
			links: [
				splitLink({
					condition: () => globalThis.__link === 'direct',
					true: httpLink({
						url: `${getBaseUrl()}/api/trpc`,
					}),
					false: splitLink({
						condition: () => globalThis.__link === 'batch',
						true: httpBatchLink({
							url: `${getBaseUrl()}/api/trpc`,
						}),
						false: unstable_httpBatchStreamLink({
							url: `${getBaseUrl()}/api/trpc`,
						}),
					}),
				}),
			],
		}
	},
	ssr: false,
})

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>

export { type AppRouter }

export type RouteKey = keyof AppRouter["_def"]["procedures"]

type C = {
	[K in RouteKey]: readonly [K, Exclude<keyof AppRouter["_def"]["procedures"][K] & string, "_def" | "createCaller" | "getErrorShape">]
}

export type SecondRouteKey<S extends RouteKey> = C[S][1]

export type AllRoutes = C[RouteKey]

type E = {
	[K in RouteKey]: `${K}.${Exclude<keyof AppRouter["_def"]["procedures"][K] & string, "_def" | "createCaller" | "getErrorShape">}`
}

export type AllRoutesString = E[RouteKey]

type D = {
	[K in RouteKey]: RouterInputs[K][Exclude<keyof AppRouter["_def"]["procedures"][K] & string, "_def" | "createCaller" | "getErrorShape">]
}

export type AllInputs = D[RouteKey]

export function keyArrayToString<R extends AllRoutes>(route: R) {
	return route.join(".") as `${typeof route[0]}.${typeof route[1]}`
}

export function keyStringToArray<K extends AllRoutesString>(key: K) {
	return key.split(".") as typeof key extends `${infer A}.${infer B}` ? [A, B] : never
}

export type TrpcResponse<T> = { result: { data: { json: T } } }