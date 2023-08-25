import { z } from "zod"
import createHttpError from "http-errors"
import { startOfDay, addHours } from "date-fns"
import type { NextApiHandler } from "next"

import prisma from "@/libs/prisma"
import apiHandler from "@/utils/api-handler"
import { getSessionUser } from "@/auth/get-session-user"

const ReadEventByDateParams = z.object({
  "date-str": z.string(),
  tz: z.string().optional(),
})

const GET: NextApiHandler = async (req, res) => {
  const user = await getSessionUser({ req, res })
  if (!user) {
    throw new createHttpError.Unauthorized()
  }

  const params = ReadEventByDateParams.parse(req.query)
  const date = new Date(params["date-str"]) // date-str should be in format YYYY-MM-DD
  const tz = params.tz // client timezone offset in hours. e.g: -7, 8.5, 0

  let start = startOfDay(date) // UTC start time
  if (tz) {
    start = new Date(start.getTime() - parseInt(tz, 10) * 60 * 60 * 1000)
  }

  const data = await prisma.event.findMany({
    where: {
      userId: user.id,
      start: {
        gte: start,
        lt: addHours(start, 24),
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
