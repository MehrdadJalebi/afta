import "./index.scss"
import { css } from "@emotion/react"
import clsx from "clsx"
import Cookies from "js-cookie"
import { forwardRef, useEffect, useState } from "react"
import { Dropdown, type DropdownToggleProps } from "react-bootstrap"
import { useMutation } from "@tanstack/react-query"
import { mutateService } from "@/api"
import { YBtn, type YButtonProps, YTypography } from "src/components/UI"
import { useProfileQuery } from "@/api/useApi"
import { themeColors, themeVariables } from "src/styles/bootstrap/variables"
import { useAccountStore } from "@/store"
import { redirectToLogin } from "@/api/api-service"
import { EditUserModal } from "@/app/(dashboard)/users/(action-modals)"
import { EditPasswordModal } from "@/components/UI/YHeader/components/(action-modals)"
import { toastSuccess, toastError } from "src/utils"
import { Edit, Lock, LogOut, Phone, User } from "lucide-react"

type DropdownTogglePropsWithoutAs = Omit<DropdownToggleProps, "as">

interface CustomDropdownToggleProps
  extends DropdownTogglePropsWithoutAs,
    YButtonProps {}

export const DropdownToggleBtn = forwardRef<
  HTMLButtonElement,
  CustomDropdownToggleProps
>(function forwardedRefDropdownToggleBtn(
  { children, onClick, variant = "link-primary", className, ...props },
  ref,
) {
  const modifiedClassName = className
    ?.split(" ")
    .filter((cls) => cls !== "dropdown-toggle")
    .join(" ")

  return (
    <YBtn
      variant={variant}
      onClick={onClick}
      ref={ref}
      className={clsx(modifiedClassName, "py-2 px-3 fs-7 lh-lg")}
      {...props}
    >
      {children}
    </YBtn>
  )
})

export function YProfileInfo() {
  const { mutateAsync } = useMutation(
    mutateService("afta", "post", "/api/afta/v1/Accounts/sign-out"),
  )
  const editUserMutation = useMutation(
    mutateService("afta", "put", "/api/afta/v1/Accounts"),
  )

  const editPasswordMutation = useMutation(
    mutateService("afta", "patch", "/api/afta/v1/Accounts/password"),
  )

  const { setBearerToken, setIsAdmin } = useAccountStore.getState()
  const [activeModal, setActiveModal] = useState<"edit" | "password">()
  const { data: userProfileData, refetch, isFetching } = useProfileQuery()

  const fullName =
    // @ts-ignore
    userProfileData?.data?.firstName && userProfileData?.data?.lastName
      ? // @ts-ignore
        `${userProfileData?.data?.firstName} ${userProfileData?.data?.lastName}`
      : ""

  useEffect(() => {
    // @ts-ignore
    setIsAdmin(userProfileData?.data?.role === "Admin")
  }, [useProfileQuery, isFetching])
  function exitAccountHandler() {
    // @ts-ignore
    mutateAsync()
      .then(() => {
        Cookies.remove("access_token")
        setBearerToken("")
        redirectToLogin()
      })
      .catch(({ message: { error } }) => {})
  }

  const editAccountHandler = () => setActiveModal("edit")
  const editPasswordHandler = () => setActiveModal("password")
  const hideModal = () => setActiveModal(undefined)

  const editAccount = async (data: any) => {
    try {
      hideModal()
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        nationalCode: data.nationalCode,
      }
      await editUserMutation.mutateAsync({ body: payload })
      toastSuccess(`اطلاعات کاربری با موفقیت ویرایش شد.`)
      refetch()
    } catch (e) {
      toastError(`خطا در ویرایش اطلاعات کاربری.`)
      console.log(e)
    }
  }

  const editPassword = async (data: any) => {
    try {
      const payload = {
        password: data.password,
        reEnterPassword: data.reEnterPassword,
      }
      editPasswordMutation
        .mutateAsync({ body: payload })
        .then(() => {
          hideModal()
          toastSuccess(`کلمه عبور با موفقیت ویرایش شد.`)
          refetch()
        })
        .catch(({ message: { error } }) => {
          const errorMessage = error.message
          if (errorMessage) {
            toastError(errorMessage)
          } else {
            toastError(`خطا در ویرایش کلمه عبور.`)
          }
        })
    } catch (e) {
      toastError(`خطا در ویرایش کلمه عبور.`)
      console.log(e)
    }
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle css={dropdownToggle} as={DropdownToggleBtn}>
          <YTypography className="d-flex" tag={"div"}>
            اطلاعات کاربری
          </YTypography>
        </Dropdown.Toggle>

        <Dropdown.Menu css={dropdownMenuContainer}>
          <div css={userInfo}>
            <User />
            {fullName && <span>{fullName} - </span>}
            <span>
              {
                // @ts-ignore
                userProfileData?.data?.role === "Admin"
                  ? "کاربر ادمین"
                  : "کاربر عادی"
              }
            </span>
          </div>
          <div css={dropdownItem}>
            <div className="d-flex align-items-center">
              <Phone />
              <span className="me-4">تلفن</span>
            </div>

            <span>
              {
                // @ts-ignore
                userProfileData?.data.cellphone || ""
              }
            </span>
          </div>
          <div css={dropdownItem} onClick={editAccountHandler}>
            <div className="d-flex align-items-center">
              <Edit />
              <span className="me-4">ویرایش اطلاعات کاربری</span>
            </div>
          </div>
          <div css={dropdownItem} onClick={editPasswordHandler}>
            <div className="d-flex align-items-center">
              <Lock />
              <span className="me-4">ویرایش کلمه عبور</span>
            </div>
          </div>
          <div css={dropdownItem} onClick={exitAccountHandler}>
            <div className="d-flex align-items-center">
              <LogOut />
              <span className="me-4">خروج</span>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <EditPasswordModal
        isSubmitting={editPasswordMutation.isPending}
        onSubmit={editPassword}
        isShowing={activeModal === "password"}
        onHide={hideModal}
      />
      <EditUserModal
        isSubmitting={editUserMutation.isPending}
        onSubmit={editAccount}
        isShowing={activeModal === "edit"}
        onHide={hideModal}
        selectedRow={{
          // @ts-ignore
          firstName: userProfileData?.data?.firstName,
          // @ts-ignore
          lastName: userProfileData?.data?.lastName,
          // @ts-ignore
          nationalCode: userProfileData?.data?.nationalCode,
        }}
      />
    </>
  )
}

const dropdownToggle = css`
  font-feature-settings: "ss04";
`

const dropdownMenuContainer = css`
  width: 312px;
  margin-top: 1rem;
  padding: 1.25rem 0.75rem;
  border: none;
  border-radius: 0.75rem;
  color: ${themeColors.dark};
  box-shadow: ${themeVariables.boxShadows.shadowOne};
`

const userInfo = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${themeColors.gray_300};
  }

  i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 1.25rem;
    color: ${themeColors.red_200};
    background-color: ${themeColors.red_100};
  }
`

const dropdownItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${themeColors.gray_300};
  }
`

const sectionDivider = css`
  position: relative;
  font-size: 0.75rem;
  color: ${themeColors.gray_700};
  text-align: right;
  margin: 0.5rem 0;

  .title {
    position: relative;
    z-index: 1;
    padding-left: 0.25rem;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${themeColors.gray_400};
  }
`
