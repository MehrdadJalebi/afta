import { Summary } from "@/components/ChartSummaries/Summary"
import "./styles.scss"
import clsx from "clsx"

export type SummaryType = {
  label: string
  value: number | string
  percentage?: number
}

export interface ChartSummariesProps {
  summaries: SummaryType[]
  horizontal?: boolean
}

export function ChartSummaries({ summaries, horizontal }: ChartSummariesProps) {
  return (
    <div
      className={clsx("chart-summary h-100", {
        "flex-lg-row flex-column": horizontal,
      })}
    >
      {summaries.map((summary) => (
        <Summary {...summary} key={summary.label} />
      ))}
    </div>
  )
}
