declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_ID: string
    GITHUB_SECRET: string

    NEXT_PUBLIC_URL: string

    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
  }
}
