import { createColumnHelper } from "@tanstack/table-core"
import { getTableStateConfig } from "@/components/ListingTable"
import { YDropdown, YTypography } from "@/components/UI"
import { SelectCallback } from "@restart/ui/types"
import { TableDateTime } from "@/components/Utils"
import { ActionMenuToggle } from "@/components/UI/YDropdown/custom-toggles"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { getFixedNumber, numberwithCommas, truncatedElement } from "@/utils"
import { queryService } from "@/api"

export interface TableMeta {}

const dropdownItems = {
  edit: { title: "ویرایش" },
}

const getDropdownNodes = (keys: (keyof typeof dropdownItems)[]) => {
  return keys.map((key) => {
    const item = dropdownItems[key]
    return (
      <YTypography
        key={key}
        className={(item as { title: string; className?: string }).className}
      >
        {item.title}
      </YTypography>
    )
  })
}

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
  columnHelper.accessor("description", {
    id: "description",
    header: "متن قرارداد",
    cell: ({ row }) => truncatedElement(row.original.description),
  }),
]

export const filtersConfig = getTableStateConfig({
  searchParams: { placeholder: "نام قرارداد، متن قرارداد" },
  paginationParams: { defaultPageNumber: 1, defaultPageSize: 10 },
})
