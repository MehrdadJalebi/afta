"use client"

import clsx from "clsx"
import { type ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Vazirmatn } from "src/app/fonts"

export function ToastProvider(): ReactNode {
  return (
    <ToastContainer
      theme="colored"
      position="bottom-center"
      bodyClassName={clsx(Vazirmatn.className, Vazirmatn.variable)}
      style={{ width: "min(400px, 100%)" }}
      hideProgressBar
      autoClose={4000}
      rtl
    />
  )
}
