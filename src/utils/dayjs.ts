import dayjs from "dayjs"
import "dayjs/locale/fa"
import utc from "dayjs/plugin/utc"
import jalaliday from "jalaliday"
import { ChartInterval } from "@/enums/report"

dayjs.extend(utc)
dayjs.extend(jalaliday)

export default dayjs

export function jalali(date: string, format: string = "YYYY MM DD") {
  return dayjs(date).calendar("jalali").locale("fa").format(format)
}

export function formatChartDates(dates: string[], interval: ChartInterval) {
  const format = interval === ChartInterval.HOURLY ? "HH:mm" : "YYYY/MM/DD"
  return dates.map((date) => jalali(date, format))
}
