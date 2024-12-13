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
  date: "تاریخ",
  status: "وضعیت",
}
