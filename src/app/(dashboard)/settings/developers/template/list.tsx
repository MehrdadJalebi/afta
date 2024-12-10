"use client"

import { YBtn } from "@/components/UI"
import {
  columns,
  TableMetaData,
  filtersConfig,
} from "@/app/(dashboard)/settings/developers/template/table-config"
import {
  ListingTable,
  useTableState,
  getTableQueryParams,
} from "@/components/ListingTable"
import { useState } from "react"
import { ConfirmModal } from "@/components/Modals"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { useRouter } from "next/navigation"
import { toastSuccess, toastError } from "src/utils"

export default function TemplatesList() {
  const tableStateManager = useTableState(filtersConfig)
  const [showDeleteTemplateModal, setShowDeleteTemplateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState<IrisSchema<"SMSTemplate">>()
  const { data, isLoading, isFetching, refetch, isError } = useQuery(
    queryService("iris", "/v1/sms-management/templates/", {
      params: { query: getTableQueryParams(tableStateManager) as any },
    }),
  )
  const { isPending, mutateAsync } = useMutation(
    mutateService("iris", "delete", "/v1/sms-management/templates/{id}/"),
  )
  const router = useRouter()

  const deleteActionHandler = (row: IrisSchema<"SMSTemplate">) => {
    setSelectedRow(row)
    setShowDeleteTemplateModal(true)
  }

  const editActionHandler = (row: IrisSchema<"SMSTemplate">) => {
    router.push(`/settings/developers/template/${row.id}`)
  }

  const deleteTemplate = async () => {
    try {
      await mutateAsync({
        params: { path: { id: selectedRow!.id.toString() } },
      })
      toastSuccess("قالب مورد نظر با موفقیت حذف شد.")
      refetch()
      setShowDeleteTemplateModal(false)
    } catch (e) {
      toastError("خطا در حذف قالب.")
      console.log(e)
    }
  }

  const createTemplateBtn = (
    <YBtn
      variant={"primary"}
      icon={{ placement: "right", icon: "icon-add" }}
      className="mt-4"
      href={"/settings/developers/template/new"}
    >
      ایجاد قالب جدید
    </YBtn>
  )

  return (
    <>
      <ListingTable
        columns={columns}
        count={data?.count}
        data={data?.results}
        isLoading={isLoading}
        stateManager={tableStateManager}
        isFetching={isFetching}
        className="border-none"
        noDataProps={{
          title: "موردی برای نمایش وجود ندارد!",
          imageSource: "/no-data-general.png",
          slot: createTemplateBtn,
          className: "border-none",
        }}
        hasError={isError}
        onRefetch={refetch}
        title="‌"
        meta={
          {
            onDeleteClick: deleteActionHandler,
            onEditClick: editActionHandler,
          } as TableMetaData
        }
        slot={
          <YBtn
            icon={{ icon: "icon-add", placement: "right" }}
            href="/settings/developers/template/new"
          >
            قالب پیامک جدید
          </YBtn>
        }
      />
      <ConfirmModal
        actionVariant={"danger"}
        actionText={"حذف"}
        onActionClick={deleteTemplate}
        isLoading={isPending}
        title={`حذف قالب ${selectedRow?.name}`}
        body={"آیا از حذف قالب مورد نظر اطمینان دارید؟"}
        showModal={showDeleteTemplateModal}
        onHide={() => setShowDeleteTemplateModal(false)}
      />
    </>
  )
}
