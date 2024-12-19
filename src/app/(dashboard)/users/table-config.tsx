import { createColumnHelper } from "@tanstack/table-core"
import { getTableStateConfig } from "@/components/ListingTable"
import { YDropdown, YTypography } from "@/components/UI"
import { Form } from "react-bootstrap"
import { SelectCallback } from "@restart/ui/types"
import { TableDateTime } from "@/components/Utils"
import { ActionMenuToggle } from "@/components/UI/YDropdown/custom-toggles"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { getFixedNumber, numberwithCommas } from "@/utils"
import { queryService } from "@/api"

export interface TableMetaData {
  onEditClick: (row: any) => void
  onDeleteClick: (row: any) => void
  onActivationClick: (row: any) => void
  isActiving: boolean
  isInActiving: boolean
}

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
  columnHelper.accessor("cellphone", {
    id: "cellphone",
    header: "شماره موبایل",
  }),
  columnHelper.display({
    id: "fullName",
    header: "نام و نام خانوادگی",
    cell: ({ row }) =>
      row.original.firstName && row.original.lastName
        ? `${row.original.firstName} ${row.original.lastName}`
        : "-",
  }),
  columnHelper.accessor("nationalCode", {
    id: "nationalCode",
    header: "شماره شناسنامه",
  }),
  columnHelper.accessor("iActive", {
    id: "iActive",
    header: "وضعیت",
    cell: ({ row, table, getValue }) => {
      const { onActivationClick, isActiving, isInActiving } = table.options
        .meta as TableMetaData
      const contractActivationHandler = () => {
        onActivationClick(row.original)
      }
      return (
        <Form>
          <Form.Switch
            role="button"
            disabled={isActiving || isInActiving}
            checked={getValue()}
            onClick={contractActivationHandler}
          />
        </Form>
      )
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
