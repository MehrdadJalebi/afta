import * as XLSX from "xlsx"
// TODO: handle customize cells
export function downloadXlsx(name?: string, csvString?: string) {
  const headers = csvString?.split("\r\n")[0]
  const translatedTitles = headers!
    .split(",")
    .map(
      (title) =>
        translatesTitles[title as keyof typeof translatesTitles] || title,
    )
  const humanizedCsvString = csvString!.replace(
    headers!,
    translatedTitles.toString(),
  )
  const now = new Date()
  const fileName = `${name}_${now.toDateString()}_${now.getHours()}_${now.getMinutes()}.xlsx`
  var wb = XLSX.read(humanizedCsvString, { type: "string", cellDates: true })
  XLSX.writeFile(wb, fileName)
}

const translatesTitles = {
  id: "شناسه",
  message_id: "شناسه پیامک",
  campaign_id: "شناسه کمپین",
  group_id: "شناسه درخواست/کمپین",
  line: "شماره ارسال‌کننده",
  sender: "شماره ارسال‌کننده",
  receptor: "شماره دریافت‌کننده",
  receiver: "شماره دریافت‌کننده",
  message: "متن پیامک",
  text: "متن پیامک",
  date: "تاریخ",
  cost: "قیمت پیامک (تومان)",
  status: "وضعیت",
  category: "کانال ارسال",
  is_preview: "نوع کلیک",
  phone_number: "شماره مخاطب",
}
