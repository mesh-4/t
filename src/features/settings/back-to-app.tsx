"use client"

import * as React from "react"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

function BackToApp() {
  const router = useRouter()

  const onClick = () => {
    router.push("/app")
  }

  return (
    <Button size="icon" variant="ghost" className="w-6 h-6" onClick={onClick} aria-label="Back to app">
      <ChevronLeftIcon />
    </Button>
  )
}

export default BackToApp
