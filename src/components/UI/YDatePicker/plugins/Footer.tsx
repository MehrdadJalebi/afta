import { Calendars } from "../types"
import { YBtn } from "@/components/UI"

export interface FooterPLuginProps {
  onClose: () => void
  onSubmit: () => void
  onChangeCalendar: (calendar: Calendars) => void
  calendar: Calendars
  position: string
}

export function FooterPlugin({
  onClose,
  onChangeCalendar,
  onSubmit,
  calendar,
}: FooterPLuginProps) {
  const isGregorian = calendar === "gregorian"

  const changeCalendarHandler = () => {
    onChangeCalendar(isGregorian ? "jalali" : "gregorian")
  }

  return (
    <div className="d-flex px-3 py-2 justify-content-between" dir={"rtl"}>
      <YBtn
        className={"px-3"}
        variant={"link-primary"}
        onClick={changeCalendarHandler}
      >
        {isGregorian ? "تقویم شمسی" : "تقویم میلادی"}
      </YBtn>
      <div className={"d-flex"}>
        <YBtn variant={"outline-primary ms-3"} onClick={onClose}>
          بستن تقویم
        </YBtn>
        <YBtn onClick={onSubmit}>تایید</YBtn>
      </div>
    </div>
  )
}
