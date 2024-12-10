import { BaseFilterProps } from "../types"
import { Col, Form, Row } from "react-bootstrap"
import React, { useMemo } from "react"
import { YCheckbox, YTypography } from "@/components/UI"
import { bottomDivider } from "@/styles/general"
import { LabelValue } from "@/types/common"

export interface ChecklistFilterProps
  extends BaseFilterProps<LabelValue[]>,
    Omit<
      React.ComponentProps<typeof YCheckbox>,
      "value" | "onChange" | "title" | "checked"
    > {
  items: LabelValue[]
  itemsPerRow?: number
}

export function ChecklistFilter({
  items,
  value,
  onChange,
  title,
  itemsPerRow = 3,
  ...rest
}: ChecklistFilterProps) {
  const checkBoxCols = useMemo(() => {
    return Math.ceil(12 / itemsPerRow)
  }, [itemsPerRow])

  const isChecked = (checkboxValue: number | string) => {
    return !!value.find((v) => v.value === checkboxValue)
  }

  const changeHandler =
    (checkBoxLabelValue: LabelValue) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const index = value.findIndex((v) => v.value === checkBoxLabelValue.value)
      if (e.target.checked && index === -1) {
        onChange([...value, checkBoxLabelValue])
      } else if (!e.target.checked && index !== -1) {
        value.splice(index, 1)
        onChange([...value])
      }
    }

  return (
    <div css={bottomDivider} className="pb-3">
      <Form.Group>
        <Form.Label>
          <YTypography tag={"span"} variant={"caption-bold"}>
            {title}
          </YTypography>
        </Form.Label>
        <Row>
          {items.map((item) => (
            <Col key={item.value} xs={checkBoxCols} className={"pt-3"}>
              <YCheckbox
                {...rest}
                inline={false}
                label={item.label}
                checked={isChecked(item.value)}
                onChange={changeHandler(item)}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>
    </div>
  )
}
