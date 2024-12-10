import { createColumnHelper } from "@tanstack/table-core"
import { YDropdown, YTypography } from "@/components/UI"
import { getTableStateConfig } from "@/components/ListingTable"
import { SelectCallback } from "@restart/ui/types"
import { truncatedElement } from "src/utils"
import { TemplateStatus, templateStatusTranslation } from "@/enums"
import { ActionMenuToggle } from "@/components/UI/YDropdown/custom-toggles"

// TODO fix typescript
export interface TableMetaData {
  onDeleteClick: (row: IrisSchema<"SMSTemplate">) => void
  onEditClick: (row: IrisSchema<"SMSTemplate">) => void
}

const dropdownItems = [
  { key: "edit", title: "ویرایش" },
  { key: "delete", title: "حذف دائمی", className: "text-danger" },
]
const dropdownNodes = dropdownItems.map((dropdownItem) => {
  return (
    <YTypography key={dropdownItem.key} className={dropdownItem.className}>
      {dropdownItem.title}
    </YTypography>
  )
})
const columnHelper = createColumnHelper<IrisSchema<"SMSTemplate">>()
export const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "شناسه",
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "نام قالب",
  }),
  columnHelper.accessor("body", {
    id: "body",
    header: "متن قالب",
    cell: ({ getValue }) => truncatedElement(getValue()),
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "وضعیت",
    cell: ({ getValue }) =>
      templateStatusTranslation(getValue() as TemplateStatus),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ table, row }) => {
      const { onDeleteClick, onEditClick } = table.options.meta as TableMetaData

      const selectHandler: SelectCallback = (eventKey) => {
        if (eventKey === "edit") {
          onEditClick(row.original)
        } else if (eventKey === "delete") {
          onDeleteClick(row.original)
        }
      }

      return (
        <YDropdown
          toggleProps={{ as: ActionMenuToggle }}
          items={dropdownNodes}
          onSelect={selectHandler}
          eventKeys={dropdownItems.map((item) => item.key)}
        />
      )
    },
  }),
]
export const filtersConfig = getTableStateConfig({
  paginationParams: { defaultPageNumber: 1, defaultPageSize: 10 },
})
