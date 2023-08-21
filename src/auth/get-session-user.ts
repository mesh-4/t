import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from "next"

import AUTH_OPTIONS from "./config"

type GetSessionUserOptions = {
  req: NextApiRequest
  res: NextApiResponse
  required?: boolean
}

/**
 * Get the session user from the request
 */
export const getSessionUser = async ({ req, res }: GetSessionUserOptions) => {
  const session = await getServerSession(req, res, AUTH_OPTIONS)
  if (!session?.user) {
    return null
  }
  return session.user
}

/**
 * Get the session user from the request at route handler(next 13)
 */
export const useSessionUser = async () => {
  const session = await getServerSession(AUTH_OPTIONS)
  if (!session?.user) {
    return null
  }
  return session.user
}
