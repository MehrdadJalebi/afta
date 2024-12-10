export enum UserType {
  REAL = "REAL",
  LEGAL = "LEGAL",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum CompanyType {
  UNKNOWN = "UNKNOWN",
  PUBLIC_JOINT_STOCK = "PUBLIC_JOINT_STOCK", // سهامی عام
  PRIVATE_JOINT_STOCK = "PRIVATE_JOINT_STOCK", // سهامی خاص
  LIMITED_LIABILITY = "LIMITED_LIABILITY", // با مسئولیت محدود
  GENERAL_PARTNERSHIP = "GENERAL_PARTNERSHIP", // تضامنی
  LIMITED_NON_SHARES = "LIMITED_NON_SHARES", // مختلط غیرسهامی
  LIMITED_BY_SHARES = "LIMITED_BY_SHARES", // مختلط سهامی
  RELATIVE_PARTNERSHIP = "RELATIVE_PARTNERSHIP", // نسبی
  COOPERATIVE = "COOPERATIVE", // تعاونی
  GOVERNMENTAL = "GOVERNMENTAL", // دولتی
  MINISTRY = "MINISTRY", // وزارتخانه
  EMBASSY = "EMBASSY", // سفارتخانه
  MOSQUE = "MOSQUE", // مسجد
  SCHOOL = "SCHOOL", // مدرسه
}

export enum AuthorizationStatus {
  UNREGISTERED = "UNREGISTERED",
  APPROVED_TERM_POLICIES = "APPROVED_TERM_POLICIES",
  APPROVED_PHONE_NUMBER = "APPROVED_PHONE_NUMBER",
  FILLED_FINANCIAL_ACCOUNT = "FILLED_FINANCIAL_ACCOUNT",
  PENDING_AGREEMENT_APPROVAL = "PENDING_AGREEMENT_APPROVAL",
  REJECTED_AGREEMENT = "REJECTED_AGREEMENT",
  FULL_ACCESS = "FULL_ACCESS",
}

export function userTypeTranslation(u: UserType) {
  const translations = {
    [UserType.REAL]: "حقیقی",
    [UserType.LEGAL]: "حقوقی",
  }
  return translations[u]
}

export function genderTranslation(g: Gender) {
  const translations = {
    [Gender.MALE]: "مرد",
    [Gender.FEMALE]: "زن",
  }
  return translations[g]
}

export function companyTypeTranslation(c: CompanyType) {
  const translations = {
    [CompanyType.UNKNOWN]: "نامشخص",
    [CompanyType.PUBLIC_JOINT_STOCK]: "سهامی عام",
    [CompanyType.PRIVATE_JOINT_STOCK]: "سهامی خاص",
    [CompanyType.LIMITED_LIABILITY]: "با مسئولیت محدود",
    [CompanyType.GENERAL_PARTNERSHIP]: "تضامنی",
    [CompanyType.LIMITED_NON_SHARES]: "مختلط غیرسهامی",
    [CompanyType.LIMITED_BY_SHARES]: "مختلط سهامی",
    [CompanyType.RELATIVE_PARTNERSHIP]: "نسبی",
    [CompanyType.COOPERATIVE]: "تعاونی",
    [CompanyType.GOVERNMENTAL]: "دولتی",
    [CompanyType.MINISTRY]: "وزارتخانه",
    [CompanyType.EMBASSY]: "سفارتخانه",
    [CompanyType.MOSQUE]: "مسجد",
    [CompanyType.SCHOOL]: "مدرسه",
  }
  return translations[c]
}

export const genderOptions = Object.values(Gender).map((value) => ({
  label: genderTranslation(value),
  value,
}))

export const companyTypeOptions = Object.values(CompanyType).map((value) => ({
  label: companyTypeTranslation(value),
  value,
}))
