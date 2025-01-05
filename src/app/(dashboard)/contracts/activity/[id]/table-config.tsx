import { createColumnHelper } from "@tanstack/table-core"
import { getTableStateConfig } from "@/components/ListingTable"
import { YDropdown, YTypography } from "@/components/UI"
import { ContractStatus, contractStatusTranslation } from "@/enums"
import { SelectCallback } from "@restart/ui/types"
import { TableDateTime } from "@/components/Utils"
import { ActionMenuToggle } from "@/components/UI/YDropdown/custom-toggles"

const columnHelper = createColumnHelper<any>()
export const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor("title", {
    id: "title",
    header: "نام قرارداد",
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "وضعیت",
    cell: ({ row }) =>
      contractStatusTranslation(row.original.status as ContractStatus),
  }),
  columnHelper.accessor("draftDateTime", {
    id: "draftDateTime",
    header: "تاریخ پیش‌نویس",
    cell: ({ row }) => <TableDateTime value={row.original.draftDateTime} />,
  }),
  columnHelper.accessor("signDateTime", {
    id: "signDateTime",
    header: "تاریخ امضای قرارداد",
    cell: ({ row }) => {
      const value = row.original.signDateTime
      return value ? (
        <TableDateTime value={value} />
      ) : (
        <span className="me-5">-</span>
      )
    },
  }),
]

export const filtersConfig = getTableStateConfig({
  searchParams: { placeholder: "نام قرارداد، متن قرارداد" },
  paginationParams: { defaultPageNumber: 1, defaultPageSize: 10 },
})
