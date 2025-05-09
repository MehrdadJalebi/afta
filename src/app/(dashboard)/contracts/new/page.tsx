"use client"

import { YBox, YTypography } from "@/components/UI"
import { ContractForm, ContractFormProps } from "../form"
import { useMutation } from "@tanstack/react-query"
import { mutateService } from "@/api"
import { useRouter } from "next/navigation"
import { toastSuccess, toastError } from "src/utils"

export default function CreateContractPage() {
  const { isPending, mutateAsync } = useMutation(
    mutateService("emzano", "post", "/api/emzano/v1/Contracts"),
  )
  const router = useRouter()

  const onSubmit: ContractFormProps["onSubmit"] = async (data) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        ...(data.nationalCodes?.length && {
          nationalCodes: data.nationalCodes.map((user) => user.nationalCode),
        }),
      }
      // @ts-ignore
      await mutateAsync({ body: payload })
        .then(() => {
          toastSuccess("قرارداد مورد نظر با موفقیت ایجاد شد.")
          router.push("/contracts")
        })
        .catch(({ message: { error } }) => {
          const errorMessage = error.message
          if (errorMessage) {
            toastError(errorMessage)
          } else {
            toastError("خطا در ایجاد قرارداد.")
          }
        })
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
