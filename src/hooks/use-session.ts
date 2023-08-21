import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { getSession } from "@/api/session"

export function useSession({ required = false, redirectTo = "/api/auth/signin?error=SessionExpired" } = {}) {
  const router = useRouter()
  const query = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    onSettled(data) {
      if (data || !required) return
      router.push(redirectTo)
    },
  })

  return [query.data, query.status === "loading"]
}
