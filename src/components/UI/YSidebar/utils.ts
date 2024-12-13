import type { SidebarItemProps } from "./YSidebar"

export const sidebarItems: SidebarItemProps[] = [
  {
    key: "users",
    title: "لیست کاربران",
    icon: "icon-campaign",
    route: "/users",
    disabled: false,
  },
  {
    key: "contracts",
    title: "قراردادها",
    icon: "icon-campaign",
    route: "/contracts",
    disabled: false,
  },
  {
    key: "logs",
    title: "لاگ‌ها",
    icon: "icon-campaign",
    route: "/logs",
    disabled: false,
  },
]
