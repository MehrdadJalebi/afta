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
}

export function ConfirmModal({
  actionVariant,
  onActionClick,
  actionText,
  isLoading,
  isStatic,
  ...restProps
}: ConfirmModalProps) {
  return (
    <YModal
      {...restProps}
      backdrop={isLoading || isStatic ? "static" : true}
      footer={
        <div>
          <YBtn
            variant={"outline-primary"}
            className={"ms-4"}
            onClick={restProps.onHide}
            disabled={isLoading}
          >
            بازگشت
          </YBtn>
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
