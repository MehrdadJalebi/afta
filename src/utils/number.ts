const engToPerMap = "۰۱۲۳۴۵۶۷۸۹"

export function engToPerDigits(str: string): string {
  return str.replace(/[0-9]/g, (match) => engToPerMap[parseInt(match, 10)])
}

export function numberHumanize(num: number): string {
  return num
    .toString()
    .replace(/[^-\d.]/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function persianNumberHumanize(num: number): string {
  return engToPerDigits(numberHumanize(num))
}

const perToEngMap: { [key: string]: string } = {
  "۰": "0",
  "٠": "0",
  "۱": "1",
  "١": "1",
  "۲": "2",
  "٢": "2",
  "۳": "3",
  "٣": "3",
  "۴": "4",
  "٤": "4",
  "۵": "5",
  "٥": "5",
  "۶": "6",
  "٦": "6",
  "۷": "7",
  "٧": "7",
  "۸": "8",
  "٨": "8",
  "۹": "9",
  "٩": "9",
}

export function convertPersianNumbersToEnglish(str: string): string {
  return str.replace(
    /[\u0660-\u0669\u06F0-\u06F9]/g,
    (match) => perToEngMap[match] ?? match,
  )
}

export function IRRToIRT(val: number) {
  return Math.floor(val / 10)
}

export function IRTToIRR(val: number) {
  return val * 10
}

// CAVEAT: \B (regex look behind) is not supported in Opera Mini at all
export function numberwithCommas(value: string | number): string {
  const parts = value.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}
