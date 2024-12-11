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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import { Activity, ChevronRight, GlassWater, Home, LayoutDashboardIcon, LinkIcon, Shield, TriangleAlert, Upload } from "lucide-react";
import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

type MenuItem = {
  label: string;
  href: string;
  isActive?: boolean;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    label: "404",
    href: "/bad-route",
    icon: <TriangleAlert />,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon />,
    children: [
      {
        label: "Activity",
        href: "/dashboard/activity",
        icon: <Activity />
      },
      {
        label: "General",
        href: "/dashboard/general",
        icon: <GlassWater />
      },
      {
        label: "Security",
        href: "/dashboard/security",
        icon: <Shield />
      },
    ]
  }
];

export function Sidenav({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="text-foreground">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-sidebar-background active:bg-sidebar-background my-1">
              <LinkIcon />
              <Link href="/">
                <div className="flex flex-col">
                  <h1 className="text-xl truncate">Policy-Link Solutions</h1>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Routes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <div key={index}>
                  {!item.children
                    ? (
                      <SidebarMenuItem >
                        <SidebarMenuButton asChild>
                          <Link href={item.href}>
                            {item.icon}
                            {item.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ) : (
                      <Collapsible
                        key={index}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              {item.icon}
                              <span>{item.label}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.label}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.href}>
                                      <span>{subItem.label}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  }
                </div>
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
