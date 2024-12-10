import type { Metadata } from "next"
import { Vazirmatn } from "./fonts"
import "src/styles/index.scss"

import clsx from "clsx"
import { AppProviders } from "@/providers/AppProvider"
import { AuthProviders } from "@/providers/AuthProvider"
import { ToastProvider } from "@/providers/ToastProvider"
import { Suspense } from "react"
import { CUSTOM_THEME } from "@/constants"

export const metadata: Metadata = {
  title: "افتا",
  description: "پنل افتا",
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <AppProviders>
      <html
        lang="fa"
        dir="rtl"
        className={clsx(Vazirmatn.className, Vazirmatn.variable)}
      >
        <body className="w-100 min-vh-100" data-custom-theme={CUSTOM_THEME}>
          <AuthProviders>
            <Suspense fallback={<>Loading...</>}>{children}</Suspense>
          </AuthProviders>
          <ToastProvider />
        </body>
      </html>
    </AppProviders>
  )
}
