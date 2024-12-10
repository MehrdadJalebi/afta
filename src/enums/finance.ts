export enum TransactionType {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
}

export function transactionTypeTranslation(t: TransactionType) {
  const translations = {
    [TransactionType.INCREASE]: "شارژ",
    [TransactionType.DECREASE]: "کسر",
  }
  return translations[t]
}

export const transactionTypeOptions = Object.values(TransactionType).map(
  (value) => ({
    label: transactionTypeTranslation(value),
    value,
  }),
)
