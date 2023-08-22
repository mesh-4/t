"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import { Google } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"

function SignInForm() {
  const searchParams = useSearchParams()
  const next = searchParams?.get("next")
  const [clickedGoogle, setClickedGoogle] = React.useState(false)

  React.useEffect(() => {
    const error = searchParams?.get("error")
    error && console.error(error)
  }, [searchParams])

  const onClick = () => {
    setClickedGoogle(true)
    signIn("github", {
      ...(next && next.length > 0 ? { callbackUrl: next } : {}),
    })
  }

  return (
    <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16 dark:bg-gray-700">
      <Button onClick={onClick} disabled={clickedGoogle}>
        <Google className="h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  )
}

export default SignInForm
