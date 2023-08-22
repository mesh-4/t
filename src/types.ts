export type ErrorResp = {
  error: {
    source?: string
    msg: string
  }
}

export type HttpMethod = "GET" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT" | "PATCH" | "PURGE" | "LINK" | "UNLINK"
