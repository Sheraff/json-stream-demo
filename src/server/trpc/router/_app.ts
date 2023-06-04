import { publicProcedure, router } from "../trpc"
import { z } from "zod"

const color = publicProcedure.input(z.object({
  delay: z.number().optional(),
  color: z.string(),
})).query(async ({ input }) => {
  await new Promise((resolve) => setTimeout(resolve, input.delay ?? 0))
  return {
    color: input.color,
  }
})

export const appRouter = router({
  color,
})

// export type definition of API
export type AppRouter = typeof appRouter