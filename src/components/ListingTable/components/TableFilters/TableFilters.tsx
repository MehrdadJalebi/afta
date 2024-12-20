import { UseTableStateReturnType } from "../../useTableState/types"
import { YBtn, YTypography } from "@/components/UI"
import { useEffect, useState } from "react"
import Offcanvas from "react-bootstrap/Offcanvas"
import "./styles.scss"
import { css } from "@emotion/react"
import { HEADER_HEIGHT } from "@/constants"
import { bottomDivider } from "@/styles/general"
import { Form } from "react-bootstrap"
import { RenderFilter } from "./RenderFilter"
import { useTableState } from "@/components/ListingTable"

export interface TableFiltersProps {
  stateManager: UseTableStateReturnType
}

export function TableFilters({ stateManager }: TableFiltersProps) {
  const internalStateManager = useTableState(stateManager.config)
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    internalStateManager._forceSetState({ ...stateManager.state })
  }, [stateManager.state])

  const onClose = () => {
    setShowSidebar(false)
  }

  const resetHandler = () => {
    internalStateManager.resetFilters()
    stateManager.resetFilters()
    onClose()
  }

  const onSubmit = () => {
    Object.entries(internalStateManager.state.filters).map(([key, value]) => {
      stateManager.setFilter(key, value)
    })
    stateManager.setPagination((prevPagination) => {
      if (prevPagination) {
        return { ...prevPagination, pageIndex: 1 }
      }
      return prevPagination
    })
    onClose()
  }

  const filtersConfig = stateManager?.config.filters

  return (
    <div>
      <YBtn
        variant="outline-primary"
        onClick={() => setShowSidebar(true)}
        className="me-4"
        icon={{ placement: "right", icon: "icon-filter" }}
      >
        فیلتر
      </YBtn>
      <Offcanvas
        css={offcanvasPadding}
        backdropClassName="filters-backdrop"
        className="filters-container"
        placement="start"
        show={showSidebar}
        onHide={onClose}
      >
        <div
          className="d-flex justify-content-between align-items-center pb-3 pt-4 mx-4"
          css={bottomDivider}
        >
          <div>
            <i className="icon-filter text-primary ms-2 fs-4" />
            <YTypography variant="title-bold" tag="span">
              فیلترها
            </YTypography>
          </div>
          <YBtn
            icon={"icon-close"}
            variant={"link-gray"}
            onClick={onClose}
            className={"fs-4"}
          />
        </div>
        <Offcanvas.Body>
          <Form>
            {filtersConfig &&
              Object.keys(filtersConfig).map((key) => (
                <div key={key} className="mb-4">
                  <RenderFilter
                    filterKey={key}
                    stateManager={internalStateManager}
                  />
                </div>
              ))}
          </Form>
        </Offcanvas.Body>
        <div className="d-flex justify-content-end px-4 pb-4 pt-2">
          <YBtn
            variant="outline-primary"
            onClick={resetHandler}
            className="ms-4"
          >
            پاک کردن همه
          </YBtn>
          <YBtn variant="primary" onClick={onSubmit}>
            اعمال فیلترها
          </YBtn>
        </div>
      </Offcanvas>
    </div>
  )
}

const offcanvasPadding = css`
  padding-top: ${HEADER_HEIGHT}px;
`
