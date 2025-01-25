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

export default function CampaignPage() {
  const tableStateManager = useTableState(filtersConfig)

  const {
    data: logs,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery(
    queryService("afta", "/api/afta/v1/SystemLogs", {
      params: { query: getTableQueryParams(tableStateManager) },
    }),
  )

  return (
    <>
      <ListingTable
        title={
          <YTypography variant={"headline2-bold"} className={"mb-4"}>
            لاگ‌ها
          </YTypography>
        }
        columns={columns}
        // @ts-ignore
        count={logs?.data?.totalcount}
        // @ts-ignore
        data={logs?.data?.logs}
        onRefetch={refetch}
        stateManager={tableStateManager}
        isLoading={isLoading}
        hasError={isError}
        noDataProps={{
          title: "هیچ لاگی ندارید!",
          imageSource: "/no-data-general.png",
        }}
        isFetching={isFetching}
      />
    </>
  )
}
