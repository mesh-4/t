"use client"

import * as React from "react"
import { format } from "date-fns"

import { useStore } from "@/store"

export default function CoreAppProvider({ children }: { children: React.ReactNode }) {
  const setDate = useStore((state) => state.setDate)

  React.useEffect(() => {
    setDate(format(new Date(), "yyyy/MM/dd"))
  }, [])

  return <>{children}</>
}
