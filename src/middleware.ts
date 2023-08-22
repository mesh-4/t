import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

import { localeMiddleware } from "@/locales/middleware"

export const middleware = async (request: NextRequest) => {
  const response = localeMiddleware({ request })

  if (request.nextUrl.pathname.startsWith("/app")) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!session) {
      return NextResponse.redirect("/login")
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
