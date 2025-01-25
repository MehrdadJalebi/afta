"use client"

import { YBtn, YTypography } from "@/components/UI"
import { Plus } from "lucide-react"

import { columns, filtersConfig, TableMeta } from "./table-config"
import {
  getTableQueryParams,
  ListingTable,
  useTableState,
} from "@/components/ListingTable"
import {
  SignContractModal,
  DeleteContractModal,
  ShowContractModal,
} from "./(action-modals)"
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
        query: getTableQueryParams(tableStateManager),
      },
    }),
  )
  const router = useRouter()

  const [selectedRow, setSelectedRow] = useState<any>()
  const [activeModal, setActiveModal] = useState<"delete" | "sign" | "show">()
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

  const showActionHandler = (row: any) => {
    setSelectedRow(row)
    setActiveModal("show")
  }

  const showActivityHandler = (row: any) => {
    router.push(`/contracts/activity/${row.id}`)
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
  const handleSign = async () => {
    try {
      await signContractMutation.mutateAsync({
        params: { path: { id: selectedRow!.id.toString() } },
      })
      toastSuccess("قرارداد انتخابی با موفقیت امضا گردید.")
      refetch()
      hideModal()
    } catch (e) {
      toastError("خطا در امضا قرارداد.")
      console.error(e)
    }
  }
  const hideModal = () => {
    setSelectedRow(undefined)
    setActiveModal(undefined)
  }
  const createContractBtn = (
    <YBtn variant={"primary"} href={"/contracts/new"}>
      <Plus color="white" size={20} className="ms-1" />
      ایجاد قرارداد جدید
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
        count={contracts?.data?.totalCount}
        data={contracts?.data?.items}
        onRefetch={refetch}
        stateManager={tableStateManager}
        meta={
          {
            onSignClick: signActionHandler,
            onDeleteClick: deleteActionHandler,
            onShowClick: showActionHandler,
            onActivityClick: showActivityHandler,
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
        slot={createContractBtn}
      />
      <DeleteContractModal
        isSubmitting={deleteContractMutation.isPending}
        onSubmit={handleDelete}
        isShowing={activeModal === "delete"}
        onHide={hideModal}
        selectedRow={selectedRow}
      />
      <SignContractModal
        isSubmitting={signContractMutation.isPending}
        onSubmit={handleSign}
        isShowing={activeModal === "sign"}
        onHide={hideModal}
        selectedRow={selectedRow}
      />
      <ShowContractModal
        isSubmitting={signContractMutation.isPending}
        onSubmit={hideModal}
        isShowing={activeModal === "show"}
        onHide={hideModal}
        selectedRow={selectedRow}
      />
    </>
  )
}
