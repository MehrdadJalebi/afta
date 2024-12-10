import { YBox, YTypography } from "@/components/UI"
import { css } from "@emotion/react"
import { themeColors } from "@/styles/bootstrap/variables"
import { SummaryType } from "./ChartSummaries"
import { numberwithCommas } from "@/utils"

export function Summary({ label, value, percentage }: SummaryType) {
  return (
    <YBox
      css={boxCss}
      bodyCss={boxBodyCss}
      body={
        <div>
          <YTypography color={"gray_700"} className={"text-center mb-2"}>
            {label}
          </YTypography>
          <div
            className={
              "d-flex flex-wrap justify-content-center gap-2 align-items-center"
            }
          >
            <YTypography variant={"body-medium"}>
              {numberwithCommas(value)}
            </YTypography>
            {percentage && (
              <>
                <div css={bullet} />
                <YTypography color={"gray_700"}>{percentage} %</YTypography>
              </>
            )}
          </div>
        </div>
      }
    />
  )
}

const bullet = css`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${themeColors.gray_500};
`
const boxCss = css`
  flex: 1;
`
const boxBodyCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
`
