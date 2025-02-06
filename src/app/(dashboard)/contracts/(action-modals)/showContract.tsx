import { queryService } from "@/api"
import { ConfirmModal } from "@/components/Modals"
import { YTypography } from "@/components/UI"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

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
  const [shouldFetch, setShouldFetch] = useState(false)

  useEffect(() => {
    setShouldFetch(isShowing)
  }, [isShowing])

  const { data: parties, isFetched } = useQuery(
    queryService(
      "afta",
      "/api/afta/v1/Contracts/{id}/parties",
      {
        params: {
          path: { id: parseInt(selectedRow?.id) },
        },
      },
      { enabled: shouldFetch && !!selectedRow?.id },
    ),
  )
  //@ts-ignore
  const contractParties = parties?.data?.map(
    (part: any) => `${part.customerName} - ${part.nationalCode}`,
  )

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
          <YTypography variant="label-bold" className="mb-2">
            طرفین قرارداد:
          </YTypography>
          {isFetched
            ? contractParties.map((part: string) => {
                return (
                  <YTypography variant="label-regular" className="mb-1">
                    {part}
                  </YTypography>
                )
              })
            : "-"}
        </>
      }
      showModal={isShowing}
      onHide={onHide}
    />
  )
}
