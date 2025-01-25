import type { SidebarItemProps } from "./YSidebar"

export const sidebarItems: SidebarItemProps[] = [
  {
    key: "users",
    title: "لیست کاربران",
    icon: "Users",
    route: "/users",
    disabled: false,
    isAdmin: true,
  },
  {
    key: "contracts",
    title: "قراردادها",
    icon: "Signature",
    route: "/contracts",
    disabled: false,
  },
  {
    key: "logs",
    title: "لاگ‌ها",
    icon: "Logs",
    route: "/logs",
    disabled: false,
    isAdmin: true,
  },
]
