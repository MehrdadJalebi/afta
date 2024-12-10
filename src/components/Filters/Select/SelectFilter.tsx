import { BaseFilterProps } from "@/components/Filters/types"
import { LabelValue } from "@/types/common"
import { YSelect, YSelectProps } from "@/components/UI"

export interface SelectFilterProps
  extends BaseFilterProps<LabelValue | LabelValue[]>,
    Omit<
      YSelectProps<LabelValue, boolean>,
      "value" | "onChange" | "yInputProps"
    > {}

export function SelectFilter({ title, ...rest }: SelectFilterProps) {
  return (
    <YSelect
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
