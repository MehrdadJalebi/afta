import { toast } from "react-toastify"

export function toastError(errors: string | Record<string, string | string[]>) {
  if (typeof errors === "string") {
    toast.error(errors)
    return
  }

  Object.values(errors).forEach((errMsg) => {
    if (typeof errMsg === "string") {
      toast.error(errMsg)
    } else if (Array.isArray(errMsg)) {
      toast.error(errMsg[0])
    }
  })
}

export function toastSuccess(message: string) {
  toast.success(message)
}

export function toastWarning(message: string) {
  toast.warning(message)
}
