import { ConfirmModal } from "@/components/Modals"
import { YTypography } from "@/components/UI"

export interface ShowContractModalProps {
  isSubmitting: boolean
  selectedRow?: any
  onSubmit: () => void
  isShowing: boolean
  onHide: () => void
}

export function ShowContractModal({
  selectedRow,
  isShowing,
  onHide,
  isSubmitting,
  onSubmit,
}: ShowContractModalProps) {
  return (
    <ConfirmModal
      actionVariant={"danger"}
      actionText={"بستن"}
      onActionClick={onSubmit}
      isLoading={isSubmitting}
      isInfoModal={true}
      title={"نمایش قرارداد"}
      body={
        <>
          <YTypography variant="label-bold" className="mb-1">
            نام قرارداد:
          </YTypography>
          <YTypography variant="label-regular" className="mb-3">
            {selectedRow?.title}
          </YTypography>
          <YTypography variant="label-bold" className="mb-1">
            متن قرارداد:
          </YTypography>
          <YTypography variant="label-regular" className="mb-3">
            {selectedRow?.description}
          </YTypography>
        </>
      }
      showModal={isShowing}
      onHide={onHide}
    />
  )
}
