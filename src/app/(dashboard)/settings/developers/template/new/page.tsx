"use client"

import { YBox, YTypography } from "@/components/UI"
import { TemplateForm, TemplateFormProps } from "../form"
import { useMutation } from "@tanstack/react-query"
import { mutateService } from "@/api"
import { useRouter } from "next/navigation"
import { toastSuccess, toastError } from "src/utils"

export default function CreateTemplatePage() {
  const { isPending, mutateAsync } = useMutation(
    mutateService("iris", "post", "/v1/sms-management/templates/"),
  )
  const router = useRouter()

  const onSubmit: TemplateFormProps["onSubmit"] = async (data) => {
    try {
      await mutateAsync({
        body: data,
      })
      toastSuccess("قالب پیامک با موفقیت ایجاد شد.")
      router.push("/settings/developers/?active=templates")
    } catch (e) {
      toastError("خطا در ایجاد قالب پیامک.")
      console.log(e)
    }
  }

  return (
    <>
      <YTypography variant="headline2-bold" className={"mb-4"}>
        ایجاد قالب جدید
      </YTypography>
      <YBox
        body={<TemplateForm isSubmitting={isPending} onSubmit={onSubmit} />}
      />
    </>
  )
}
