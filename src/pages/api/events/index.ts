import createHttpError from "http-errors"
import { startOfDay, endOfDay } from "date-fns"
import type { NextApiHandler } from "next"

import prisma from "@/libs/prisma"
import apiHandler from "@/utils/api-handler"
import { ReadEventParams, CreateEventPayload } from "@/features/events/schema"
import { getSessionUser } from "@/auth/get-session-user"

const GET: NextApiHandler = async (req, res) => {
  const user = await getSessionUser({ req, res })
  if (!user) {
    throw new createHttpError.Unauthorized()
  }

  const { page = "0", limit = "20", date, order = "asc", orderBy = "createdAt" } = ReadEventParams.parse(req.query)

  const data = await prisma.event.findMany({
    where: {
      userId: user.id,
      ...(date && {
        start: {
          gte: startOfDay(new Date(date)),
          lte: endOfDay(new Date(date)),
        },
      }),
    },
    ...(!date && {
      skip: +page * +limit,
      take: +limit,
    }),
    ...(orderBy && {
      orderBy: {
        [orderBy]: order,
      },
    }),
  })

  const length = await prisma.event.count({
    where: {
      id: user.id,
    },
  })

  return res.status(200).json({
    data,
    length,
    hasNextPage: +page * +limit + +limit < length,
  })
}

const POST: NextApiHandler = async (req, res) => {
  const user = await getSessionUser({ req, res })
  if (!user) {
    throw new createHttpError.Unauthorized()
  }

  const input = CreateEventPayload.parse(req.body)

  const event = await prisma.event.create({
    data: {
      title: input.title,
      note: input.note,
      start: input.start && new Date(input.start),
      end: input.end && new Date(input.end),
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  return res.status(201).json({
    data: event,
  })
}

export default apiHandler({
  GET,
  POST,
})
