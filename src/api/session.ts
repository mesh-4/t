import { fetcher } from "@/libs/fetcher"

export const getSession = async () => {
  const res = await fetcher.get("/api/auth/session")
  if (Object.keys(res.data).length) {
    return res.data
  }
  return null
}
