import { createColumnHelper } from "@tanstack/table-core"
import { getTableStateConfig } from "@/components/ListingTable"
import { YTypography } from "@/components/UI"
import { truncatedElement } from "@/utils"

const columnHelper = createColumnHelper<any>()
export const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor("functionName", {
    id: "functionName",
    header: "Function Name",
  }),
  columnHelper.accessor("ipAddress", {
    id: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => {
      return (
        <div className="text-end">
          <YTypography dir="ltr">{row.original.ipAddress}</YTypography>
        </div>
      )
    },
  }),
  columnHelper.accessor("level", {
    id: "level",
    header: "Level",
  }),
  columnHelper.accessor("userAgent", {
    id: "userAgent",
    header: "User Agent",
    cell: ({ getValue }) => truncatedElement(getValue()),
  }),
  columnHelper.accessor("createdOn", {
    id: "createdOn",
    header: "Created On",
  }),
]

export const filtersConfig = getTableStateConfig({
  searchParams: { placeholder: "Level, IP Address" },
  paginationParams: { defaultPageNumber: 1, defaultPageSize: 10 },
  filters: {
    functionName: {
      query: "functionName",
      type: "select",
      title: "Function Name",
    },
  },
})
