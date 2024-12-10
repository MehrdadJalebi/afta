export enum OperatorStatus {
  IRANCELL = "irancell",
  HAMRAHAVAL = "hamrahaval",
  RIGHTEL = "rightel",
  OTHERS = "others",
}

export function operatorStatusTranslation(t: OperatorStatus): string {
  const translations = {
    [OperatorStatus.IRANCELL]: "ایرانسل",
    [OperatorStatus.HAMRAHAVAL]: "همراه اول",
    [OperatorStatus.RIGHTEL]: "رایتل",
    [OperatorStatus.OTHERS]: "سایر",
  }
  return translations[t]
}

export const operatorStatusOptions = Object.values(OperatorStatus).map(
  (value) => ({
    label: operatorStatusTranslation(value),
    value,
  }),
)
