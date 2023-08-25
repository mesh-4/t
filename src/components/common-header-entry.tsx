"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { usePostHog } from "posthog-js/react"

import { Button } from "@/components/ui/button"

type CommonHeaderEntryProps = {
  isAuth?: boolean
}

const CommonHeaderEntry = ({ isAuth = false }: CommonHeaderEntryProps) => {
  const router = useRouter()
  const posthog = usePostHog()

  if (isAuth) {
    return (
      <Button
        onClick={() => {
          posthog.capture("home-header_dashboard")
          router.push("/app")
        }}>
        Dashboard
      </Button>
    )
  }

  return (
    <Button
      onClick={() => {
        posthog.capture("home-header_login")
        router.push("/login")
      }}>
      Join
    </Button>
  )
}

export default CommonHeaderEntry
