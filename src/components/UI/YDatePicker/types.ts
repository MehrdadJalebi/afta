import React from "react"
import { Calendar, DateObject } from "react-multi-date-picker"
import { YInputProps } from "@/components/UI"

export type Calendars = "jalali" | "gregorian"
export type DatePickerValue = DateObject | DateObject[] | DateObject[][] | null

export interface YDatePickerProps
  extends Omit<
    React.ComponentProps<typeof Calendar>,
    "value" | "onChange" | "calendar" | "locale"
  > {
  inputProps?: YInputProps
  value: DatePickerValue
  onChange: (value: DatePickerValue) => void
  timePicker?: boolean
}
