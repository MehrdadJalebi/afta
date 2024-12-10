import { NumericFormat, NumericFormatProps } from "react-number-format"
import { YInput, YInputProps } from "@/components/UI"
import React from "react"
import { convertPersianNumbersToEnglish } from "@/utils"

export interface YNumberInputProps extends NumericFormatProps<YInputProps> {}

/**
 * This component wraps `NumericFormat` from react-number-format but also supports arabic and persian numbers.
 * Important note is that if you want custom formatting like `thousandSeparator` or controllable input and want to
 * use react-hook-form, you must use `Controller`, not `register` and use `onValueChange` prop instead.
 */
export const YNumberInput = React.forwardRef<
  HTMLInputElement,
  YNumberInputProps
>(function YNumberInput(props, ref) {
  const changeCaptureHandler: React.FormEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.target.value = convertPersianNumbersToEnglish(e.target.value)
  }

  return (
    <NumericFormat
      allowLeadingZeros
      defaultValue={""}
      {...props}
      customInput={YInput}
      getInputRef={ref}
      onChangeCapture={changeCaptureHandler}
    />
  )
})
