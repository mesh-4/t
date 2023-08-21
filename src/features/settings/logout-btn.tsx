"use client"

import * as React from "react"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

function LogoutBtn() {
  return (
    <Button size="sm" variant="outline" onClick={() => signOut()}>
      Logout
    </Button>
  )
}

LogoutBtn.displayName = "LogoutBtn"

export default React.memo(LogoutBtn)
