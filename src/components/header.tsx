"use client";

import { Bell, Bot, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "./ui/badge";
import { useState } from 'react';
import { AIAssistant } from '@/components/ai-assistant';
import { Breadcrumbs } from "./breadcrumbs";

const notifications = [
  {
    title: "New survey available",
    description: "The quarterly engagement survey is now open.",
  },
  {
    title: "Reminder: 1-on-1 with Sarah",
    description: "Your 1-on-1 is scheduled for tomorrow.",
  },
  {
    title: "New goal assigned",
    description: "Finalize Q3 OKRs has been assigned to you.",
  },
];

export function Header() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={()=>setAssistantOpen(true)} variant="ghost" size="icon" className="rounded-full relative hover:bg-accent/50 hover:text-primary transition-all duration-200 hover:scale-110">
          <Bot className="h-5 w-5" />
          <span className="sr-only">AI Assistant</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification, index) => (
              <DropdownMenuItem key={index} className="flex flex-col items-start gap-1">
                <p className="font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AIAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </header>
  );
}
