import { createColumnHelper } from "@tanstack/table-core"
import { getTableStateConfig } from "@/components/ListingTable"
import { TableDateTime } from "@/components/Utils"
import { truncatedElement } from "@/utils"

const columnHelper = createColumnHelper<any>()
export const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor("level", {
    id: "level",
    header: "Level",
  }),
  columnHelper.accessor("message", {
    id: "message",
    header: "Message",
    cell: ({ getValue }) => truncatedElement(getValue()),
  }),
  columnHelper.accessor("timestamp", {
    id: "timestamp",
    header: "Date Time",
    cell: ({ getValue }) => <TableDateTime value={getValue()} />,
  }),
]

export const filtersConfig = getTableStateConfig({
  searchParams: { placeholder: "Message, Level" },
  paginationParams: { defaultPageNumber: 1, defaultPageSize: 10 },
})
