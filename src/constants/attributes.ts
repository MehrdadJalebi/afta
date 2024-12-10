import { LabelValue } from "@/types/common"

export const REQUIRED_ATTRIBUTES = new Set(["phone_number"])

export const REQUIRED_ATTRIBUTES_OPTIONS: LabelValue[] = Array.from(
  REQUIRED_ATTRIBUTES,
).map((attr) => ({
  label: attr,
  value: attr,
}))
