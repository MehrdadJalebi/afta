"use client"

import { css } from "@emotion/react"
import { themeColors } from "src/styles/bootstrap/variables"

import { LoginPasswordForm } from "./LoginPasswordForm"

export function LoginPassword() {
  return (
    <>
      <div css={formContainer}>
        <LoginPasswordForm />
      </div>
    </>
  )
}

const emzanoLogo = css`
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
