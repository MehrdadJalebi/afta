import { Pagination as BPagination } from "react-bootstrap"
import React from "react"

interface PaginationItemProps {
  page: number
  isCurrent: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({
  page,
  isCurrent,
  onPageChange,
}: PaginationItemProps) {
  return (
    <BPagination.Item onClick={() => onPageChange(page)} active={isCurrent}>
      {page}
    </BPagination.Item>
  )
}
