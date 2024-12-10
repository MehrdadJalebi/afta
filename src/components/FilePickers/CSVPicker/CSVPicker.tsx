import { DropzoneOptions, useDropzone } from "react-dropzone"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import clsx from "clsx"
import { YBtn, YTypography } from "@/components/UI"
import "./styles.scss"
import { toastError } from "@/utils"
import { WorkerInputMessage, WorkerOutputMessage } from "./types"
import Image from "next/image"

export interface CSVPickerProps {
  onFileChange: (csvFile: File) => void
  originalFile: File | undefined
  setOriginalFile: (file: File) => void
  disabled?: boolean
  errorText?: string
}

const UPLOAD_SIZE_LIMIT = 65 * 2 ** 20
const FILE_SIZE_LIMIT = 40 * 2 ** 20

export function CSVPicker(props: CSVPickerProps) {
  const workerRef = useRef<Worker>()
  const [isProcessing, setIsProcessing] = useState(false)

  const inputMessageHandler = useCallback(
    (event: MessageEvent<WorkerOutputMessage>) => {
      setIsProcessing(false)
      if (event.data.error) {
        toastError(event.data.error)
      }
      const file = event.data.csvFile!
      if (file.size > UPLOAD_SIZE_LIMIT) {
        toastError("حجم فایل انتخابی شما پس از پردازش بیش از حد مجاز است")
        return
      }
      props.onFileChange(file)
    },
    [props.onFileChange],
  )

  useEffect(() => {
    workerRef.current = new Worker(new URL("./worker", import.meta.url))

    workerRef.current.onmessage = inputMessageHandler

    return () => {
      workerRef.current?.terminate()
    }
  }, [inputMessageHandler])

  const onDropAccepted = useCallback(
    (files: File[]) => {
      const file = files[0]
      props.setOriginalFile(file)
      if (file.name.endsWith(".csv")) {
        if (file.size > UPLOAD_SIZE_LIMIT) {
          toastError("حجم فایل انتخابی شما پس از پردازش بیش از حد مجاز است")
          return
        }
        props.onFileChange(file)
        return
      }
      const reader = new FileReader()
      reader.onabort = () => toastError("خطا در پردازش فایل انتخابی")
      reader.onerror = () => toastError("خطا در پردازش فایل انتخابی")
      reader.onload = (e) => {
        workerRef.current?.postMessage({
          fileName: file.name,
          xlsxDataBuffer: e.target?.result as ArrayBuffer,
        } as WorkerInputMessage)
        setIsProcessing(true)
      }
      reader.readAsArrayBuffer(file)
    },
    [props.onFileChange, props.setOriginalFile],
  )
  const options: DropzoneOptions = useMemo(
    () => ({
      onDropAccepted: onDropAccepted,
      maxFileSize: 1,
      maxSize: FILE_SIZE_LIMIT,
      noClick: true,
      autoFocus: false,
      disabled: props.disabled,
      accept: {
        "text/csv": [".csv"],
        "text/plain": [".csv"], // macOS reports csv as text/plain sometimes
        "application/vnd.ms-excel": [".csv", ".xls", "xlsx"], // Windows reports csv as application/vnd.ms-excel sometimes
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xls",
          ".xlsx",
        ],
      },
    }),
    [onDropAccepted],
  )
  const { getRootProps, getInputProps, isDragReject, isDragAccept, open } =
    useDropzone(options)
  const containerClassName = clsx("csv-picker-container", {
    rejected: isDragReject || !!props.errorText,
    accepted: isDragAccept,
  })

  const downloadSample = () => {
    window.open("https://assets.najva.com/panel/sample_file.xlsx", "_blank")
  }

  return (
    <div {...getRootProps()} className={containerClassName}>
      <YTypography className={"mb-2"}>
        فایل خود را در این باکس بیاندازید یا بارگذاری کنید.
      </YTypography>
      <YTypography
        variant={"detail-regular"}
        className={"mb-1"}
        color={"gray_800"}
      >
        ماکسیمم حجم فایل شما می‌تواند <bdi>۴۰ MB</bdi> باشد.
      </YTypography>
      <YTypography
        variant={"detail-regular"}
        className={"mb-2"}
        color={"gray_800"}
      >
        نوع فایل شما باید CSV یا اکسل باشد.
      </YTypography>
      <YTypography
        className={"mb-3 cursor-pointer"}
        variant={"body-medium"}
        color={"blue_700"}
        onClick={downloadSample}
      >
        دانلود فایل نمونه
      </YTypography>
      <YBtn
        icon={{
          icon: isProcessing ? "icon-loading rotate" : "icon-upload",
          placement: "right",
        }}
        onClick={open}
        className={"mb-3"}
        disabled={isProcessing || props.disabled}
      >
        {isProcessing ? "در حال پردازش فایل" : "بارگذاری فایل"}
      </YBtn>
      {props.originalFile && (
        <div className={"d-flex gap-2 align-items-center mb-2"}>
          <Image
            src={"/xlsx-icon.png"}
            alt={"xlsx"}
            width={20}
            height={20}
            style={{ pointerEvents: "none" }}
          />
          <YTypography variant={"body-medium"} className={"mt-1"}>
            {props.originalFile.name}
          </YTypography>
        </div>
      )}
      {props.errorText && (
        <YTypography
          variant={"detail-medium"}
          color={"red_500"}
          className={"mt-3"}
        >
          {props.errorText}
        </YTypography>
      )}
      <input {...getInputProps()} />
    </div>
  )
}
