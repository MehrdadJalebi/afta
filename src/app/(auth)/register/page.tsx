import type { Metadata } from "next"

import { Register } from "./components/Register"

export const metadata: Metadata = {
  title: "ثبت نام",
  description: "افتا",
}

export default function RegisterPage() {
  return <Register />
}
