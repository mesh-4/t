import type { Session } from "next-auth"

import { fetcher } from "@/libs/fetcher"

export const getSession = async () => {
  const res = await fetcher.get<Session>("/auth/session")
  if (Object.keys(res.data).length) {
    return res.data
  }
  return null
}
