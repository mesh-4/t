"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

type CommonHeaderEntryProps = {
  isAuth?: boolean
}

const CommonHeaderEntry = ({ isAuth = false }: CommonHeaderEntryProps) => {
  const router = useRouter()

  if (isAuth) {
    return <Button onClick={() => router.push("/app")}>Dashboard</Button>
  }

  return <Button onClick={() => router.push("/login")}>Join</Button>
}

export default CommonHeaderEntry
