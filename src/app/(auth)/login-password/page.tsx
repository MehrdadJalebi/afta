import type { Metadata } from "next"

import { LoginPassword } from "./components/LoginPassword"

export const metadata: Metadata = {
  title: "ورود",
  description: "افتا",
}

export default function LoginPasswordPage() {
  return <LoginPassword />
}
