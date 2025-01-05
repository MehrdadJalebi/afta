"use client"

import { YTypography } from "@/components/UI"
import { columns, filtersConfig } from "./table-config"
import {
  getTableQueryParams,
  ListingTable,
  useTableState,
} from "@/components/ListingTable"

import { useQuery } from "@tanstack/react-query"
import { queryService } from "@/api"
import { useParams } from "next/navigation"

export default function ContractActivityPage() {
  const tableStateManager = useTableState(filtersConfig)
  const params = useParams()
  const { id: activityID } = useParams<{
    id: string
  }>()

  const {
    data: activities,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery(
    queryService("afta", "/api/afta/v1/Activity/contracts/{id}", {
      params: {
        path: { id: parseInt(activityID!) },
        ...getTableQueryParams(tableStateManager),
      },
    }),
  )

  return (
    <>
      <ListingTable
        title={
          <YTypography variant={"headline3-bold"} className={"mb-4"}>
            لیست فعالیت‌های قرارداد {activityID}
          </YTypography>
        }
        columns={columns}
        count={activities?.data?.length}
        data={activities?.data}
        onRefetch={refetch}
        stateManager={tableStateManager}
        isLoading={isLoading}
        hasError={isError}
        noDataProps={{
          title: "هنوز فعالیتی انجام نشده است!",
          imageSource: "/no-data-general.png",
        }}
        isFetching={isFetching}
      />
    </>
  )
}
