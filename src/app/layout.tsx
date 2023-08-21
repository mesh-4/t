import rtlDetect from "rtl-detect"
import type { Metadata } from "next"

import { useIntl } from "@/locales/server/intl"
import IntlProvider from "@/locales/client/provider"

import RootProvider from "./provider"

import "./globals.css"

export async function generateMetadata(): Promise<Metadata> {
  // const intl = await useIntl()

  const url = process.env.NEXT_PUBLIC_URL
  const title = "T"
  const description = "Try Time"

  return {
    title,
    description,
    authors: [
      {
        name: "Mesh Sun",
        url: "https://about.meshs.codes/",
      },
    ],
    openGraph: {
      type: "website",
      siteName: "Timebox",
      url,
      title,
      description,
    },
    twitter: {
      title,
      description,
      card: "summary",
      site: "@senlima4",
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const intl = await useIntl()
  const langDir = rtlDetect.getLangDir(intl.locale)

  return (
    <html lang={intl.locale} dir={langDir} suppressHydrationWarning>
      <body>
        <IntlProvider locale={intl.locale} messages={intl.messages}>
          <RootProvider>{children}</RootProvider>
        </IntlProvider>
      </body>
    </html>
  )
}
