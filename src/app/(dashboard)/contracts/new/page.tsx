"use client"

import { YBox, YTypography } from "@/components/UI"
import { ContractForm, ContractFormProps } from "../form"
import { useMutation } from "@tanstack/react-query"
import { mutateService } from "@/api"
import { useRouter } from "next/navigation"
import { toastSuccess, toastError } from "src/utils"

export default function CreateContractPage() {
  const { isPending, mutateAsync } = useMutation(
    mutateService("afta", "post", "/api/afta/v1/Contracts"),
  )
  const router = useRouter()

  const onSubmit: ContractFormProps["onSubmit"] = async (data) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        ...(data.userIds?.length && {
          userIds: data.userIds.map((user) => user.nationalCode),
        }),
      }
      await mutateAsync({ body: payload })
      toastSuccess("قرارداد مورد نظر با موفقیت ایجاد شد.")
      router.push("/contracts")
    } catch (e) {
      toastError("خطا در ایجاد قرارداد.")
      console.log(e)
    }
  }

  return (
    <>
      <YBox
        title={
          <YTypography variant="headline2-bold" className={"mb-4"}>
            ایجاد قرارداد جدید
          </YTypography>
        }
        body={<ContractForm isSubmitting={isPending} onSubmit={onSubmit} />}
      />
    </>
  )
}
