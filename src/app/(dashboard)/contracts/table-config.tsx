import { createColumnHelper } from "@tanstack/table-core"
import { getTableStateConfig } from "@/components/ListingTable"
import { YDropdown, YTypography } from "@/components/UI"
import { ContractStatus, contractStatusTranslation } from "@/enums"
import { SelectCallback } from "@restart/ui/types"
import { TableDateTime } from "@/components/Utils"
import { ActionMenuToggle } from "@/components/UI/YDropdown/custom-toggles"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { getFixedNumber, numberwithCommas, truncatedElement } from "@/utils"
import { queryService } from "@/api"

export interface TableMeta {
  onSignClick: (row: any) => void
  onDeleteClick: (row: any) => void
  onShowClick: (row: any) => void
  onActivityClick: (row: any) => void
  isAdmin: boolean
}
const dropdownItems = {
  sign: { title: "امضای قرارداد" },
  delete: { title: "حذف قرارداد", className: "text-danger" },
  show: { title: "نمایش قرارداد" },
  activity: { title: "فعالیت‌ها" },
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
  columnHelper.accessor("sign", {
    id: "userSignStatus",
    header: "وضعیت امضا",
    cell: ({ row }) =>
      //@ts-ignore
      contractStatusTranslation(row.original?.sign?.singed ? "Sign" : "Draft"),
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "وضعیت قرارداد",
    cell: ({ row }) =>
      contractStatusTranslation(row.original.status as ContractStatus),
  }),
  columnHelper.accessor("draftDateTime", {
    id: "draftDateTime",
    header: "تاریخ پیش‌نویس",
    cell: ({ row }) => <TableDateTime value={row.original.draftDateTime} />,
  }),
  columnHelper.accessor("sign", {
    id: "userSignDateTime",
    header: "تاریخ امضای کاربر",
    cell: ({ row }) => {
      const value = row.original?.sign?.singDate
      return value ? (
        <TableDateTime value={value} />
      ) : (
        <span className="me-5">-</span>
      )
    },
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
  columnHelper.display({
    id: "actions",
    header: "عملیات",
    cell: ({ row, table }) => {
      const {
        onDeleteClick,
        onSignClick,
        onShowClick,
        onActivityClick,
        isAdmin,
      } = table.options.meta as TableMeta

      let eventKeys: (keyof typeof dropdownItems)[] = ["show"]

      if (!isAdmin) {
        if (!row.original?.sign?.singed) eventKeys.push("sign")
      } else {
        if (row.original?.sign?.singed) eventKeys.push("activity")
        else eventKeys.push("sign", "delete", "activity")
      }

      const selectHandler: SelectCallback = (eventKey) => {
        if (eventKey === "delete") {
          onDeleteClick(row.original)
        } else if (eventKey === "sign") {
          onSignClick(row.original)
        } else if (eventKey === "show") {
          onShowClick(row.original)
        } else if (eventKey === "activity") {
          onActivityClick(row.original)
        }
      }

      return (
        <YDropdown
          toggleProps={{ as: ActionMenuToggle }}
          items={getDropdownNodes(eventKeys)}
          eventKeys={eventKeys}
          onSelect={selectHandler}
        />
      )
    },
  }),
]

export const filtersConfig = getTableStateConfig({
  searchParams: { placeholder: "نام قرارداد، متن قرارداد" },
  paginationParams: { defaultPageNumber: 1, defaultPageSize: 10 },
})
