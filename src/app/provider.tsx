"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { CacheProvider } from "@chakra-ui/next-js"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { QUERY_CLIENT_CONFIG } from "@/constants"

export default function RootProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient(QUERY_CLIENT_CONFIG))

  return (
    <CacheProvider>
      <ChakraProvider>
        <SessionProvider refetchOnWindowFocus={false}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SessionProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
