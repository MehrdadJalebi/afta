export enum TemplateStatus {
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  NOT_APPROVED = "NOT_APPROVED",
}

export function templateStatusTranslation(t: TemplateStatus): string {
  const translations = {
    [TemplateStatus.IN_REVIEW]: "در انتظار تایید",
    [TemplateStatus.APPROVED]: "تایید شده",
    [TemplateStatus.NOT_APPROVED]: "رد شده",
  }
  return translations[t]
}

export const templateStatusOptions = Object.values(TemplateStatus).map(
  (value) => ({
    label: templateStatusTranslation(value),
    value,
  }),
)
