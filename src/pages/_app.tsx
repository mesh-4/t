import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"

import theme from "@/theme"
import { QUERY_CLIENT_CONFIG } from "@/constants"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient(QUERY_CLIENT_CONFIG))

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
