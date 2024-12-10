import { StepState } from "@/components/UI/YStepper/types"

export function computeState(
  index: number,
  activeIndex: number,
  givenState?: StepState,
): StepState | undefined {
  if (index === activeIndex) return StepState.Selected
  if (givenState) return givenState
  return activeIndex > index ? StepState.Completed : undefined
}
