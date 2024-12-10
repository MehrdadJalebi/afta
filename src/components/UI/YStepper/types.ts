export enum StepState {
  Completed = "completed",
  Error = "error",
  Selected = "selected",
}

export interface Step {
  title: string
  subtitle?: string
  state?: StepState
  key: string
  visible: boolean
  disabled?: boolean
}
