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
import { FaGolang } from "react-icons/fa6";

import { ChevronRight, FileSymlink, GlassWater, Home, LayoutDashboardIcon, LinkIcon, TriangleAlert, User2, } from "lucide-react";
import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

type MenuItem = {
  label: string;
  href?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon />,
    isActive: true,
  },
  {
    label: "Policies",
    icon: <FileSymlink />,
    children: [
      {
        label: "All Policies",
        href: "/dashboard/policies",
      },
      {
        label: "Create Policy",
        href: "/dashboard/createPolicy",
      },
      {
        label: "Create Policy Stepper",
        href: "/dashboard/createPolicyStepper",
      }
    ],
  },
  {
    label: "GoApi",
    href: "/dashboard/goApi",
    icon: <FaGolang />,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: <User2 />,
  },
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
                          {item.href ? (
                            <Link href={item.href}>
                              {item.icon}
                              {item.label}
                            </Link>
                          ) : (
                            <div className="flex">
                              <p>{item.icon}</p>
                              <p>{item.label}</p>
                            </div>
                          )}
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
