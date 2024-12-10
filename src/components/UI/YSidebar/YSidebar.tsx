import { css } from "@emotion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Accordion, Nav, Offcanvas, type OffcanvasProps } from "react-bootstrap"

import { useDisplay } from "src/hooks"
import { themeColors } from "src/styles/bootstrap/variables"
import { YTypography, YBtn } from "@/components/UI"
import { useAccountStore } from "@/store"
import clsx from "clsx"

export interface SidebarItemProps {
  key: string
  title: string
  disabled: boolean
  icon?: string
  route?: string
  baseRoute?: string
  isHijacked?: boolean
  children?: SidebarItemProps[]
}

interface YSidebarProps extends OffcanvasProps {
  toggleSidebar: () => void
  showSidebar: boolean
  sidebarItems: SidebarItemProps[]
}

export function YSidebar({
  toggleSidebar,
  showSidebar,
  sidebarItems,
  ...props
}: YSidebarProps) {
  const { isHijacked, accountID } = useAccountStore()
  const pathname = usePathname()
  const { mdAndDown } = useDisplay()
  const [activeKey, setActiveKey] = useState<string>()
  const [accordionActiveKey, setAccordionActiveKey] = useState<string>()

  useEffect(() => {
    const allItems = [
      ...sidebarItems,
      ...(sidebarItems
        .map((item) => item.children)
        .filter((item) => !!item)
        .flat() as SidebarItemProps[]),
    ]
    const exactMatchedItem = allItems.find(
      (item) => pathname === (item.route as string),
    )
    const matchedItem = allItems.find((item) =>
      pathname.includes(item.route as string),
    )
    const matchedAccordionItem = allItems.find(
      (item) => item.baseRoute && pathname.includes(item.baseRoute),
    )
    setActiveKey(exactMatchedItem?.key ?? matchedItem?.key)
    setAccordionActiveKey(matchedAccordionItem?.key)
  }, [pathname, sidebarItems])

  const handleSelect = (selectedItem: SidebarItemProps) => {
    if (!selectedItem.disabled && activeKey) {
      setActiveKey(selectedItem.key)
    }
  }

  return (
    <Offcanvas
      placement="end"
      show={showSidebar}
      onHide={toggleSidebar}
      backdrop={mdAndDown}
      {...props}
      css={offcanvasContainer}
    >
      <Offcanvas.Body css={offcanvasBody}>
        <Nav className="flex-column" activeKey={activeKey}>
          <Accordion
            css={collapsed}
            onSelect={(item) =>
              setAccordionActiveKey((item as string) || undefined)
            }
            activeKey={accordionActiveKey}
          >
            {sidebarItems
              .filter((item) => !item.isHijacked || isHijacked)
              .map((item) => {
                return !item.children ? (
                  <Link
                    className="text-decoration-none"
                    key={item.key}
                    href={item.route ?? ""}
                    onClick={() => handleSelect(item)}
                  >
                    <div
                      className={clsx({ hijack: item.isHijacked })}
                      css={[
                        sidebarItemContainer(
                          activeKey === item.key,
                          item.disabled,
                        ),
                        sidebarTitle(activeKey === item.key),
                        hoverEffect,
                      ]}
                    >
                      <i className={`fs-4 mx-2 ${item.icon}`} />
                      <YTypography tag={"span"}>{item.title}</YTypography>
                    </div>
                  </Link>
                ) : (
                  <Accordion.Item
                    className="w-100"
                    key={item.key}
                    eventKey={item.key}
                    css={collapsedItem}
                  >
                    <Accordion.Header css={collapsedBtn}>
                      <i className={`fs-4 mx-2 ${item.icon} text-dark`} />
                      <YTypography tag={"span"}>{item.title}</YTypography>
                    </Accordion.Header>
                    <Accordion.Body css={collapsedBody}>
                      {item.children
                        ?.filter((item) => !item.isHijacked || isHijacked)
                        .map((child) => (
                          <Link
                            className="d-block text-decoration-none"
                            key={child.key}
                            href={child.route ?? ""}
                            onClick={() => handleSelect(child)}
                          >
                            <div
                              className={clsx({ hijack: child.isHijacked })}
                              css={[
                                sidebarItemContainer(
                                  activeKey === child.key,
                                  child.disabled,
                                ),
                                sidebarTitle(activeKey === child.key),
                                hoverEffect,
                              ]}
                            >
                              <YTypography tag={"span"} className="px-2">
                                {child.title}
                              </YTypography>
                            </div>
                          </Link>
                        ))}
                    </Accordion.Body>
                  </Accordion.Item>
                )
              })}
          </Accordion>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

const sidebarTitle = (active: boolean) => css`
  font-size: 0.875rem;
  width: 100%;
  text-align: right;
  padding: 0.75rem 0;
`

const sidebarItemContainer = (active: boolean, disabled: boolean) => css`
  transition: background-color 0.1s;
  background-color: ${active ? themeColors.blue_100 : "transparent"};
  border-radius: 0.5rem;
  margin: 0.25rem 0;
  text-decoration: none;
  opacity: ${disabled ? 0.6 : 1};
  color: ${active ? themeColors.primary_600 : themeColors.gray_950};

  & > * {
    color: inherit;
  }
`

const hoverEffect = css`
  &:hover {
    background-color: ${themeColors.blue_100};
  }
`

const offcanvasContainer = css`
  border-left: none !important;
  margin-top: 4rem;
  max-width: 230px;
  background-color: ${themeColors.gray_100};
`

const offcanvasBody = css`
  border-left: none;
  padding: 0.5rem;
`

const collapsed = css`
  --bs-accordion-bg: transparent;
  --bs-accordion-btn-focus-box-shadow: transparent;
  border-radius: 1.25rem;
`

const collapsedItem = css`
  border: none;
`

const collapsedBtn = css`
  .accordion-button {
    font-size: 0.875rem;
    padding: 0.75rem 0;
    border: 1px solid transparent;
    color: ${themeColors.primary} !important;
    border-bottom: 0;
    border-radius: 0.5rem;
    box-shadow: 0 0 0 0;

    &::after {
      margin-right: auto;
      margin-left: 0.75rem;
      --bs-accordion-btn-icon-width: 1rem;
    }

    &:hover {
      background-color: ${themeColors.primary_100} !important;
    }

    &:not(.collapsed) {
      background-color: unset;
    }
  }
`

const collapsedBody = css`
  margin-right: 1rem;
  padding: 0.25rem 0.5rem;
  border-right: 1px solid ${themeColors.gray_400};
  color: ${themeColors.primary_900} !important;
`
