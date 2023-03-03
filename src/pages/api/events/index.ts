import { getServerSession } from "next-auth/next"
import { startOfDay, endOfDay, minutesToMilliseconds } from "date-fns"
import type { NextApiHandler } from "next"

import prisma from "@/libs/prisma"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import type { CreateEventInput, ReadEventsQuery } from "@/types"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session?.user || session.user.id === "") {
    return res.status(401).end()
  }

  if (req.method === "GET") {
    const { page = "0", limit = "20", date, order = "asc", orderBy = "createdAt" } = req.query as ReadEventsQuery

    const data = await prisma.event.findMany({
      where: {
        userId: session.user.id,
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
        id: session.user.id,
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
        start: new Date(input.start ?? nearestSlot),
        end: new Date(input.end ?? nearestSlot + minutesToMilliseconds(15)),
        user: {
          connect: {
            id: session.user.id,
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
