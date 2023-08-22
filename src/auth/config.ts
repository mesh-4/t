import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prisma"

const AUTH_OPTIONS: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    error: "/login",
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (!user.email) {
        return false
      }
      return true
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.sub,
          name: token.name,
          email: token.email,
          image: token.image as string | undefined,
        },
      }
    },
    redirect: async ({ url, baseUrl }) => {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same domain
      else if (new URL(url).hostname === new URL(process.env.NEXT_PUBLIC_URL).hostname) return url
      return baseUrl
    },
  },
}

export default AUTH_OPTIONS
