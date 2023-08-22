import createHttpError from 'http-errors'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import type { ErrorResp, HttpMethod } from '@/types'

import errorHandler from './error-handler'

type ApiMethodHandlers = {
	[key in Uppercase<HttpMethod>]?: NextApiHandler
}

const apiHandler = (handler: ApiMethodHandlers) => {
	return async (req: NextApiRequest, res: NextApiResponse<ErrorResp>) => {
		try {
			const method = req.method ? (req.method.toUpperCase() as keyof ApiMethodHandlers) : undefined
			if (!method) {
				throw createHttpError(405)
			}

			const methodHandler = handler[method]
			if (!methodHandler) {
				throw createHttpError(405)
			}

			// call method handler
			await methodHandler(req, res)
		} catch (err) {
			// global error handler
			return errorHandler(err, res)
		}
	}
}

export default apiHandler
