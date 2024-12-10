export enum SentLogStatus {
  START_TO_SEND = "START_TO_SEND",
  SENT_COMPLETED = "SENT_COMPLETED",
  SENT_FAILED = "SENT_FAILED",
  SENT_UNKNOWN = "SENT_UNKNOWN",
  DELIVERED = "DELIVERED",
  DELIVERY_BLOCKED = "DELIVERY_BLOCKED",
  DELIVERY_FAILED = "DELIVERY_FAILED",
}

export enum LogSource {
  CAMPAIGN = "CAMPAIGN",
  TRANSACTIONAL = "TRANSACTIONAL",
  SEND_TEST = "SEND_TEST",
}

export enum ChartInterval {
  DAILY = "daily",
  HOURLY = "hourly",
}

export function sentLogStatusTranslation(s: SentLogStatus) {
  const translations = {
    [SentLogStatus.START_TO_SEND]: "در صف ارسال",
    [SentLogStatus.SENT_COMPLETED]: "ارسال شده",
    [SentLogStatus.SENT_FAILED]: "خطا در ارسال",
    [SentLogStatus.SENT_UNKNOWN]: "ارسال شده به مخابرات",
    [SentLogStatus.DELIVERED]: "تحویل شده",
    [SentLogStatus.DELIVERY_BLOCKED]: "مسدود شده",
    [SentLogStatus.DELIVERY_FAILED]: "تحویل نشده",
  }
  return translations[s]
}

export const sentLogStatusOptions = Object.values(SentLogStatus).map(
  (value) => ({ label: sentLogStatusTranslation(value), value }),
)

export function logSourceTranslation(l: LogSource) {
  const translations = {
    [LogSource.CAMPAIGN]: "کمپین",
    [LogSource.TRANSACTIONAL]: "تراکنشی",
    [LogSource.SEND_TEST]: "تستی",
  }
  return translations[l]
}

export const logSourceOptions = Object.values(LogSource).map((value) => ({
  label: logSourceTranslation(value),
  value,
}))
