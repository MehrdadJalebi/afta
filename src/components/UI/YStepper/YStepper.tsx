import "./index.scss"

import clsx from "clsx"
import { type ReactNode, useMemo } from "react"

import { YStepperHeader } from "./YStepperHeader"
import { YStepperItem } from "./YStepperItem"
import { type Step, StepState } from "./types"
import { computeState } from "@/components/UI/YStepper/utils"

interface StepperProps {
  value: number
  steps: Step[]
  onChange: (value: number) => void
  vertical?: boolean
  children?: ReactNode
}

export function YStepper({
  value,
  steps,
  vertical,
  onChange,
  children,
}: StepperProps) {
  const visibleSteps = useMemo(
    () => steps.filter((item) => item.visible),
    [steps],
  )

  return (
    <div className={clsx({ "w-100": !vertical })}>
      {!vertical && (
        <YStepperHeader
          value={value}
          steps={visibleSteps}
          className="mb-md-6 mx-md-6"
          onInput={onChange}
        />
      )}

      {visibleSteps.map((step, index) => (
        <div
          key={step.key}
          className={clsx({ "y-stepper_vertical__wrapper": vertical })}
        >
          {vertical && (
            <YStepperItem
              step={step}
              noLine={index === visibleSteps.length - 1}
              state={computeState(index, value, step.state)}
              value={index}
              vertical
              onSelected={() => onChange(index)}
            />
          )}
          <div className={clsx(value === index ? "d-block" : "d-none")}>
            {children}
          </div>
          {vertical && index < visibleSteps.length - 1 && (
            <div
              className={clsx("y-stepper_vertical__line", {
                "y-stepper_vertical__line-complete":
                  computeState(index, value, step.state) ===
                  StepState.Completed,
              })}
            />
          )}
        </div>
      ))}
    </div>
  )
}
