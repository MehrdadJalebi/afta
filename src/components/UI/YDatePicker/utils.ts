import { DateObject } from "react-multi-date-picker"
import { DatePickerValue } from "./types"

// TODO these functions need testing
export function isSimple(
  value: DatePickerValue,
  multiple?: boolean,
  range?: boolean,
): value is DateObject {
  return !multiple && !range && value !== null
}

export function isArray(
  value: DatePickerValue,
  multiple?: boolean,
  range?: boolean,
): value is DateObject[] {
  return multiple !== range && Array.isArray(value) // if one of range and multiple is true only
}

export function is2dArray(
  value: DatePickerValue,
  multiple?: boolean,
  range?: boolean,
): value is DateObject[][] {
  return Boolean(multiple && range) && Array.isArray(value)
}

export function getDateObjectRepresentation(
  value: DateObject,
  showTime?: boolean,
): string {
  return `${value.day} ${value.month.name} ${value.year}${showTime ? ` ساعت ${value.hour}:${value.minute}` : ""}`
}

// TODO remove timepicker
export function getRepresentedDates(
  value: DatePickerValue,
  multiple?: boolean,
  range?: boolean,
  timepicker?: boolean,
): string[] {
  if (isSimple(value, multiple, range)) {
    return [getDateObjectRepresentation(value as DateObject, timepicker)]
  } else if (range && !multiple && isArray(value, multiple, range)) {
    return value.length <= 1
      ? []
      : [
          `${getDateObjectRepresentation(value[0], timepicker)} - ${getDateObjectRepresentation(value[1], timepicker)}`,
        ]
  } else if (!range && multiple && isArray(value, multiple, range)) {
    return value.map((v: DateObject) =>
      getDateObjectRepresentation(v, timepicker),
    )
  } else if (is2dArray(value, multiple, range)) {
    return value.map(
      (v: DateObject[]) =>
        `${getDateObjectRepresentation(v[0], timepicker)} - ${getDateObjectRepresentation(v[1], timepicker)}`,
    )
  }
  return []
}
