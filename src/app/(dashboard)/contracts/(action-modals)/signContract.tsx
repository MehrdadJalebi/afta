import { ConfirmModal } from "@/components/Modals"
import { YTypography } from "@/components/UI"

export interface SignContractModalProps {
  isSubmitting: boolean
  selectedRow?: any
  onSubmit: () => void
  isShowing: boolean
  onHide: () => void
}

export function SignContractModal({
  selectedRow,
  isShowing,
  onHide,
  isSubmitting,
  onSubmit,
}: SignContractModalProps) {
  return (
    <ConfirmModal
      actionVariant={"danger"}
      actionText={"امضای قرارداد"}
      onActionClick={onSubmit}
      isLoading={isSubmitting}
      title={`امضای قرارداد ${selectedRow?.title}`}
      body={
        <>
          <YTypography>
            آیا از امضای قرارداد {selectedRow?.title} اطمینان دارید؟
          </YTypography>
        </>
      }
      showModal={isShowing}
      onHide={onHide}
    />
  )
}
