export enum ContractStatus {
  DRAFT = "Draft",
  SIGN = "Sign",
  DELETE = "Delete",
}

export function contractStatusTranslation(t: ContractStatus): string {
  const translations = {
    [ContractStatus.DRAFT]: "پیش‌نویس",
    [ContractStatus.SIGN]: "امضا شده",
    [ContractStatus.DELETE]: "حذف شده",
  }
  return translations[t]
}

export const contractStatusOptions = Object.values(ContractStatus).map(
  (value) => ({
    label: contractStatusTranslation(value),
    value,
  }),
)
