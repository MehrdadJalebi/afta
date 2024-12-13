import { css } from "@emotion/react"
import { themeColors } from "src/styles/bootstrap/variables"
import { YBtn } from "../YBtn"
import Image from "next/image"
import { YTypography } from "@/components/UI"
import { numberwithCommas } from "@/utils"
import { useRouter } from "next/navigation"
import { YProfileInfo } from "./components/YProfileInfo"
import { useDisplay } from "@/hooks"
import clsx from "clsx"
import { Spinner } from "react-bootstrap"

interface Props {
  onToggleSidebar: () => void
}

export function YHeader({ onToggleSidebar }: Props) {
  return (
    <div css={headerContainer}>
      <div className="d-flex align-items-center">
        <YBtn
          size="lg"
          className="ms-2"
          variant="link-dark"
          icon="icon-menu-hamburger"
          onClick={onToggleSidebar}
        />
        <Image src={"/afta.png"} alt={"afta logo"} width={45} height={45} />
        <div css={divider} />
      </div>
      <div className="d-flex align-items-center">
        <YProfileInfo />
      </div>
    </div>
  )
}

const headerContainer = css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  width: 100%;
  background-color: ${themeColors.red_100};
  height: 64px;
  padding: 0.5rem;
  z-index: 1050; // sidebar is 1045
  border-bottom: 2px solid ${themeColors.red_200};
`

const divider = css`
  height: 32px;
  border: 0.5px solid ${themeColors.gray_400};
  border-radius: 4px;
  margin: 0 20px;
`

const increase = css`
  background-color: ${themeColors.blue_100} !important;
  color: ${themeColors.gray_800} !important;
  border: none;
  padding: 7px 12px;
  border-radius: 8px;
  display: flex;

  @media screen and (max-width: 768px) {
    i {
      margin-left: 0 !important;
    }
  }
`
