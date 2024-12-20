export enum ContractStatus {
  DRAFT = "Draft",
}

export function contractStatusTranslation(t: ContractStatus): string {
  const translations = {
    [ContractStatus.DRAFT]: "پیش‌نویس",
  }
  return translations[t]
}

export const contractStatusOptions = Object.values(ContractStatus).map(
  (value) => ({
    label: contractStatusTranslation(value),
    value,
  }),
)
