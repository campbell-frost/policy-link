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

import { Home, LayoutDashboardIcon, LinkIcon, Upload } from "lucide-react";
import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";
import React from "react";

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
export function SideNav({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-sidebar-background active:bg-sidebar-background">
              <LinkIcon />
              <Link href="/">
                <div className="flex flex-col">
                  <h1 className="text-lg">Policy-Link Solutions</h1>
                </div>
              </Link>
            </SidebarMenuButton>
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
