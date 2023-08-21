import isNil from "lodash/isNil"
import omitBy from "lodash/omitBy"
import type { NextApiHandler } from "next"

import prisma from "@/libs/prisma"
import { getSessionUser } from "@/auth/get-session-user"
import type { UpdateEventInput } from "@/types"

const handler: NextApiHandler = async (req, res) => {
  const eventId = req.query.id as string

  if (req.method !== "GET" && req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end()
  }

  const user = await getSessionUser({ req, res })
  if (!user) {
    return res.status(401).end()
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  })
  if (!event || event.userId !== user.id) {
    return res.status(req.method === "GET" ? 404 : 403).end()
  }

  if (req.method === "GET") {
    return res.status(200).json({
      data: event,
    })
  }

  if (req.method === "POST") {
    const input = req.body as UpdateEventInput

    const formattedInput = omitBy(
      {
        title: input.title,
        start: input.start ? new Date(input.start) : undefined,
        end: input.end ? new Date(input.end) : undefined,
      },
      isNil
    )

    const data = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...formattedInput,
      },
    })

    return res.status(200).json({
      data,
    })
  }

  if (req.method === "DELETE") {
    await prisma.event.delete({
      where: {
        id: eventId,
      },
    })

    return res.status(200).end()
  }
}

export default handler
