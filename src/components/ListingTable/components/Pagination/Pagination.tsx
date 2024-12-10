import { Pagination as BPagination } from "react-bootstrap"
import "./styles.scss"
import React, { useMemo } from "react"
import { PaginationItem } from "@/components/ListingTable/components/Pagination/PaginationItem"

export interface PaginationProps {
  currentPage: number
  pageCount: number
  neighborSize: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  pageCount,
  neighborSize,
  onPageChange,
}: PaginationProps) {
  const paginationItems = useMemo(() => {
    const items: React.JSX.Element[] = []

    let leftBoundary = currentPage - neighborSize
    let rightBoundary = currentPage + neighborSize

    if (leftBoundary <= 2) {
      rightBoundary = Math.min(rightBoundary + (3 - leftBoundary), pageCount)
      leftBoundary = 1
    }
    if (rightBoundary >= pageCount - 1) {
      leftBoundary = Math.max(leftBoundary - (rightBoundary - pageCount) - 2, 1)
      rightBoundary = pageCount
    }

    if (leftBoundary > 1) {
      items.push(
        <PaginationItem
          key="1"
          page={1}
          isCurrent={currentPage === 1}
          onPageChange={onPageChange}
        />,
      )
      items.push(<BPagination.Ellipsis key="ellipsis-left" disabled />)
    }

    for (let i = leftBoundary; i <= rightBoundary; i++) {
      items.push(
        <PaginationItem
          key={i.toString()}
          page={i}
          isCurrent={currentPage === i}
          onPageChange={onPageChange}
        />,
      )
    }

    if (rightBoundary < pageCount) {
      items.push(<BPagination.Ellipsis key="ellipsis-right" disabled />)
      items.push(
        <PaginationItem
          key={pageCount.toString()}
          page={pageCount}
          isCurrent={currentPage === pageCount}
          onPageChange={onPageChange}
        />,
      )
    }
    return items
  }, [currentPage, neighborSize, onPageChange, pageCount])

  const onPreviousButtonClicked = () => {
    onPageChange(currentPage - 1)
  }
  const onNextButtonClicked = () => {
    onPageChange(currentPage + 1)
  }

  return (
    <div className="d-flex justify-content-center w-100">
      <BPagination className="mb-0 y-pagination">
        <BPagination.Prev
          className="pagination-arrow"
          onClick={onPreviousButtonClicked}
          disabled={currentPage === 1}
        />
        {paginationItems}
        <BPagination.Next
          className="pagination-arrow"
          disabled={currentPage === pageCount}
          onClick={onNextButtonClicked}
        />
      </BPagination>
    </div>
  )
}
