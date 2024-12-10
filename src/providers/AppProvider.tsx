"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren, type ReactNode } from "react"

import { queryClient } from "src/api"

export function AppProviders({ children }: PropsWithChildren): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
