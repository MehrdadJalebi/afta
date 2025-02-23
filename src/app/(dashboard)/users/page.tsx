"use client"

import { YBtn, YTypography } from "@/components/UI"
import { columns, filtersConfig, TableMetaData } from "./table-config"
import {
  getTableQueryParams,
  ListingTable,
  useTableState,
} from "@/components/ListingTable"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { useRouter } from "next/navigation"
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
    queryService("emzano", "/api/emzano/v1/Accounts", {
      params: {
        query: getTableQueryParams(tableStateManager),
      },
    }),
  )
  const router = useRouter()

  const { isPending: isActiving, mutateAsync: activeMutate } = useMutation(
    mutateService("emzano", "patch", "/api/emzano/v1/Accounts/active/{id}"),
  )
  const { isPending: isInActiving, mutateAsync: inactiveMutate } = useMutation(
    mutateService("emzano", "patch", "/api/emzano/v1/Accounts/inactive/{id}"),
  )

  const { isPending: isSettingAdmin, mutateAsync: setAdminMutate } =
    useMutation(
      mutateService("emzano", "post", "/api/emzano/v1/Accounts/set-admin/{id}"),
    )
  const { isPending: isRemovingAdmin, mutateAsync: removeAdminMutate } =
    useMutation(
      mutateService(
        "emzano",
        "post",
        "/api/emzano/v1/Accounts/remove-admin/{id}",
      ),
    )

  const activationHandler = (row: any) => {
    toggleActivateUser(row)
  }

  const userRoleHandler = (row: any) => {
    toggleUserRole(row)
  }

  const activityHandler = (row: any) => {
    router.push(`/users/${row.id}/activity/`)
  }

  const toggleActivateUser = async (row: any) => {
    const activationTypeMessage = row.isActive ? "غیرفعال" : "فعال"
    const params = { path: { id: row.id.toString() } }
    try {
      if (row.isActive) {
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

  const toggleUserRole = async (row: any) => {
    const adminRoleMessage = row.role === "Admin" ? "غیرفعال" : "فعال"
    const params = { path: { id: row.id.toString() } }
    try {
      if (row.role === "Admin") {
        await removeAdminMutate({ params })
      } else {
        await setAdminMutate({ params })
      }
      toastSuccess(
        `دسترسی ادمین کاربر مورد نظر با موفقیت ${adminRoleMessage} شد.`,
      )
      refetch()
    } catch (e) {
      toastError(`خطا در ${adminRoleMessage} شدن دسترسی ادمین کاربر.`)
      console.log(e)
    }
  }

  return (
    <>
      <ListingTable
        title={
          <YTypography variant="headline2-bold" className={"mb-4"}>
            لیست کاربران
          </YTypography>
        }
        columns={columns}
        // @ts-ignore
        count={users?.data.totalCount}
        // @ts-ignore
        data={users?.data?.items}
        onRefetch={refetch}
        stateManager={tableStateManager}
        isLoading={isLoading}
        meta={
          {
            onActivationClick: activationHandler,
            onActivityClick: activityHandler,
            onSetAdminClick: userRoleHandler,
            isActiving,
            isInActiving,
            isSettingAdmin,
            isRemovingAdmin,
          } as TableMetaData
        }
        hasError={isError}
        noDataProps={{
          title: "هنوز کاربری ندارید!",
          imageSource: "/no-data-general.png",
        }}
        isFetching={isFetching}
      />
    </>
  )
}
