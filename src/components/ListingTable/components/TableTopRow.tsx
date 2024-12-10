import { UseTableStateReturnType } from "../useTableState/types"
import { TableSearch } from "./TableSearch"
import { TableFilters } from "./TableFilters"
import React from "react"
import clsx from "clsx"
import { YTypography } from "@/components/UI"

export interface TableTopRowProps {
  stateManager?: UseTableStateReturnType
  title?: string
  slot?: React.ReactNode
}

// Better not set both title and stateManager
export function TableTopRow({ stateManager, title, slot }: TableTopRowProps) {
  const search = stateManager?.state.search
  const filterConfig = stateManager?.config

  const onSearchChange = (searchValue: string) => {
    stateManager!.setSearch(searchValue)
    stateManager!.setPagination((prevPagination) => {
      if (prevPagination) {
        return { ...prevPagination, pageNumber: 1 }
      }
      return prevPagination
    })
  }

  const shouldRenderFilters =
    filterConfig?.searchParams || filterConfig?.filters

  return (
    <div
      className={clsx({
        "mb-4 d-flex justify-content-between": shouldRenderFilters || title,
      })}
    >
      {title && <YTypography variant={"headline3-bold"}>{title}</YTypography>}
      {shouldRenderFilters && (
        <div className={"d-flex"}>
          {filterConfig.searchParams && (
            <TableSearch
              value={search!}
              onChange={onSearchChange}
              placeholder={filterConfig.searchParams.placeholder}
            />
          )}
          {filterConfig.filters && (
            <TableFilters stateManager={stateManager!} />
          )}
        </div>
      )}
      {slot && <div>{slot}</div>}
    </div>
  )
}
