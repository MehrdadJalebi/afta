import "./index.scss"

import clsx from "clsx"
import { ProgressBar } from "react-bootstrap"

import { useDisplay } from "src/hooks"

import { YStepperItem } from "./YStepperItem"
import { type Step, StepState } from "./types"
import { computeState } from "@/components/UI/YStepper/utils"

interface StepperHeaderProps {
  value: number
  steps: Step[]
  onInput: (value: number) => void
  className?: string
}

export function YStepperHeader({
  value,
  steps,
  onInput,
  className,
}: StepperHeaderProps) {
  const { smAndDown } = useDisplay()

  return (
    <div className={className}>
      {!smAndDown ? (
        <div className="d-flex">
          {steps.map((step, index) => (
            <YStepperItem
              key={step.key}
              step={step}
              state={computeState(index, value, step.state)}
              value={index}
              noLine={index === steps.length - 1}
              onSelected={() => onInput(index)}
            />
          ))}
        </div>
      ) : (
        <div className="y-stepper_mobile__wrapper">
          <div className="d-flex align-items-center mb-4 px-4">
            <div className="ms-6 text-muted">
              مرحله {value + 1} از {steps.length}
            </div>
            {steps[value].state === StepState.Error && (
              <i className="icon-exclamation text-danger ms-2" />
            )}
            <b
              className={clsx({
                "text-danger": steps[value].state === StepState.Error,
              })}
            >
              {steps[value].title}
            </b>
          </div>
          <ProgressBar
            now={value + 1}
            max={steps.length}
            style={{ height: "0.25rem" }}
          />
        </div>
      )}
    </div>
  )
}
