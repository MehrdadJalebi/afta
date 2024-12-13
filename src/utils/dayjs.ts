import dayjs from "dayjs"
import "dayjs/locale/fa"
import utc from "dayjs/plugin/utc"
import jalaliday from "jalaliday"

dayjs.extend(utc)
dayjs.extend(jalaliday)

export default dayjs

export function jalali(date: string, format: string = "YYYY MM DD") {
  return dayjs(date).calendar("jalali").locale("fa").format(format)
}

export function formatChartDates(dates: string[]) {
  const format = "YYYY/MM/DD"
  return dates.map((date) => jalali(date, format))
}
