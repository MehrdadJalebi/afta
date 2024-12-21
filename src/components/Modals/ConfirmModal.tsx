import React from "react"
import { YBtn, YModal } from "@/components/UI"

export interface ConfirmModalProps {
  actionVariant: "primary" | "danger"
  actionText: string
  onActionClick: () => void
  isLoading?: boolean
  title: string
  body: React.ReactNode
  showModal: boolean
  onHide: () => void
  isStatic?: boolean
  isInfoModal?: boolean
}

export function ConfirmModal({
  actionVariant,
  onActionClick,
  actionText,
  isLoading,
  isStatic,
  isInfoModal,
  ...restProps
}: ConfirmModalProps) {
  return (
    <YModal
      {...restProps}
      backdrop={isLoading || isStatic ? "static" : true}
      footer={
        <div>
          {!isInfoModal && (
            <YBtn
              variant={"outline-primary"}
              className={"ms-4"}
              onClick={restProps.onHide}
              disabled={isLoading}
            >
              بازگشت
            </YBtn>
          )}
          <YBtn
            variant={actionVariant}
            onClick={onActionClick}
            loading={isLoading}
          >
            {actionText}
          </YBtn>
        </div>
      }
    />
  )
}
