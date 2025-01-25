import { css } from "@emotion/react"
import { TriangleAlert } from "lucide-react"
import type { ChangeEvent } from "react"
import { Form, FormControlProps } from "react-bootstrap"
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form"

import { convertPersianNumbersToEnglish } from "src/utils"

interface YFormInputProps<TFieldValues extends FieldValues>
  extends FormControlProps {
  name: FieldPath<TFieldValues>
  rules?: UseControllerProps<TFieldValues>["rules"]
  defaultValue?: UseControllerProps<TFieldValues>["defaultValue"]
  label?: string
  description?: string
  isNumber?: boolean
  withComma?: boolean
  changeInterceptor?(value: string): string
}

export const YFormInput = <TFieldValues extends FieldValues>({
  name,
  rules,
  defaultValue,
  label,
  description,
  isNumber,
  withComma,
  changeInterceptor,
  ...attrs
}: YFormInputProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>()
  const { field, fieldState } = useController<TFieldValues>({
    name,
    control,
    rules,
    defaultValue,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (isNumber) {
      const convertedValue = convertPersianNumbersToEnglish(value)
      value = convertedValue.replace(/[^\d]/g, "")
      if (withComma) {
        value = value.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }

    value = changeInterceptor?.(value) || value
    field.onChange(value)
  }

  return (
    <Form.Group className="mb-4">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...attrs}
        {...field}
        value={field.value ?? ""}
        onChange={handleChange}
        isInvalid={fieldState.invalid && fieldState.isTouched}
        css={isNumber && persionNumberDisplay}
      />
      {fieldState.invalid && fieldState.isTouched && (
        <Form.Control.Feedback type="invalid">
          <TriangleAlert className="ms-1" />
          {fieldState.error?.message}
        </Form.Control.Feedback>
      )}
      {description && <Form.Text muted>{description}</Form.Text>}
    </Form.Group>
  )
}

const persionNumberDisplay = css`
  font-feature-settings: "ss04";
`
