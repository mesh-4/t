import { z } from "zod"
import createHttpError from "http-errors"
import { startOfDay, endOfDay } from "date-fns"
import type { NextApiHandler } from "next"

import prisma from "@/libs/prisma"
import apiHandler from "@/utils/api-handler"
import { getSessionUser } from "@/auth/get-session-user"

const ReadEventByDateParams = z.object({
  "date-str": z.string(),
})

const GET: NextApiHandler = async (req, res) => {
  const user = await getSessionUser({ req, res })
  if (!user) {
    throw new createHttpError.Unauthorized()
  }

  const params = ReadEventByDateParams.parse(req.query) // should be in format YYYY-MM-DD
  const date = new Date(params["date-str"])

  const data = await prisma.event.findMany({
    where: {
      userId: user.id,
      start: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
    orderBy: {
      start: "asc",
    },
  })

  return res.status(200).json({
    data,
  })
}

export default apiHandler({
  GET,
})
