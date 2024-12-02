import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import { Home, LayoutDashboardIcon, Upload } from "lucide-react";
import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";

export function SideNav() {
  type MenuItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
  }
  const menuItems: MenuItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <Home />,
    },
    {
      label: "Upload Policy",
      href: "/upload-policy",
      icon: <Upload />,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboardIcon />
    }
  ]

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="p-2 flex justify-start items-center rounded-lg gap-x-2">
              <h1 className="text-3xl font-medium text-primary">Policy Link Solutions</h1>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Routes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index} >
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <ToggleTheme />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
