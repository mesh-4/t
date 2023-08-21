"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { QUERY_CLIENT_CONFIG } from "@/constants"

export default function RootProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient(QUERY_CLIENT_CONFIG))

  return (
    <ThemeProvider attribute="class">
      <SessionProvider refetchOnWindowFocus={false}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
