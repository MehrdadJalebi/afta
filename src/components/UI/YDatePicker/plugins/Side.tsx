import { YTypography } from "@/components/UI"
import { DateObject } from "react-multi-date-picker"
import { getDateRange } from "@/utils"

// TODO needs typescript
export function SidePlugin(props: any) {
  const { calendarProps, state, onChange, calendarType } = props

  const isDateRangeSelected = (startDayDiff: number, endDayDiff: number) => {
    const end = new DateObject({
      calendar: calendarProps.calendar,
    }).add(-startDayDiff, "day")
    const start = new DateObject({ date: end }).add(
      startDayDiff - endDayDiff,
      "day",
    )
    const selectedStart = state.selectedDate?.[0]
    const selectedEnd = state.selectedDate?.[1]
    return (
      end.day === selectedEnd?.day &&
      end.monthIndex === selectedEnd.monthIndex &&
      end.year === selectedEnd.year &&
      start.day === selectedStart?.day &&
      start.monthIndex === selectedStart.monthIndex &&
      start.year === selectedStart.year
    )
  }

  const clickHandler = (startDayDiff: number, endDayDiff: number) => () => {
    onChange(getDateRange(startDayDiff, endDayDiff, calendarType, calendarType))
  }

  return (
    <div className={"side-plugin"} dir={"rtl"}>
      <YTypography
        variant={"detail-regular"}
        onClick={clickHandler(0, 0)}
        className={isDateRangeSelected(0, 0) ? "selected" : ""}
      >
        امروز
      </YTypography>
      <YTypography
        variant={"detail-regular"}
        onClick={clickHandler(1, 1)}
        className={isDateRangeSelected(1, 1) ? "selected" : ""}
      >
        دیروز
      </YTypography>
      <YTypography
        variant={"detail-regular"}
        onClick={clickHandler(1, 7)}
        className={isDateRangeSelected(1, 7) ? "selected" : ""}
      >
        ۷ روز گذشته
      </YTypography>
      <YTypography
        variant={"detail-regular"}
        onClick={clickHandler(1, 30)}
        className={isDateRangeSelected(1, 30) ? "selected" : ""}
      >
        ۳۰ روز گذشته
      </YTypography>
    </div>
  )
}
