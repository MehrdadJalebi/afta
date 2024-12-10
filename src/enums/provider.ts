export enum ProviderStatus {
  RAHYAB = "rahyab",
  ASIATECH = "asiatech",
  JIRING = "jiring",
}

export function providerStatusTranslation(t: ProviderStatus): string {
  const translations = {
    [ProviderStatus.RAHYAB]: "سرشماره ۱۰۰۰",
    [ProviderStatus.ASIATECH]: "سرشماره ۹۰۰۰",
    [ProviderStatus.JIRING]: "سرشماره ۷۰۰۷",
  }
  return translations[t]
}

export const providerStatusOptions = Object.values(ProviderStatus).map(
  (value) => ({
    label: providerStatusTranslation(value),
    value,
  }),
)
