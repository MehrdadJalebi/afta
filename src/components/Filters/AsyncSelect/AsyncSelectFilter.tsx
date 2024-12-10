import { BaseFilterProps } from "@/components/Filters/types"
import { LabelValue } from "@/types/common"
import { AsyncSelect, AsyncSelectProps } from "@/components/AsyncSelect"

export interface AsyncSelectFilterProps
  extends BaseFilterProps<LabelValue | LabelValue[]>,
    Omit<
      AsyncSelectProps<any, LabelValue, boolean>,
      "value" | "onChange" | "yInputProps"
    > {}

export function AsyncSelectFilter({ title, ...rest }: AsyncSelectFilterProps) {
  return (
    <AsyncSelect
      {...rest}
      value={rest.value as any}
      onChange={rest.onChange as any}
      yInputProps={{
        title,
        labelTypographyProps: { variant: "caption-medium", color: "gray_950" },
      }}
    />
  )
}
