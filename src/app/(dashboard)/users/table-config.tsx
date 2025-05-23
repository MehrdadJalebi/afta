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
  onActivationClick: (row: any) => void
  onSetAdminClick: (row: any) => void
  onActivityClick: (row: any) => void
  isActiving: boolean
  isInActiving: boolean
  isSettingAdmin: boolean
  isRemovingAdmin: boolean
}

const dropdownItems = {
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
  columnHelper.accessor("isActive", {
    id: "isActive",
    header: "وضعیت",
    cell: ({ row, table }) => {
      const { onActivationClick, isActiving, isInActiving } = table.options
        .meta as TableMetaData
      const userActivationHandler = () => {
        onActivationClick(row.original)
      }
      return (
        <Form>
          <Form.Switch
            role="button"
            disabled={isActiving || isInActiving}
            checked={row.original.isActive}
            onClick={userActivationHandler}
          />
        </Form>
      )
    },
  }),
  columnHelper.accessor("role", {
    id: "isAdmin",
    header: "دسترسی ادمین",
    cell: ({ row, table }) => {
      const { onSetAdminClick, isSettingAdmin, isRemovingAdmin } = table.options
        .meta as TableMetaData
      const userRoleHandler = () => {
        onSetAdminClick(row.original)
      }
      return (
        <Form>
          <Form.Switch
            role="button"
            disabled={isRemovingAdmin || isSettingAdmin}
            checked={row.original.role === "Admin"}
            onClick={userRoleHandler}
          />
        </Form>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "عملیات",
    cell: ({ row, table }) => {
      const { onActivityClick } = table.options.meta as TableMetaData

      let eventKeys: (keyof typeof dropdownItems)[] = (() => {
        return ["activity"]
      })()

      const selectHandler: SelectCallback = (eventKey) => {
        if (eventKey === "activity") {
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
  searchParams: { placeholder: "نام کاربر" },
  paginationParams: { defaultPageNumber: 1, defaultPageSize: 10 },
})
