import React, { forwardRef, useId } from "react"
import clsx from "clsx"
import "./styles.scss"
import { Form, FormControlProps, FormGroupProps } from "react-bootstrap"
import { YTypography } from "@/components/UI"
import { Interpolation } from "@emotion/react"
import { YTypographyProps } from "@/components/UI/YTypography/types"

export interface FeedbackProps {
  text?: string
}

export interface YInputProps extends React.ComponentProps<"input"> {
  title?: string
  startButton?: React.ReactNode
  endButton?: React.ReactNode
  containerProps?: FormGroupProps & { css?: Interpolation<any> }
  inputContainerProps?: React.ComponentProps<"div">
  feedbackProps?: FeedbackProps
  customInputNode?: React.ReactNode
  labelTypographyProps?: YTypographyProps<"span">
}

export const YInput = forwardRef<HTMLInputElement, YInputProps>(function YInput(
  {
    startButton,
    endButton,
    containerProps,
    inputContainerProps,
    feedbackProps,
    title,
    customInputNode,
    labelTypographyProps,
    ...rest
  },
  ref,
) {
  const id = useId()
  const containerClassName = clsx("y-input", containerProps?.className, {
    disabled: rest.disabled,
  })
  const inputContainerClassName = clsx(
    "y-input-container",
    inputContainerProps?.className,
    {
      error: feedbackProps?.text,
    },
  )
  return (
    <Form.Group {...containerProps} className={containerClassName}>
      {title && (
        <Form.Label htmlFor={id}>
          <YTypography
            tag={"span"}
            variant={"detail-regular"}
            color={"gray_700"}
            {...labelTypographyProps}
          >
            {title}
          </YTypography>
        </Form.Label>
      )}
      <div {...inputContainerProps} className={inputContainerClassName}>
        {startButton && <div className={"slot-container"}>{startButton}</div>}
        {customInputNode ? (
          customInputNode
        ) : (
          <input {...rest} ref={ref} id={id} />
        )}
        {endButton && <div className={"slot-container"}>{endButton}</div>}
      </div>
      {feedbackProps && (
        <div className={"feedback-container"}>
          <YTypography variant={"detail-medium"} color={"red_600"}>
            {feedbackProps.text}
          </YTypography>
        </div>
      )}
    </Form.Group>
  )
})
