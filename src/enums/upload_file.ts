export enum UploadFileStatusType {
  UPLOADED = "UPLOADED",
  PROCESSING = "PROCESSING",
  PROCESSED = "PROCESSED",
}

export function uploadFileStatusTypeTranslation(t: UploadFileStatusType) {
  const translations = {
    [UploadFileStatusType.UPLOADED]: "بارگذاری شده",
    [UploadFileStatusType.PROCESSING]: "در حال پردازش",
    [UploadFileStatusType.PROCESSED]: "پردازش شده",
  }
  return translations[t]
}

export const uploadFileStatusTypeOptions = Object.values(
  UploadFileStatusType,
).map((value) => ({
  label: uploadFileStatusTypeTranslation(value),
  value,
}))
