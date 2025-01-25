import React, { useEffect, useMemo, useState } from "react"
import { Calendar } from "react-multi-date-picker"
import "./styles.scss"
import { CalendarCheck, X } from "lucide-react"

import { Calendars, DatePickerValue, YDatePickerProps } from "./types"
import { calendarConfig, localeConfig } from "./config"
import clsx from "clsx"
import { FooterPlugin, HeaderPlugin, SidePlugin } from "./plugins"
import { getRepresentedDates } from "@/components/UI/YDatePicker/utils"
import Modal from "react-bootstrap/Modal"
import { YInput } from "@/components/UI"
import TimePicker from "react-multi-date-picker/plugins/time_picker"

/* TODO needs some fixes and implementations:
    year and month changing plugin and minor improvements and remove timepicker after implementing our own */
export function YDatePicker({
  range = true,
  multiple,
  timePicker,
  inputProps,
  ...props
}: YDatePickerProps) {
  const [calendar, setCalendar] = useState<Calendars>("jalali")
  const [internalValue, setInternalValue] = useState<DatePickerValue>(
    props.value,
  )
  const [isOpen, setIsOpen] = useState(false)

  const representedDates = useMemo(
    () =>
      internalValue
        ? getRepresentedDates(internalValue, multiple, range, timePicker)
        : [],
    [internalValue, range, multiple],
  )

  useEffect(() => {
    setInternalValue(props.value)
  }, [props.value])

  const submitHandler = (value: DatePickerValue) => {
    props.onChange(value)
    setIsOpen(false)
  }

  const closeHandler = () => {
    setIsOpen(false)
    setInternalValue(props.value)
  }

  const openHandler = () => {
    setIsOpen(true)
  }

  const clearHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    submitHandler(null)
  }

  return (
    <>
      <YInput
        {...inputProps}
        disabled={props.disabled}
        containerProps={{
          ...inputProps?.containerProps,
          onClick: !props.disabled ? openHandler : undefined,
        }}
        startButton={<CalendarCheck />}
        endButton={internalValue && <X onClick={clearHandler} />}
        value={representedDates.join(", ")}
        readOnly
      />
      <Modal
        show={isOpen}
        onHide={closeHandler}
        className={"y-date-picker-modal"}
        centered
      >
        <Calendar
          {...props}
          plugins={[
            <HeaderPlugin
              key={0}
              position={"top"}
              onClose={closeHandler}
              // This line is because timepicker itself shows selected date and I couldn't delete it
              representedDates={timePicker ? [] : representedDates}
            />,
            <FooterPlugin
              key={4}
              onClose={closeHandler}
              onSubmit={() => submitHandler(internalValue)}
              onChangeCalendar={setCalendar}
              calendar={calendar}
              position={"bottom"}
            />,
            range ? (
              <SidePlugin
                key={2}
                position={"right"}
                onChange={setInternalValue}
                calendarType={calendar}
              />
            ) : (
              <></>
            ),
            timePicker ? (
              <TimePicker key={3} position={"right"} hideSeconds />
            ) : (
              <></>
            ),
          ]}
          range={range}
          multiple={multiple}
          className={clsx("y-date-picker", props.className)}
          calendar={calendarConfig[calendar]}
          locale={localeConfig[calendar]}
          onChange={setInternalValue}
          value={internalValue}
          showOtherDays
          rangeHover
        />
      </Modal>
    </>
  )
}
