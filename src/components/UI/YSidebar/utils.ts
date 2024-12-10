import type { SidebarItemProps } from "./YSidebar"

export const sidebarItems: SidebarItemProps[] = [
  {
    key: "campaigns",
    title: "کمپین‌ها",
    icon: "icon-campaign",
    route: "/campaigns",
    disabled: false,
  },
  {
    key: "settings",
    title: "تنظیمات",
    icon: "icon-setting",
    baseRoute: "/settings",
    disabled: false,
    children: [
  
      {
        key: "developers-settings",
        title: "توسعه‌دهندگان",
        disabled: false,
        route: "/settings/developers",
      },

    ],
  },
]
