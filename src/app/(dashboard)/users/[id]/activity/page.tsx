"use client"

import { YTypography } from "@/components/UI"
import { columns, filtersConfig } from "./table-config"
import {
  getTableQueryParams,
  ListingTable,
  useTableState,
  getTableStateConfig,
} from "@/components/ListingTable"
import { useMemo } from "react"
import { useFunctionQuery } from "@/api/useApi"

import { useQuery } from "@tanstack/react-query"
import { queryService } from "@/api"
import { useParams } from "next/navigation"

export default function ContractActivityPage() {
  const functionsQuery = useFunctionQuery()
  const customizedFiltersConfig = useMemo(
    () =>
      getTableStateConfig({
        ...filtersConfig,
        filters: {
          ...filtersConfig.filters,
          functionName: {
            ...filtersConfig.filters?.functionName!,
            isLoading: functionsQuery.isLoading,
            options: functionsQuery.data?.data?.map((func) => ({
              label: func,
              value: func,
            })),
          },
        },
      }),
    [functionsQuery.isLoading, functionsQuery.data],
  )
  const tableStateManager = useTableState(customizedFiltersConfig)
  const params = useParams()
  const { id: userID } = useParams<{
    id: string
  }>()

  const {
    data: activities,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery(
    queryService("afta", "/api/afta/v1/Activity/users/{id}", {
      params: {
        path: { id: parseInt(userID!) },
        query: getTableQueryParams(tableStateManager),
      },
    }),
  )

  return (
    <>
      <ListingTable
        title={
          <YTypography variant={"headline3-bold"} className={"mb-4"}>
            {`لیست فعالیت‌های کاربر`}
          </YTypography>
        }
        columns={columns}
        count={activities?.data?.totalCount}
        data={activities?.data?.items}
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
