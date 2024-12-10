"use client"

import { YBox, YTypography } from "@/components/UI"
import { TemplateForm, TemplateFormProps, SchemaType } from "../form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { useRouter, useParams } from "next/navigation"
import { Spinner } from "react-bootstrap"
import { toastSuccess, toastError } from "src/utils"
import { useState } from "react"
import { TemplateStatus } from "@/enums"
import { ConfirmModal } from "@/components/Modals"

export default function UpdateTemplatePage() {
  const [submittingData, setSubmittingData] = useState<SchemaType>()
  const [isShowingWarningModal, setIsShowingWarningModal] = useState(false)
  const { isPending, mutateAsync } = useMutation(
    mutateService("iris", "patch", "/v1/sms-management/templates/{id}/"),
  )
  const router = useRouter()
  const { id } = useParams<{ id: string }>() // TODO we need a hook to redirect user if wrong id was entered and we got 404 error
  const { isLoading, data: queryData } = useQuery(
    queryService("iris", "/v1/sms-management/templates/{id}/", {
      params: { path: { id } },
    }),
  )

  const submitHandler = (data: SchemaType) => {
    if (queryData?.status === TemplateStatus.APPROVED) {
      setIsShowingWarningModal(true)
      setSubmittingData(data)
    } else {
      onSubmit(data)
    }
  }

  const modalHideHandler = () => {
    setIsShowingWarningModal(false)
    setSubmittingData(undefined)
  }

  const onSubmit: TemplateFormProps["onSubmit"] = async (data) => {
    try {
      await mutateAsync({
        body: data,
        params: { path: { id } },
      })
      toastSuccess("قالب مورد نظر با موفقیت ویرایش گردید.")
      router.push("/settings/developers/?active=templates")
    } catch (e) {
      toastError("خطا در ویرایش قالب.")
      console.log(e)
    }
  }

  return (
    <>
      <YTypography variant="headline2-bold" className={"mb-4"}>
        مشاهده و ویرایش قالب {queryData?.name}
      </YTypography>
      <YBox
        body={
          isLoading ? (
            <Spinner variant={"primary"} />
          ) : (
            <TemplateForm
              isSubmitting={isPending}
              onSubmit={submitHandler}
              initialValues={queryData}
              isUpdate
            />
          )
        }
      />
      <ConfirmModal
        actionVariant={"primary"}
        actionText={"ویرایش"}
        onActionClick={() => onSubmit(submittingData!)}
        title={"ویرایش قالب"}
        body={
          <YTypography>
            نجوایی عزیز
            <br />
            در صورت ویرایش، قالب شما مجدداً نیازمند تأیید کارشناسان نجوا خواهد
            بود. آیا مایل به ویرایش قالب هستید؟
          </YTypography>
        }
        showModal={isShowingWarningModal}
        onHide={modalHideHandler}
        isLoading={isPending}
      />
    </>
  )
}
