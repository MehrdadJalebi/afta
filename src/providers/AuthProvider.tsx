"use client"

import React, { PropsWithChildren, useEffect, type ReactNode } from "react"
import { useAccountStore } from "@/store"
import { Spinner } from "react-bootstrap"
import Cookies from "js-cookie"

import { getIsPublicUrl, redirectToLogin } from "@/api/api-service"
import { useRouter } from "next/navigation"

export function AuthProviders({ children }: PropsWithChildren): ReactNode {
  const { bearerToken, setBearerToken } = useAccountStore()
  const router = useRouter()

  useEffect(() => {
    if (!bearerToken) {
      const cookieToken = Cookies.get("accessToken")
      if (cookieToken) {
        setBearerToken(cookieToken)
      } else {
        redirectToLogin()
      }
    }
  }, [])
  // @ts-ignore
  return bearerToken || getIsPublicUrl(router?.pathname) ? (
    <>{children}</>
  ) : (
    <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
      <Spinner
        animation="border"
        role="status"
        variant="danger"
        style={{ width: 50, height: 50 }}
      />
    </div>
  )
}
