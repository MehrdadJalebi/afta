import { BaseFilterProps } from "@/components/Filters/types"
import { DateRange } from "@/types/common"
import { Form } from "react-bootstrap"
import { YDatePicker, YTypography } from "@/components/UI"
import { useMemo } from "react"
import { DateObject } from "react-multi-date-picker"
import { YDatePickerProps } from "@/components/UI/YDatePicker/types"
import { YTypographyProps } from "@/components/UI/YTypography/types"

export interface RangePickerFilterProps
  extends BaseFilterProps<DateRange>,
    Omit<YDatePickerProps, "value" | "onChange"> {
  labelTypographyProps?: YTypographyProps<"label">
}

export function RangePickerFilter({
  value,
  onChange,
  title,
  labelTypographyProps,
  ...rest
}: RangePickerFilterProps) {
  const datePickerValue = useMemo(() => {
    if (!(value.start && value.end)) return null
    return [value.start, value.end]
  }, [value])

  const changeHandler = (value: DateObject[] | null) => {
    if (!value || value.length <= 1) {
      onChange({ start: null, end: null })
    } else {
      onChange({
        start: new DateObject({ date: value[0] }).set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        }),
        end: new DateObject({ date: value[1] }).set({
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 0,
        }),
      })
    }
  }

  return (
    <Form.Group>
      <Form.Label>
        <YTypography
          tag={"span"}
          variant={"caption-medium"}
          {...labelTypographyProps}
        >
          {title}
        </YTypography>
      </Form.Label>
      <YDatePicker
        maxDate={new Date()}
        {...rest}
        value={datePickerValue}
        onChange={changeHandler as YDatePickerProps["onChange"]}
      />
    </Form.Group>
  )
}
