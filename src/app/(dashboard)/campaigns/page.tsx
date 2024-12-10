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

export default function CampaignPage() {
  const [selectedRow, setSelectedRow] =
    useState<IrisSchema<"ReadCampaignExecution">>()
  const [activeModal, setActiveModal] = useState<
    "delete" | "cancel" | "continue-sending"
  >()

  const tableStateManager = useTableState(filtersConfig)

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    queryService("iris", "/v1/campaign-management/campaign-executions/", {
      params: { query: getTableQueryParams(tableStateManager) },
    }),
  )

  const router = useRouter()


  return (
    <>
      <YTypography variant={"headline2-bold"} className={"mb-4"}>
        کمپین‌ها
      </YTypography>
      <ListingTable
        columns={columns}
        count={data?.count}
        data={data?.results}
        onRefetch={refetch}
        stateManager={tableStateManager}
        isLoading={isLoading}
        hasError={isError}
        noDataProps={{
          title: "هنوز کمپینی نساخته‌اید!",
          description: "برای شروع لازم است یک کمپین بسازید.",
          imageSource: "/no-data-create-campaign.png",
        }}
        isFetching={isFetching}
        slot={
          <div className={"d-flex"}>
          
          </div>
        }
      />
    </>
  )
}
