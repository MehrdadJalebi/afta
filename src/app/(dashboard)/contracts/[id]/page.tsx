"use client"

import { YBox, YTypography } from "@/components/UI"
import { ContractForm, ContractFormProps } from "../form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { useRouter, useParams } from "next/navigation"
import { Spinner } from "react-bootstrap"
import { toastSuccess, toastError } from "src/utils"
import { ContractType, contractTypeTranslation } from "@/enums/contract"

export default function UpdateContractPage() {
  const { isPending, mutateAsync } = useMutation(
    mutateService("iris", "patch", "/v1/account-management/hooks/{id}/"),
  )
  const router = useRouter()
  const { id } = useParams<{ id: string }>() // TODO we need a hook to redirect user if wrong id was entered and we got 404 error
  const { isFetching, data } = useQuery(
    queryService("iris", "/v1/account-management/hooks/{id}/", {
      params: { path: { id: id } },
    }),
  )

  const onSubmit: ContractFormProps["onSubmit"] = async (data) => {
    try {
      await mutateAsync({
        body: {
          url: data.url,
          name: data.name,
          type: data.type.value as ContractType,
        },
        params: { path: { id: id } },
      }) // TODO handle optimistic updates maybe?
      toastSuccess("وب‌هوک مورد نظر با موفقیت ویرایش گردید.")
      router.push("/settings/developers")
    } catch (e) {
      toastError("خطا در ویرایش وب‌هوک.")
      console.log(e)
    }
  }

  return (
    <>
      <YTypography variant="headline2-bold" className={"mb-4"}>
        مشاهده و ویرایش وب‌هوک {data?.name}
      </YTypography>
      <YBox
        body={
          isFetching ? (
            <Spinner variant={"primary"} />
          ) : (
            <ContractForm
              isSubmitting={isPending}
              onSubmit={onSubmit}
              initialValues={{
                ...data,
                name: data?.name || "",
                type: {
                  value: data?.type as ContractType,
                  label: contractTypeTranslation(data?.type as ContractType),
                },
              }}
              isUpdate
            />
          )
        }
      />
    </>
  )
}
