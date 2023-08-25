"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import { usePostHog } from "posthog-js/react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"

function SignInForm() {
  const posthog = usePostHog()
  const searchParams = useSearchParams()
  const next = searchParams?.get("next")
  const [clicked, setClicked] = React.useState(false)

  React.useEffect(() => {
    const error = searchParams?.get("error")
    error && console.error(error)
  }, [searchParams])

  const onClick = () => {
    setClicked(true)
    posthog.capture("auth_form-github_signin")
    signIn("github", { callbackUrl: next && next.length > 0 ? next : "/app" })
  }

  return (
    <div className="flex flex-col space-y-3 px-4 py-8 sm:px-16">
      <Button onClick={onClick} disabled={clicked}>
        Continue with Github
      </Button>
    </div>
  )
}

export default SignInForm
