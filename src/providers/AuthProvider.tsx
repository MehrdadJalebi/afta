"use client"

import React, {
  PropsWithChildren,
  useEffect,
  type ReactNode,

} from "react"
import { useAccountStore } from "@/store"
import { Spinner } from "react-bootstrap"
import { useRouter } from "next/navigation"

import {
  redirectToLogin,
} from "@/api/api-service"

export function AuthProviders({ children }: PropsWithChildren): ReactNode {
  const { bearerToken, setBearerToken } = useAccountStore()

  useEffect(() => {
    const localStorageToken = localStorage.getItem("bearerToken") as string
    if (localStorageToken) {
      setBearerToken(localStorageToken)
    } else {
      //redirectToLogin()
    }
  }, [])

  return !bearerToken ? (
    <>
      {children}
    </>
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
