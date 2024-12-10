"use client"

import { YBox, YTypography } from "@/components/UI"
import { WebhookForm, WebhookFormProps } from "../form"
import { useMutation } from "@tanstack/react-query"
import { mutateService } from "@/api"
import { useRouter } from "next/navigation"
import { toastSuccess, toastError } from "src/utils"
import { WebhookType } from "@/enums/webhook"

export default function CreateWebhookPage() {
  const { isPending, mutateAsync } = useMutation(
    mutateService("iris", "post", "/v1/account-management/hooks/"),
  )
  const router = useRouter()

  const onSubmit: WebhookFormProps["onSubmit"] = async (data) => {
    try {
      await mutateAsync({
        body: {
          ...data,
          is_enabled: true,
          method: "POST",
          service: "SMS",
          type: data.type.value as WebhookType,
        },
      }) // TODO handle optimistic updates maybe?
      toastSuccess("وب‌هوک مورد نظر با موفقیت ایجاد شد.")
      router.push("/settings/developers")
    } catch (e) {
      toastError("خطا در ایجاد وب‌هوک.")
      console.log(e)
    }
  }

  return (
    <>
      <YTypography variant="headline2-bold" className={"mb-4"}>
        ایجاد وب‌هوک جدید
      </YTypography>
      <YBox
        body={<WebhookForm isSubmitting={isPending} onSubmit={onSubmit} />}
      />
    </>
  )
}
