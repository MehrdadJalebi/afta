import { DateObject } from "react-multi-date-picker"
import { SubmitHandler } from "react-hook-form"

export type IsHijacked = { isHijacked?: boolean }
export type LabelValue = { label: string; value: string | number }
export type DateRange = { start: DateObject | null; end: DateObject | null }

export interface FormComponentProps<TFieldValues extends Record<string, any>> {
  onSubmit: SubmitHandler<TFieldValues>
  isSubmitting: boolean
  initialValues?: Partial<TFieldValues>
}
