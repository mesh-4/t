"use client"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@chakra-ui/react"

type CommonHeaderEntryProps = {
  isAuth?: boolean
}

const CommonHeaderEntry = ({ isAuth = false }: CommonHeaderEntryProps) => {
  const router = useRouter()

  if (isAuth) {
    return <Button onClick={() => router.push("/app")}>Dashboard</Button>
  }

  return <Button onClick={() => signIn("github")}>Join</Button>
}

export default CommonHeaderEntry
