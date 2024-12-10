import { DateRange } from "@/types/common"
import { ReactNode } from "react"

export type LogItem = {
  label: string
  color: string
  values: number[]
  right?: boolean
}

export interface LogChartProps {
  items: Record<string, LogItem>
  timestamps: string[]
  dateRangeValue?: DateRange
  onDateChange?: (dateRangeValue: DateRange) => void
  biaxial?: boolean
  title?: ReactNode
}
