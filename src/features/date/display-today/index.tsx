"use client"

import * as React from "react"
import { isSameDay } from "date-fns"

import { useStore } from "@/store"

function DisplayToday({ children }: { children: React.ReactNode }) {
  const date = useStore((state) => state.date)

  if (!isSameDay(new Date(date), new Date())) {
    return null
  }
  return <>{children}</>
}

export default DisplayToday
