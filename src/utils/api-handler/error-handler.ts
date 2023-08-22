import { ZodError } from "zod"
import { Prisma } from "@prisma/client"
import createHttpError from "http-errors"
import type { NextApiResponse } from "next"

import { HTTP_ERROR_CODES, PRISMA_ERROR_CODES, HttpErrorCode } from "@/constants"
import type { ErrorResp } from "@/types"

const errorHandler = (err: unknown, res: NextApiResponse<ErrorResp>) => {
  if (err instanceof Error && process.env.NODE_ENV === "development") {
    console.log(err)
  }

  // Handle all errors thrown by prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const statusCode = PRISMA_ERROR_CODES[err.code] ?? 500
    return res.status(statusCode).json({
      error: {
        source: "prisma",
        msg: HTTP_ERROR_CODES[statusCode],
      },
    })
  }

  // Handle all errors thrown by zod module
  if (err instanceof ZodError) {
    return res.status(403).json({
      error: {
        source: "zod",
        msg: err.message,
      },
    })
  }

  // Handle all errors thrown by http-errors module
  if (createHttpError.isHttpError(err) && err.expose) {
    return res.status(err.statusCode).json({
      error: {
        source: "endpoint",
        msg: HTTP_ERROR_CODES[err.statusCode as HttpErrorCode],
      },
    })
  }

  return res.status(500).json({
    error: {
      source: "endpoint",
      msg: "unhandled",
    },
  })
}

export default errorHandler
