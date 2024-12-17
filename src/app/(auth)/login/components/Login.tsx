"use client"

import { css } from "@emotion/react"
import { useState } from "react"

import { OTPForm } from "src/app/(auth)/components/OTPForm"
import { themeColors, themeVariables } from "src/styles/bootstrap/variables"

import { LoginForm } from "./LoginForm"

export function Login() {
  const [step, setStep] = useState<"form" | "otp">("form")
  const [formData, setFormData] = useState<any>({
    phoneNumber: "",
  })

  function handleSubmitForm(data: any) {
    setStep("otp")
    setFormData(data)
  }

  return (
    <>
      <div css={formContainer}>
        {step === "form" ? (
          <LoginForm onSubmitForm={handleSubmitForm} />
        ) : (
          <OTPForm
            phoneNumber={formData.phoneNumber}
            onReturnToForm={() => setStep("form")}
          />
        )}
      </div>
    </>
  )
}

const aftaLogo = css`
  display: flex;
  align-items: center;

  &::before {
    content: " ";
    display: block;
    margin-left: 0.75rem;
    width: 32px;
    height: 2px;
    background-color: ${themeColors.primary};
  }
`

const formContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`
