import createHttpError from "http-errors"
import type { NextApiHandler } from "next"

import prisma from "@/libs/prisma"
import apiHandler from "@/utils/api-handler"
import { getSessionUser } from "@/auth/get-session-user"
import { UpdateEventPayload } from "@/features/events/schema"

const GET: NextApiHandler = async (req, res) => {
  const eventId = req.query.id as string

  const user = await getSessionUser({ req, res })
  if (!user) {
    throw new createHttpError.Unauthorized()
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
      userId: user.id,
    },
  })
  if (!event) {
    throw new createHttpError.NotFound()
  }

  return res.status(200).json({
    data: event,
  })
}

const PUT: NextApiHandler = async (req, res) => {
  const eventId = req.query.id as string

  const user = await getSessionUser({ req, res })
  if (!user) {
    throw new createHttpError.Unauthorized()
  }

  const input = UpdateEventPayload.parse(req.body)
  const formattedInput = {
    title: input.title,
    note: input.note,
    start: input.start,
    end: input.end,
  }

  const data = await prisma.event.update({
    where: {
      id: eventId,
      userId: user.id,
    },
    data: {
      ...formattedInput,
    },
  })

  return res.status(200).json({
    data,
  })
}

const DELETE: NextApiHandler = async (req, res) => {
  const eventId = req.query.id as string

  const user = await getSessionUser({ req, res })
  if (!user) {
    throw new createHttpError.Unauthorized()
  }

  await prisma.event.delete({
    where: {
      id: eventId,
      userId: user.id,
    },
  })

  res.status(204).end()
  return
}

export default apiHandler({
  GET,
  PUT,
  DELETE,
})
