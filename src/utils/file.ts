export function downloadFile(file: File) {
  const link = document.createElement("a")
  const url = URL.createObjectURL(file)
  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(link)
}
