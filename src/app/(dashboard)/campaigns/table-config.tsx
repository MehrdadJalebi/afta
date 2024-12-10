import { createColumnHelper } from "@tanstack/table-core"
import { getTableStateConfig } from "@/components/ListingTable"
import {
  CampaignStatus,
  campaignStatusOptions,
  campaignStatusTranslation,
} from "@/enums"
import { YDropdown, YTypography } from "@/components/UI"
import { SelectCallback } from "@restart/ui/types"
import { TableDateTime } from "@/components/Utils"
import { ActionMenuToggle } from "@/components/UI/YDropdown/custom-toggles"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import {
  getFixedNumber,
  numberwithCommas,
  replaceLinksWithMockShortener,
} from "@/utils"
import { queryService } from "@/api"
import { useSendersQuery } from "@/api/useApi"

export interface TableMeta {
  
}

const dropdownItems = {
  copy: { title: "کپی کمپین" },
  edit: { title: "ویرایش" },
  delete: { title: "حذف دائمی", className: "text-danger" },
  cancel: { title: "لغو ارسال", className: "text-danger" },
  details: { title: "جزئیات کمپین" },
  sentslogs: { title: "مشاهده لاگ ارسال‌ها" },
  clickslogs: { title: "مشاهده لاگ کلیک‌ها" },
  continueSending: { title: "از سرگیری ارسال" },
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

const columnHelper = createColumnHelper<IrisSchema<"ReadCampaignExecution">>()
export const columns = [
  columnHelper.display({
    id: "type",
    cell: () => <i className={"icon-message"} />,
  }),
  columnHelper.accessor("campaign.name", {
    id: "name",
    header: "نام کمپین",
    cell: function Cell({ row, getValue }) {
      const messageText = replaceLinksWithMockShortener(
        row.original.campaign.template_body,
        row.original.campaign.links?.map((link) => link.actual_url) || [],
      )

      const { data: senders } = useSendersQuery({
        staleTime: 5 * 60 * 1000,
      })

      const getSenderNumber = (senderId: number) => {
        return senders?.results?.find((sender) => sender.line.id === senderId)
          ?.line
      }

      const renderTooltip = (props: any) => (
        <Tooltip {...props}>
          <YTypography
            variant={"caption-medium"}
            color="gray_100"
            className="text-justify"
          >
            شناسه:&nbsp;{row.original.campaign.id}
            <br />
            <br />
            ارسال‌کننده:&nbsp;
            {getSenderNumber(row.original.campaign.sender_id)?.number}
            <br />
            <br />
            متن پیامک:
            <br />
            {messageText}
          </YTypography>
        </Tooltip>
      )
      return (
        getValue() && (
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <span>{getValue()}</span>
          </OverlayTrigger>
        )
      )
    },
  }),
  columnHelper.accessor("send_datetime", {
    id: "send_datetime",
    header: "تاریخ و ساعت",
    cell: ({ getValue, row }) => {
      const value = getValue()
      return value && row.original.status !== CampaignStatus.DRAFT ? (
        <TableDateTime value={value} />
      ) : (
        <span className="me-5">-</span>
      )
    },
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "وضعیت",
    cell: ({ getValue }) =>
      campaignStatusTranslation(getValue() as CampaignStatus),
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
  searchParams: { placeholder: "نام کمپین، متن پیامک" },
  paginationParams: { defaultPageNumber: 1, defaultPageSize: 10 },
  filters: {
    checklist: {
      query: "status",
      title: "وضعیت",
      type: "checklist",
      items: campaignStatusOptions,
    },
    listSegments: {
      query: "inclusion_segments",
      title: "لیست و سگمنت",
      type: "async-select",
      queryOptions: queryService("segment", "/v1/contacts/sms/base/"),
      optionsGenerator: (data: SegmentSchema<"PaginatedBaseSegmentList">) =>
        data.results?.map((item) => ({
          label: item.name,
          value: item.id,
        })) || [],
      isMulti: true,
    },
    date: {
      query: ["send_datetime_after", "send_datetime_before"],
      type: "range",
      title: "تاریخ ارسال کمپین",
    },
  },
})
