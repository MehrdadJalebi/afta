export enum WebhookType {
  DELIVERY_EVENT = "DELIVERY_EVENT",
  INCOMING_MESSAGE = "INCOMING_MESSAGE",
}

export function webhookTypeTranslation(w: WebhookType): string {
  const translations = {
    [WebhookType.DELIVERY_EVENT]: "وب‌هوک ارسال‌ها",
    [WebhookType.INCOMING_MESSAGE]: "وب‌هوک دریافت‌ها",
  }
  return translations[w]
}

export const webhookTypeOptions = Object.values(WebhookType).map((value) => ({
  label: webhookTypeTranslation(value),
  value,
}))
