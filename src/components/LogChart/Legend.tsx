import { LogItem } from "@/components/LogChart/types"
import { css } from "@emotion/react"
import { YTypography } from "@/components/UI"
import { themeColors } from "@/styles/bootstrap/variables"

export interface LegendProps {
  items: Record<string, LogItem>
}

export function Legend({ items }: LegendProps) {
  return (
    <div className="d-flex gap-5 p-3" css={legendContainer}>
      {Object.keys(items).map((key) => {
        const item = items[key]
        return (
          <div key={key} className={"d-flex"}>
            <div css={square(item.color)} />
            <YTypography variant={"detail-regular"}>{item.label}</YTypography>
          </div>
        )
      })}
    </div>
  )
}

const square = (color: string) => css`
  width: 16px;
  height: 16px;
  border-radius: 5px;
  background-color: ${color};
  margin-left: 8px;
`

const legendContainer = css`
  direction: rtl;
  background-color: ${themeColors.gray_300};
  border-radius: 0 0 11px 11px;
`
