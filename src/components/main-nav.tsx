"use client";

import Link from "next/link";
import { usePathname } from "@/hooks/use-pathname";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navLinks.filter(link => !link.isBottom).map((link) => {
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