import { YBox, YTypography } from "@/components/UI"
import { LogChartProps } from "@/components/LogChart/types"
import { RenderChart } from "@/components/LogChart/RenderChart"
import "./styles.scss"
import { Legend } from "@/components/LogChart/Legend"
import { RangePickerFilter } from "@/components/Filters"
import { css } from "@emotion/react"
import clsx from "clsx"

export function LogChart({
  dateRangeValue,
  items,
  onDateChange,
  timestamps,
  biaxial,
  title,
}: LogChartProps) {
  const shouldRenderFilter = !!dateRangeValue && !!onDateChange

  return (
    <YBox
      body={
        <div className={"chart-container"}>
          <div
            className={clsx(
              "d-flex w-100 justify-content-between align-items-end",
              {
                "mb-4": shouldRenderFilter || title,
              },
            )}
          >
            {title}
            {shouldRenderFilter && (
              <div className={"range-filter-container"}>
                <RangePickerFilter
                  value={dateRangeValue}
                  onChange={onDateChange}
                  labelTypographyProps={{
                    variant: "detail-regular",
                    color: "gray_700",
                  }}
                  title={"از تاریخ - تا تاریخ"}
                />
              </div>
            )}
          </div>
          <RenderChart
            timestamps={timestamps}
            items={items}
            biaxial={biaxial}
          />
        </div>
      }
      footer={<Legend items={items} />}
      footerCss={footerCss}
    />
  )
}

const footerCss = css`
  padding: 0;
`
