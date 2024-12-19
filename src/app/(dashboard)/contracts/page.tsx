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

export default function CampaignPage() {
  const tableStateManager = useTableState(filtersConfig)
  const { data: userProfileData } = useProfileQuery()
  const {
    data: users,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery(
    queryService("afta", "/api/afta/v1/Activity/contracts/{id}", {
      params: {
        path: { id: userProfileData?.data?.id.toString() },
        ...getTableQueryParams(tableStateManager),
      },
    }),
  )

  const router = useRouter()

  return (
    <>
      <YTypography variant={"headline1-bold"} className={"mb-4"}>
        لیست قراردادها
      </YTypography>
      <ListingTable
        columns={columns}
        //count={users?.count}
        //data={users?.results}
        onRefetch={refetch}
        stateManager={tableStateManager}
        isLoading={isLoading}
        hasError={isError}
        noDataProps={{
          title: "هنوز قراردادی ثبت نکرده‌اید!",
          imageSource: "/no-data-general.png",
        }}
        isFetching={isFetching}
      />
    </>
  )
}
