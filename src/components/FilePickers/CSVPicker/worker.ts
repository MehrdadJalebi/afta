import * as XLSX from "xlsx"
import { WorkerInputMessage, WorkerOutputMessage } from "./types"

function replaceExtension(filename: string, newExtension: string) {
  let parts = filename.split(".")
  if (parts.length > 1) {
    parts.pop()
  }
  parts.push(newExtension)
  return parts.join(".")
}

const onMessage = (event: MessageEvent<WorkerInputMessage>) => {
  try {
    const arrayBuffer = event.data.xlsxDataBuffer
    const uint8ArrayData = new Uint8Array(arrayBuffer)
    const workBook = XLSX.read(uint8ArrayData, { type: "array" })
    const sheetName = workBook.SheetNames[0]
    const ws = workBook.Sheets[sheetName]

    const csvData = XLSX.utils.sheet_to_csv(ws)
    const newFile = new File(
      [csvData],
      replaceExtension(event.data.fileName, "csv"),
      {
        type: "text/csv",
      },
    )

    self.postMessage({ csvFile: newFile } as WorkerOutputMessage)
  } catch (e) {
    self.postMessage({
      error: "خطا در پردازش فایل انتخابی",
    } as WorkerOutputMessage)
  }
}

self.addEventListener("message", onMessage)
