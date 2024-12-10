import { FeedbackProps, YInput } from "@/components/UI"
import React, { forwardRef } from "react"
import { FormGroupProps } from "react-bootstrap"
import { Interpolation } from "@emotion/react"

export interface YTextFieldProps extends React.ComponentProps<"textarea"> {
  title?: string
  containerProps?: FormGroupProps & { css?: Interpolation<any> }
  feedbackProps?: FeedbackProps
  showEmoji?: boolean
  height?: number | string
}

export const YTextArea = forwardRef<HTMLTextAreaElement, YTextFieldProps>(
  function YTextArea(
    { containerProps, feedbackProps, title, showEmoji, height, ...rest },
    ref,
  ) {
    // TODO handle emoji for create campaign
    return (
      <YInput
        customInputNode={<textarea {...rest} ref={ref} />}
        disabled={rest.disabled}
        inputContainerProps={{ style: { height } }}
        containerProps={containerProps}
        feedbackProps={feedbackProps}
        title={title}
      />
    )
  },
)
