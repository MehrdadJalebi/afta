"use client"

import { YBtn, YTypography } from "@/components/UI"
import { columns, filtersConfig } from "./table-config"
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

export default function CampaignPage() {
  const tableStateManager = useTableState(filtersConfig)

  const {
    data: users,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery(
    queryService("afta", "/api/afta/v1/Accounts", {
      params: { query: getTableQueryParams(tableStateManager) },
    }),
  )

  const { isPending: isActiving, mutateAsync: activeMutate } = useMutation(
    mutateService("afta", "patch", "/api/afta/v1/Accounts/active/{id}"),
  )
  const { isPending: isInActiving, mutateAsync: inactiveMutate } = useMutation(
    mutateService("afta", "patch", "/api/afta/v1/Accounts/inactive/{id}"),
  )
  const activationHandler = (row: any) => {
    toggleActivateUser(row)
  }

  const toggleActivateUser = async (row: any) => {
    const activationTypeMessage = row.iActive ? "غیرفعال" : "فعال"
    const params = { path: { id: row.id.toString() } }
    try {
      if (row.iActive) {
        await inactiveMutate({ params })
      } else {
        await activeMutate({ params })
      }
      toastSuccess(`کاربر مورد نظر با موفقیت ${activationTypeMessage} شد.`)
      refetch()
    } catch (e) {
      toastError(`خطا در ${activationTypeMessage} شدن کاربر.`)
      console.log(e)
    }
  }
  const router = useRouter()

  return (
    <>
      <YTypography variant={"headline1-bold"} className={"mb-4"}>
        لیست کاربران
      </YTypography>
      <ListingTable
        columns={columns}
        count={users?.data.length}
        data={users?.data}
        onRefetch={refetch}
        stateManager={tableStateManager}
        isLoading={isLoading}
        meta={
          {
            onActivationClick: activationHandler,
            isActiving,
            isInActiving,
          } as TableMetaData
        }
        hasError={isError}
        noDataProps={{
          title: "هنوز کاربری ندارید!",
          imageSource: "/no-data-general.png",
        }}
        isFetching={isFetching}
        slot={<div className={"d-flex"}></div>}
      />
    </>
  )
}
