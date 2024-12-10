import { Calendars } from "@/components/UI/YDatePicker/types"
import { Calendar, Locale } from "react-date-object"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian_fa from "react-date-object/locales/gregorian_fa"
import persian from "react-date-object/calendars/persian"
import gregorian from "react-date-object/calendars/gregorian"

const weekDays = [
  ["شنبه", "ش"],
  ["یکشنبه", "ی"],
  ["دوشنبه", "د"],
  ["سه‌شنبه", "س"],
  ["چهارشنبه", "چ"],
  ["پنجشنبه", "پ"],
  ["جمعه", "ج"],
]

export const localeConfig: Record<Calendars, Locale> = {
  jalali: {
    ...persian_fa,
    weekDays: weekDays,
  },
  gregorian: { ...gregorian_fa, weekDays: weekDays },
}

export const calendarConfig: Record<Calendars, Calendar> = {
  jalali: persian,
  gregorian: gregorian,
}
