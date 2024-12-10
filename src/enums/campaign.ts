export enum CampaignStatus {
  DRAFT = "DRAFT",
  SCHEDULED = "SCHEDULED",
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export function campaignStatusTranslation(t: CampaignStatus): string {
  const translations = {
    [CampaignStatus.DRAFT]: "پیش‌نویس",
    [CampaignStatus.SCHEDULED]: "زمان‌بندی شده",
    [CampaignStatus.PENDING]: "در صف ارسال",
    [CampaignStatus.RUNNING]: "در حال ارسال",
    [CampaignStatus.COMPLETED]: "ارسال شده",
    [CampaignStatus.CANCELLED]: "متوقف شده",
  }
  return translations[t]
}

export const campaignStatusOptions = Object.values(CampaignStatus).map(
  (value) => ({
    label: campaignStatusTranslation(value),
    value,
  }),
)
