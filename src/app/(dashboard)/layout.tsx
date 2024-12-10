"use client"

import { css } from "@emotion/react"
import { useState } from "react"

import { sidebarItems } from "@/components/UI/YSidebar/utils"
import { themeColors, themeVariables } from "@/styles/bootstrap/variables"
import { YHeader, YSidebar } from "@/components/UI"
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/constants/layout"

export default function DashboardLayout({ children }: LayoutProps) {
  const [showSidebar, setShowSidebar] = useState(true)

  function toggleSidebar() {
    setShowSidebar(!showSidebar)
  }

  return (
    <div css={mainWrapper}>
      <YHeader onToggleSidebar={toggleSidebar} />
      <YSidebar
        sidebarItems={sidebarItems}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        scroll
      />

      <div css={contentContainer(showSidebar)}>{children}</div>
    </div>
  )
}

const mainWrapper = css`
  background-color: ${themeColors.gray_200};
`

const contentContainer = (showSidebar: boolean) => css`
  padding-top: calc(${HEADER_HEIGHT}px + 32px);
  padding-right: calc(${showSidebar ? SIDEBAR_WIDTH : "0"}px + 32px);
  padding-bottom: 120px;
  padding-left: 32px;
  transition: padding-right 0.4s ease-out;
  @media (max-width: ${themeVariables.breakpoints.lg}) {
    padding-right: 32px;
  }
`
