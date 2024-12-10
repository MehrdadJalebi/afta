import React from "react"
import Tab from "react-bootstrap/Tab"
import Tabs, { TabsProps } from "react-bootstrap/Tabs"
import type { EventKey } from "@restart/ui/types"
import "./index.scss"
import clsx from "clsx"

export type TabItem = {
  title: string
  key: EventKey
  content?: React.ReactNode
  tabClassName?: string
}

export interface YTabsProps extends TabsProps {
  items: TabItem[]
  className?: string
}

export const YTabs = ({ items, className, ...rest }: YTabsProps) => {
  const tabsClassName = clsx(className, "y-tabs")

  return (
    <Tabs {...rest} className={tabsClassName}>
      {items.map((item) => (
        <Tab
          title={item.title}
          key={item.key}
          eventKey={item.key}
          tabClassName={item.tabClassName}
        >
          {item.content}
        </Tab>
      ))}
    </Tabs>
  )
}
