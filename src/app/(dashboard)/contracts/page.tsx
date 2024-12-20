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
