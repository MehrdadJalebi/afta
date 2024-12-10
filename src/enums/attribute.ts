export enum AttributeValueType {
  STRING = "STRING",
  INTEGER = "INTEGER",
  FLOAT = "FLOAT",
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
}

export function attributeValueTypeTranslation(t: AttributeValueType): string {
  const translations = {
    [AttributeValueType.INTEGER]: "عدد صحیح",
    [AttributeValueType.FLOAT]: "عدد اعشاری",
    [AttributeValueType.STRING]: "متن",
    [AttributeValueType.BOOLEAN]: "Boolean",
    [AttributeValueType.DATE]: "تاریخ",
  }
  return translations[t]
}

export const attributeValueTypeOptions = Object.values(AttributeValueType).map(
  (value) => ({
    label: attributeValueTypeTranslation(value),
    value,
  }),
)
