"use client"

import { YBox, YTypography, YTabs } from "@/components/UI"
import { useMemo } from "react"
import WebhooksList from "@/app/(dashboard)/settings/developers/webhook/list"
import TemplatesList from "@/app/(dashboard)/settings/developers/template/list"
import { useSearchParams } from "next/navigation"
import Token from "./token"

export default function DevelopersSettingsPage() {
  const tabItems = [
    { key: "webhooks", title: "لیست وب‌هوک‌ها", content: <WebhooksList /> },
    { key: "templates", title: "قالب‌های پیامک", content: <TemplatesList /> },
    { key: "token", title: "توکن", content: <Token /> },
  ]
  const searchParams = useSearchParams()
  const activeKey = useMemo(() => {
    if (searchParams.get("active") === "templates") {
      return "templates"
    } else if (searchParams.get("active") === "token") {
      return "token"
    }
    return "webhooks"
  }, [searchParams.get("active")])
  return (
    <>
      <YTypography variant={"headline2-bold"} className={"mb-4"}>
        توسعه‌دهندگان
      </YTypography>
      <YBox body={<YTabs items={tabItems} defaultActiveKey={activeKey} />} />
    </>
  )
}
