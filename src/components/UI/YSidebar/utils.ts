import type { SidebarItemProps } from "./YSidebar"

export const sidebarItems: SidebarItemProps[] = [
  {
    key: "users",
    title: "لیست کاربران",
    icon: "icon-users",
    route: "/users",
    disabled: false,
    isAdmin: true,
  },
  {
    key: "contracts",
    title: "قراردادها",
    icon: "icon-report",
    route: "/contracts",
    disabled: false,
  },
  {
    key: "logs",
    title: "لاگ‌ها",
    icon: "icon-list",
    route: "/logs",
    disabled: false,
    isAdmin: true,
  },
]
