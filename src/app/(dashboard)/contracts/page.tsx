"use client"

import { YBtn, YTypography } from "@/components/UI"
import { columns, filtersConfig, TableMeta } from "./table-config"
import {
  getTableQueryParams,
  ListingTable,
  useTableState,
} from "@/components/ListingTable"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toastSuccess, toastError } from "src/utils"
import { useProfileQuery } from "@/api/useApi"

export default function ContractPage() {
  const tableStateManager = useTableState(filtersConfig)
  const { data: userProfileData } = useProfileQuery()
  const {
    data: contracts,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery(
    queryService("afta", "/api/afta/v1/Contracts/user/{id}", {
      params: {
        path: { id: userProfileData?.data?.id },
        ...getTableQueryParams(tableStateManager),
      },
    }),
  )
  const [selectedRow, setSelectedRow] = useState<any>()
  const [activeModal, setActiveModal] = useState<"delete" | "sign">()
  const signContractMutation = useMutation(
    mutateService("afta", "patch", "/api/afta/v1/Contracts/sign/{id}"),
  )

  const deleteContractMutation = useMutation(
    mutateService("afta", "delete", "/api/afta/v1/Contracts/{id}"),
  )

  const signActionHandler = (row: any) => {
    setSelectedRow(row)
    setActiveModal("sign")
  }

  const deleteActionHandler = (row: any) => {
    setSelectedRow(row)
    setActiveModal("delete")
  }
  const handleDelete = async () => {
    try {
      await deleteContractMutation.mutateAsync({
        params: { path: { id: selectedRow!.contract.id.toString() } },
      })
      toastSuccess("قرارداد انتخابی با موفقیت حذف گردید.")
      refetch()
      hideModal()
    } catch (e) {
      toastError("خطا در حذف قرارداد.")
      console.error(e)
    }
  }
  const router = useRouter()

  const createContractBtn = (
    <YBtn
      variant={"primary"}
      icon={{ placement: "right", icon: "icon-add" }}
      className="mt-4"
      href={"/contracts/new"}
    >
      ایجاد اولین قرارداد
    </YBtn>
  )

  return (
    <>
      <ListingTable
        title={
          <YTypography variant={"headline2-bold"} className={"mb-4"}>
            لیست قراردادها
          </YTypography>
        }
        columns={columns}
        count={contracts?.data?.length}
        data={contracts?.data}
        onRefetch={refetch}
        stateManager={tableStateManager}
        meta={
          {
            onSignClick: signActionHandler,
            onDeleteClick: deleteActionHandler,
          } as TableMeta
        }
        isLoading={isLoading}
        hasError={isError}
        noDataProps={{
          title: "هنوز قراردادی ثبت نکرده‌اید!",
          imageSource: "/no-data-general.png",
          slot: createContractBtn,
        }}
        isFetching={isFetching}
      />
    </>
  )
}
