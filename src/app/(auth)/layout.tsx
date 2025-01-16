"use client"

import { css } from "@emotion/react"
import type { ReactNode } from "react"

import { themeVariables, themeColors } from "src/styles/bootstrap/variables"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div css={authLayoutBox}>
      <div css={authBackgroundContainer}>
        <div css={infoContainer}>
          <img src="/auth-image.svg" />
          <h2 css={title}>راهکار مدیریت قراردادهای دیجیتال</h2>
          <h3 css={subtitle}>همراه با امضای دیجیتال و احراز هویت</h3>
        </div>
      </div>
      <div css={authFormContainer}>{children}</div>
    </div>
  )
}

const infoContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    z-index: 1;
    max-width: 600px;
    @media (max-width: ${themeVariables.breakpoints.xl}) {
      max-width: 480px;
    }
  }
`

const title = css`
  display: inline-block;
  margin: 0.5rem 0 0.75rem 1.25rem;
  padding: 1.25rem 4rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
  color: ${themeColors.gray_100};
  background: linear-gradient(#e9783f, #801323 40%);

  @media (max-width: ${themeVariables.breakpoints.xl}) {
    font-size: 0.875rem;
    padding: 1rem 4rem;
  }
`

const subtitle = css`
  display: inline-block;
  margin-left: 2rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: 2px dashed #b95e43;
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
  color: #b95e43;

  @media (max-width: ${themeVariables.breakpoints.xl}) {
    font-size: 0.875rem;
    padding: 0.75rem 2rem;
  }
`

const authLayoutBox = css`
  display: flex;
  height: 100vh;
  width: 100%;
`

const authBackgroundContainer = css`
  position: relative;
  height: 100%;
  flex: 6;
  @media (max-width: ${themeVariables.breakpoints.xl}) {
    flex: 4;
  }
  @media (max-width: ${themeVariables.breakpoints.lg}) {
    display: none;
  }
`

const authFormContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  margin: 2rem;
  padding: 2rem;
  flex: 3;
  border-radius: 0.5rem;
  box-shadow: ${themeVariables.boxShadows.shadowTwo};
  @media (max-width: ${themeVariables.breakpoints.lg}) {
    padding: 1.5rem;
    margin: 0;
    border-radius: 0;
  }
`
