import { startOfDay, endOfDay, minutesToMilliseconds } from "date-fns"
import type { NextApiHandler } from "next"

import prisma from "@/libs/prisma"
import { getSessionUser } from "@/auth/get-session-user"
import type { CreateEventInput, ReadEventsQuery } from "@/types"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end()
  }

  const user = await getSessionUser({ req, res })
  if (!user) {
    return res.status(401).end()
  }

  if (req.method === "GET") {
    const { page = "0", limit = "20", date, order = "asc", orderBy = "createdAt" } = req.query as ReadEventsQuery

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

  if (req.method === "POST") {
    const input = req.body as CreateEventInput

    const createTime = Date.now()

    // * find nearest 15 minutes
    const nearestSlot = Math.round(createTime / minutesToMilliseconds(15)) * minutesToMilliseconds(15)

    const link = await prisma.event.create({
      data: {
        title: input.title,
        start: new Date(input.start ?? createTime),
        end: new Date(input.end ?? nearestSlot + minutesToMilliseconds(15)),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    return res.status(200).json({
      data: link,
    })
  }
}

export default handler
