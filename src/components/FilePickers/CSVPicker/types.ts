export type WorkerInputMessage = {
  xlsxDataBuffer: ArrayBuffer
  fileName: string
}

export type WorkerOutputMessage = {
  csvFile?: File
  error?: string
}
