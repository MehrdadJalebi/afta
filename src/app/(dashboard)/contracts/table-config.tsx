import { createColumnHelper } from "@tanstack/table-core"
import { getTableStateConfig } from "@/components/ListingTable"
import { YDropdown, YTypography } from "@/components/UI"
import { SelectCallback } from "@restart/ui/types"
import { TableDateTime } from "@/components/Utils"
import { ActionMenuToggle } from "@/components/UI/YDropdown/custom-toggles"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { getFixedNumber, numberwithCommas } from "@/utils"
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
  columnHelper.display({
    id: "type",
    cell: () => <i className={"icon-message"} />,
  }),
  columnHelper.accessor("sent", {
    id: "sent",
    header: "کل ارسال",
    cell: ({ row, getValue }) =>
      row.original.status === "DRAFT" ? "-" : numberwithCommas(getValue() || 0),
  }),
  columnHelper.accessor("delivered", {
    id: "delivered",
    header: "تحویل شده",
    cell: ({ row, getValue }) =>
      row.original.status === "DRAFT" ? "-" : numberwithCommas(getValue() || 0),
  }),
  columnHelper.accessor("clicker", {
    id: "clicker",
    header: "کلیکر‌ها",
    cell: ({ row, getValue }) =>
      row.original.status === "DRAFT" ? "-" : numberwithCommas(getValue() || 0),
  }),
  columnHelper.display({
    id: "ctr",
    header: "CTR",
    cell: ({ row }) => {
      if (row.original.status === "DRAFT") {
        return "-"
      }
      if (!row.original.delivered || !row.original.clicker) {
        return 0
      }
      const ctrPercentValue =
        (row.original.clicker / row.original.delivered) * 100
      return `${getFixedNumber(ctrPercentValue, 2)} %`
    },
  }),
]

export const filtersConfig = getTableStateConfig({
  searchParams: { placeholder: "نام کاربر" },
  paginationParams: { defaultPageNumber: 1, defaultPageSize: 10 },
  filters: {
    date: {
      query: ["send_datetime_after", "send_datetime_before"],
      type: "range",
      title: "تاریخ کاربر",
    },
  },
})
