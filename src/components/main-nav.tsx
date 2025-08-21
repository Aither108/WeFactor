"use client";

import Link from "next/link";
import { usePathname } from "@/hooks/use-pathname";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSubmenu,
  SidebarSubmenuButton,
  SidebarSubmenuItem,
  SidebarSubmenuContent,
} from "@/components/ui/sidebar";

export function MainNav() {
  const pathname = usePathname();

  const topLevelLinks = navLinks.filter(link => !link.isBottom && !link.parent);

  return (
    <SidebarMenu>
      {topLevelLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        const children = navLinks.filter(child => child.parent === link.href);

        if (children.length > 0) {
          return (
            <SidebarSubmenu key={link.href}>
              <SidebarSubmenuButton isActive={isActive}>
                <link.icon />
                <span>{link.label}</span>
              </SidebarSubmenuButton>
              <SidebarSubmenuContent>
                {children.map(child => {
                  const isChildActive = pathname.startsWith(child.href);
                  return (
                    <SidebarSubmenuItem key={child.href}>
                      <Link href={child.href} className="w-full">
                        <SidebarMenuButton
                          isActive={isChildActive}
                          tooltip={{ children: child.label, side: "right" }}
                          className={cn(isChildActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm", "w-full justify-start")}
                        >
                          <child.icon />
                          <span>{child.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarSubmenuItem>
                  )
                })}
              </SidebarSubmenuContent>
            </SidebarSubmenu>
          );
        }

        return (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href} className="w-full">
              <SidebarMenuButton
                isActive={isActive}
                tooltip={{ children: link.label, side: "right" }}
                className={cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm")}
              >
                <link.icon />
                <span>{link.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
     <SidebarMenu>
      {navLinks.filter(link => link.isBottom).map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href} className="w-full">
               <SidebarMenuButton
                isActive={isActive}
                tooltip={{ children: link.label, side: "right" }}
                className={cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm")}
              >
                <link.icon />
                <span>{link.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}