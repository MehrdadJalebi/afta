import { YTypography } from "@/components/UI"
import { X } from "lucide-react"

export interface HeaderPluginProps {
  onClose?: () => void
  representedDates: string[]
  position: string
}

export function HeaderPlugin({ onClose, representedDates }: HeaderPluginProps) {
  return (
    <div className="d-flex p-3 justify-content-between" dir={"rtl"}>
      <div>
        {representedDates.map((representation, i) => (
          <YTypography tag={"span"} variant={"caption-bold"} key={i}>
            {representation}
          </YTypography>
        ))}
      </div>
      <X onClick={onClose} />
    </div>
  )
}
