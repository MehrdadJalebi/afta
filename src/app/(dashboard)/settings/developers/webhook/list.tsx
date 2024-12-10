"use client"

import { YBtn } from "@/components/UI"
import {
  columns,
  TableMetaData,
} from "@/app/(dashboard)/settings/developers/webhook/table-config"
import { ListingTable } from "@/components/ListingTable"
import { useState } from "react"
import { ConfirmModal } from "@/components/Modals"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { useRouter } from "next/navigation"
import { toastSuccess, toastError } from "src/utils"

export default function WebhooksList() {
  const [showDeleteWebhookModal, setShowDeleteWebhookModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState<IrisSchema<"WebHook">>()
  const { data, isLoading, isFetching, refetch, isError } = useQuery(
    queryService("iris", "/v1/account-management/hooks/"),
  )
  const { isPending, mutateAsync } = useMutation(
    mutateService("iris", "delete", "/v1/account-management/hooks/{id}/"),
  )
  const { isPending: isToggling, mutateAsync: toggleMutate } = useMutation(
    mutateService("iris", "patch", "/v1/account-management/hooks/{id}/"),
  )
  const router = useRouter()

  const deleteActionHandler = (row: IrisSchema<"WebHook">) => {
    setSelectedRow(row)
    setShowDeleteWebhookModal(true)
  }

  const editActionHandler = (row: IrisSchema<"WebHook">) => {
    router.push(`/settings/developers/webhook/${row.id}`)
  }

  const activationHandler = (row: IrisSchema<"WebHook">) => {
    toggleActivateWebhook(row)
  }

  const deleteWebhook = async () => {
    try {
      await mutateAsync({
        params: { path: { id: selectedRow!.id.toString() } },
      })
      toastSuccess("وب‌هوک مورد نظر با موفقیت حذف شد.")
      refetch()
      setShowDeleteWebhookModal(false)
    } catch (e) {
      toastError("خط در حذف وب‌هوک.")
      console.log(e)
    }
  }

  const toggleActivateWebhook = async (row: IrisSchema<"WebHook">) => {
    const activationTypeMessage = row.is_enabled ? "غیرفعال" : "فعال"
    try {
      await toggleMutate({
        body: { is_enabled: !row.is_enabled },
        params: { path: { id: row.id.toString() } },
      })
      toastSuccess(`وب‌هوک مورد نظر با موفقیت ${activationTypeMessage} شد.`)
      refetch()
    } catch (e) {
      toastError(`خطا در ${activationTypeMessage} شدن وب‌هوک.`)
      console.log(e)
    }
  }
  const createWebhookBtn = (
    <YBtn
      variant={"primary"}
      icon={{ placement: "right", icon: "icon-add" }}
      className="mt-4"
      href={"/settings/developers/webhook/new"}
    >
      ایجاد وب‌هوک جدید
    </YBtn>
  )

  return (
    <>
      <ListingTable
        columns={columns}
        className={"border-none"}
        data={data?.results}
        isLoading={isLoading}
        isFetching={isFetching}
        noDataProps={{
          title: "هیچ وب‌هوکی ثبت نشده است!",
          imageSource: "/no-data-general.png",
          slot: createWebhookBtn,
          className: "border-none",
        }}
        hasError={isError}
        onRefetch={refetch}
        title="‌"
        meta={
          {
            onEditClick: editActionHandler,
            onDeleteClick: deleteActionHandler,
            onActivationClick: activationHandler,
            isToggling,
          } as TableMetaData
        }
        slot={
          <YBtn
            icon={{ icon: "icon-add", placement: "right" }}
            href="/settings/developers/webhook/new"
          >
            ایجاد وب‌هوک جدید
          </YBtn>
        }
      />
      <ConfirmModal
        actionVariant={"danger"}
        actionText={"حذف"}
        onActionClick={deleteWebhook}
        isLoading={isPending}
        title={`حذف وب‌هوک ${selectedRow?.name}`}
        body={"آیا از حذف وب‌هوک مورد نظر اطمینان دارید؟"}
        showModal={showDeleteWebhookModal}
        onHide={() => setShowDeleteWebhookModal(false)}
      />
    </>
  )
}
