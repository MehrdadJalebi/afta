import {
  getCoreRowModel,
  TableMeta,
  useReactTable,
} from "@tanstack/react-table"
import { YAlert, YBox, YBtn, YTable } from "@/components/UI"
import { Pagination } from "./components/Pagination"
import { ColumnDef } from "@tanstack/table-core"
import { UseTableStateReturnType } from "./useTableState/types"
import { Col, Row } from "react-bootstrap"
import { NoData, NoDataProps, TableTopRow } from "./components"
import React from "react"

export interface ListingTableProps<TData> {
  data?: TData[]
  count?: number
  stateManager?: UseTableStateReturnType<any>
  title?: string
  columns: ColumnDef<TData, any>[]
  hasError?: boolean
  isLoading?: boolean
  isFetching?: boolean
  onRefetch?: Function
  maxPageSize?: number
  slot?: React.ReactNode
  noDataProps?: NoDataProps
  className?: string
  meta?: TableMeta<TData>
  alertNode?: React.ReactNode
}

export function ListingTable<TData>({
  maxPageSize = 100,
  data,
  columns,
  count,
  title,
  stateManager,
  slot,
  meta,
  className,
  noDataProps,
  alertNode,
  ...props
}: ListingTableProps<TData>) {
  const pagination = stateManager?.state.pagination
  const setPagination = stateManager?.setPagination
  const filterConfig = stateManager?.config

  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    rowCount: count,
    meta,
    state: {
      pagination: filterConfig?.paginationParams
        ? {
            pageIndex: pagination!.pageIndex - 1,
            pageSize: pagination!.pageSize,
          }
        : undefined,
    },
  })

  const removeFiltersHandler = () => {
    stateManager?.resetFilters()
    stateManager?.setSearch("")
  }

  const isNoData =
    !props.isLoading && !props.isFetching && !data?.length && noDataProps
  return isNoData && !stateManager?.hasActiveFilters() ? (
    <NoData {...noDataProps} />
  ) : (
    <YBox
      className={className}
      body={
        <>
          {alertNode && <div className="mb-4">{alertNode}</div>}
          <TableTopRow stateManager={stateManager} title={title} slot={slot} />
          <Row>
            <Col>
              {!isNoData ? (
                <YTable {...props} table={table} />
              ) : (
                <NoData
                  title={"موردی با فیلترهای اعمال شده یافت نشد"}
                  imageSource={"/no-data-general.png"}
                  slot={
                    <YBtn
                      variant={"outline-primary"}
                      onClick={removeFiltersHandler}
                    >
                      حذف فیلترها
                    </YBtn>
                  }
                />
              )}
            </Col>
          </Row>
        </>
      }
      footer={
        filterConfig?.paginationParams &&
        !isNoData && (
          <Pagination
            neighborSize={1}
            currentPage={pagination!.pageIndex}
            pageCount={table.getPageCount()}
            onPageChange={(page) =>
              setPagination!((prevState) =>
                prevState ? { ...prevState, pageIndex: page } : undefined,
              )
            }
          />
        )
      }
    />
  )
}
