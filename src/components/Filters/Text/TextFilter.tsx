import { BaseFilterProps } from "@/components/Filters/types"
import { YInput, YInputProps } from "@/components/UI"
import React from "react"

export interface TextFilterProps
  extends BaseFilterProps<string>,
    Omit<YInputProps, "value" | "onChange" | "title"> {
  placeholder?: string
}

export function TextFilter({
  placeholder,
  title,
  onChange,
  value,
  ...rest
}: TextFilterProps) {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <YInput
      {...rest}
      labelTypographyProps={{ variant: "caption-medium", color: "gray_950" }}
      placeholder={placeholder}
      onChange={changeHandler}
      value={value}
      title={title}
    />
  )
}
