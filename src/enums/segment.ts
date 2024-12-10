export enum BaseSegmentType {
  SEGMENT = "SEGMENT",
  LIST = "LIST",
}

export enum SegmentFilterOperation {
  EQUAL = "EQUAL",
  NOT_EQUAL = "NOT_EQUAL",
  STARTS_WITH = "STARTS_WITH",
  ENDS_WITH = "ENDS_WITH",
}

export enum SegmentListInclusion {
  INCLUDE = "INCLUDE",
  EXCLUDE = "EXCLUDE",
}

export enum SegmentConditionType {
  LIST = "LIST",
  ATTRIBUTE = "ATTRIBUTE",
  BEHAVIOUR = "BEHAVIOUR",
}

export function segmentFilterOperationTranslation(
  f: SegmentFilterOperation,
): string {
  const translations = {
    [SegmentFilterOperation.EQUAL]: "برابر با",
    [SegmentFilterOperation.NOT_EQUAL]: "نابرابر با",
    [SegmentFilterOperation.STARTS_WITH]: "در ابتدا با",
    [SegmentFilterOperation.ENDS_WITH]: "در انتها با",
  }
  return translations[f]
}

export const segmentFilterOperationOptions = Object.values(
  SegmentFilterOperation,
).map((value) => ({ label: segmentFilterOperationTranslation(value), value }))

export function segmentListInclusionTranslation(
  l: SegmentListInclusion,
): string {
  const translations = {
    [SegmentListInclusion.INCLUDE]: "باشد",
    [SegmentListInclusion.EXCLUDE]: "نباشد",
  }
  return translations[l]
}

export const segmentListInclusionOptions = Object.values(
  SegmentListInclusion,
).map((value) => ({ label: segmentListInclusionTranslation(value), value }))

export function segmentConditionTypeTranslation(
  s: SegmentConditionType,
): string {
  const translations = {
    [SegmentConditionType.LIST]: "براساس عضویت کاربر در لیست خاص",
    [SegmentConditionType.ATTRIBUTE]: "براساس ویژگی کاربر",
    [SegmentConditionType.BEHAVIOUR]: "براساس رفتار کاربر",
  }
  return translations[s]
}

export const segmentConditionTypeOptions = Object.values(
  SegmentConditionType,
).map((value) => ({ label: segmentConditionTypeTranslation(value), value }))

export function baseSegmentTypeTranslation(b: BaseSegmentType) {
  const translations = {
    [BaseSegmentType.LIST]: "لیست",
    [BaseSegmentType.SEGMENT]: "سگمنت",
  }
  return translations[b]
}

export const baseSegmentTypeOptions = Object.values(BaseSegmentType).map(
  (value) => ({ label: baseSegmentTypeTranslation(value), value }),
)
