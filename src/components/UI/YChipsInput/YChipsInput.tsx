import { useRef, useState, useEffect, forwardRef } from "react"
import { Row, Col, Form, FormControl } from "react-bootstrap"
import { clsx } from "clsx"
import { YTypography } from "@/components/UI"

import "./styles.scss"
import { YInputProps, FeedbackProps } from "../YInput"

export interface YChipsInputProps extends Omit<YInputProps, "onSubmit"> {
  onRemove: (index: number) => void
  onSubmit: (value: string) => void
  maxItem?: number
  chips: string[]
  feedbackProps?: FeedbackProps
}

export const YChipsInput = forwardRef<HTMLInputElement, YChipsInputProps>(
  function YChipsInput({ onRemove, maxItem, chips, feedbackProps, ...attrs }) {
    const formControlRef = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = useState(false)
    const [exitingIndex, setExitingIndex] = useState<number | null>(null)

    const removeChip = (index: number) => {
      setExitingIndex(index)
      setTimeout(() => {
        onRemove(index)
        setExitingIndex(null)
      }, 250)
    }

    const editChip = (index: number) => {
      const chipsCopy = [...chips]
      const editChipValue = chipsCopy[index]
      chipsCopy.splice(index, 1)
      onRemove(index)
      if (formControlRef.current) {
        formControlRef.current.value = editChipValue
        formControlRef.current.focus()
      }
    }

    useEffect(() => {
      if (formControlRef.current) {
        formControlRef.current.value = ""
      }
    }, [chips])
    const inputContainerClassName = clsx(
      "chip-input rounded",
      {
        focused: focused,
        error: feedbackProps?.text,
        "overflow-y-auto": chips?.length > 1,
      },
      attrs.className,
    )
    const submitHandler = () => {
      if (formControlRef.current) {
        attrs.onSubmit?.(formControlRef.current.value)
      }
    }

    return (
      <div className="y-chips-input">
        <div className={inputContainerClassName}>
          <Row className="align-items-center w-100" noGutters dir="ltr">
            {chips?.map((chip, index) => (
              <Col xs="auto" key={index} className="p-1">
                <div
                  className={clsx("chip show", {
                    hide: exitingIndex === index,
                  })}
                  onDoubleClick={() => editChip(index)}
                >
                  {chip}
                  <i
                    className={"icon-close cursor-pointer text-danger"}
                    onClick={() => removeChip(index)}
                  />
                </div>
              </Col>
            ))}
            <Col xs className="px-1">
              <Form
                className="custom-form-control"
                onSubmit={(e) => {
                  e.preventDefault()
                  submitHandler()
                }}
                noValidate
              >
                <FormControl
                  ref={formControlRef}
                  disabled={!!maxItem && chips?.length >= maxItem}
                  className="border-0 no-focus m-0 p-0"
                  onFocus={() => setFocused(true)}
                  onBlur={(e) => {
                    if (formControlRef.current?.value) {
                      e.preventDefault()
                      submitHandler()
                    }
                    setFocused(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault()
                      submitHandler()
                    }
                  }}
                />
              </Form>
            </Col>
          </Row>
        </div>
        {feedbackProps && (
          <div className={"feedback-container"}>
            <YTypography variant={"detail-medium"} color={"red_500"}>
              {feedbackProps.text}
            </YTypography>
          </div>
        )}
      </div>
    )
  },
)
