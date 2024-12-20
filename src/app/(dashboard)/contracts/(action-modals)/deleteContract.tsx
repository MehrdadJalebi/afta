import { ConfirmModal } from "@/components/Modals"
import { YTypography } from "@/components/UI"

export interface DeleteContractModalProps {
  isSubmitting: boolean
  selectedRow?: any
  onSubmit: () => void
  isShowing: boolean
  onHide: () => void
}

export function DeleteContractModal({
  selectedRow,
  isShowing,
  onHide,
  isSubmitting,
  onSubmit,
}: DeleteContractModalProps) {
  return (
    <ConfirmModal
      actionVariant={"danger"}
      actionText={"حذف"}
      onActionClick={onSubmit}
      isLoading={isSubmitting}
      title={`حذف قرارداد ${selectedRow?.contract.name}`}
      body={
        <>
          <YTypography>
            آیا از حذف قرارداد {selectedRow?.contract.name} اطمینان دارید؟
          </YTypography>
        </>
      }
      showModal={isShowing}
      onHide={onHide}
    />
  )
}
