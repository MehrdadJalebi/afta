export function getSenderType(sender: IrisSchema<"SMSLine">) {
  return `${sender.commercial ? "تبلیغاتی" : "خدماتی"} ${sender.private ? "اختصاصی" : "اشتراکی"}`
}
