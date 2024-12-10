import { DateObject } from "react-multi-date-picker"
import {
  calendarConfig,
  localeConfig,
} from "@/components/UI/YDatePicker/config"

export function getDateRange(
  startDay: number,
  endDay: number,
  calendar: keyof typeof calendarConfig = "jalali",
  locale: keyof typeof localeConfig = "jalali",
): [DateObject, DateObject] {
  const end = new DateObject({
    calendar: calendarConfig[calendar],
    locale: localeConfig[locale],
  }).add(-startDay, "day")
  const start = new DateObject({ date: end }).add(startDay - endDay, "day")
  return [start, end]
}

export function toIsoFormat(
  dateObject: DateObject,
  includeTime: boolean,
  removeTimezoneOffset: boolean = false,
  includeZ: boolean = false,
): string {
  const date = new DateObject({ date: dateObject })
  const offset = new Date().getTimezoneOffset()
  if (removeTimezoneOffset) {
    date.add(-offset, "minute")
  }
  let isoString = date.toDate().toISOString().split(".")[0] // To remove milliseconds
  if (includeZ) {
    isoString += "Z"
  }
  if (!includeTime) {
    isoString = isoString.split("T")[0]
  }

  return isoString
}
