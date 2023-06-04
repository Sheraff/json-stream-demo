import { type AppType } from "next/dist/shared/lib/utils"
import { trpc } from "utils/trpc"
import Head from "next/head"

const MyApp: AppType = ({
  Component,
  pageProps,
}) => {
  return (
    <>
      <Head>
        <title>JSON Stream demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default trpc.withTRPC(MyApp)