import { css } from "@emotion/react"
import { type Header, type Table, flexRender } from "@tanstack/react-table"
import clsx from "clsx"
import { useMemo } from "react"
import { Alert, Spinner } from "react-bootstrap"

import { themeColors } from "src/styles/bootstrap/variables"

import { YBtn } from "../YBtn"
import "./styles.scss"
import { YTypography } from "@/components/UI"
import { CircleAlert, SortAsc, SortDesc } from "lucide-react"

export interface YTableProps<TData> {
  table: Table<TData>
  hasError?: boolean
  isLoading?: boolean
  isFetching?: boolean
  onRefetch?: Function
}

export function YTable<TData>({
  table,
  hasError,
  isLoading,
  isFetching,
  onRefetch,
}: YTableProps<TData>) {
  const isDataReady = useMemo(
    () => !isLoading && !hasError,
    [isLoading, hasError],
  )
  const hasData = table.getRowModel().rows.length > 0

  const renderSortIcon = (header: Header<TData, unknown>) => {
    if (!header.column.getCanSort()) return null

    const sortStatus = header.column.getIsSorted()
    switch (sortStatus) {
      case "desc":
        return <SortDesc />
      case "asc":
        return <SortAsc />
      default:
        return <SortDesc />
    }
  }

  return (
    <div className={"table-responsive"}>
      <table className={clsx("y-table", { "opacity-50": isFetching })}>
        {hasData && (
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={clsx("select-none text-nowrap", {
                        "cursor-pointer": header.column.getCanSort(),
                      })}
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <YTypography variant={"body-bold"}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </YTypography>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
        )}

        {isDataReady && (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="align-middle text-nowrap" key={cell.id}>
                    <YTypography tag={"div"}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </YTypography>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {isLoading && (
        <div className="h-100 w-100 my-3 d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      )}

      {hasError && (
        <div className="h-100 w-100 my-3 d-flex align-items-center justify-content-center">
          <Alert css={errorAlertContainer} variant="danger">
            <span>
              <CircleAlert />
              دریافت اطلاعات با خطا مواجه شد!
            </span>
            <YBtn size="sm" variant="danger" onClick={() => onRefetch?.()}>
              دوباره تلاش کنید
            </YBtn>
          </Alert>
        </div>
      )}
    </div>
  )
}

const errorAlertContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.875rem;
  border: none;
  background-color: ${themeColors.red_200};
`
/*
  <span className="text-dark ms-1">
    {renderSortIcon(header)}
  </span>
 */
