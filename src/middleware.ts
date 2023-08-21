import type { NextRequest } from "next/server"

import { localeMiddleware } from "@/locales/middleware"

export const middleware = (request: NextRequest) => {
  const response = localeMiddleware({ request })

  console.log(request.nextUrl.pathname)

  return response
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
