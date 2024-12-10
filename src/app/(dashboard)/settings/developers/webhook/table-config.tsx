import { createColumnHelper } from "@tanstack/table-core"
import { YDropdown, YTypography } from "@/components/UI"
import { Form } from "react-bootstrap"
import { SelectCallback } from "@restart/ui/types"
import { ActionMenuToggle } from "@/components/UI/YDropdown/custom-toggles"

export interface TableMetaData {
  onEditClick: (row: IrisSchema<"WebHook">) => void
  onDeleteClick: (row: IrisSchema<"WebHook">) => void
  onActivationClick: (row: IrisSchema<"WebHook">) => void
  isToggling: boolean
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
const columnHelper = createColumnHelper<IrisSchema<"WebHook">>()
export const columns = [
  columnHelper.accessor("is_enabled", {
    id: "is_active",
    header: "وضعیت",
    cell: ({ row, table, getValue }) => {
      const { onActivationClick, isToggling } = table.options
        .meta as TableMetaData
      const webhookActivationHandler = () => {
        onActivationClick(row.original)
      }
      return (
        <Form>
          <Form.Switch
            role="button"
            disabled={isToggling}
            checked={getValue()}
            onClick={webhookActivationHandler}
          />
        </Form>
      )
    },
  }),
  columnHelper.accessor("name", {
    id: "title",
    header: "عنوان",
  }),
  columnHelper.accessor("url", {
    id: "url",
    header: "آدرس",
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
