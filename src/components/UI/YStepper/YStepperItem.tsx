import "./index.scss"

import clsx from "clsx"
import { useMemo } from "react"

import { type Step, StepState } from "./types"

interface StepperItemProps {
  value: number
  step: Step
  state?: StepState
  vertical?: boolean
  noLine?: boolean
  onSelected: VoidFunction
}

export function YStepperItem({
  value,
  step,
  state,
  vertical,
  noLine,
  onSelected,
}: StepperItemProps) {
  const isSelected = useMemo(() => state === StepState.Selected, [state])
  const isCompleted = useMemo(() => state === StepState.Completed, [state])

  const bulletClass = useMemo(() => {
    if (isSelected) return "selected"
    if (isCompleted) return "completed"
    return ""
  }, [isSelected, isCompleted])

  const updateStep = () => {
    if (!step.disabled) {
      onSelected()
    }
  }

  return (
    <div
      className={clsx(state, "y-stepper-item", {
        disabled: step.disabled,
        "mb-2": vertical,
        "mt-6": vertical && value !== 0,
        "flex-grow-0": noLine,
      })}
      onClick={updateStep}
    >
      <div className="d-flex w-100">
        <div className="y-stepper-item__bullet d-flex">
          <span className={clsx("m-auto", bulletClass)}>{value + 1}</span>
        </div>
        <div className="me-2 flex-grow-1">
          <div
            className={clsx("y-stepper-item__title d-flex align-items-center", {
              "y-stepper-item__line": !noLine && !vertical,
              "y-stepper-item__line-complete": isCompleted && !vertical,
            })}
          >
            {step.title}
          </div>
          {step.subtitle && (
            <small className="y-stepper-item__subtitle">{step.subtitle}</small>
          )}
        </div>
      </div>
    </div>
  )
}
